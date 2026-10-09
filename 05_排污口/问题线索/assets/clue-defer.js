/* 延期申请页逻辑：市级（申请延期 / 待审核 / 已通过 / 已驳回） / 省级审核（可通过、可驳回） */
(function () {
    const { showToast, openModal, closeModal, esc, todayStr, daysBetween, workingDaysLeft, typeTag, deferTag, exportCsv, getRole } = ClueUI;

    const state = { role: getRole(), city: "武汉市", tab: "all" };
    let applyClueId = null;
    let reviewClueId = null;
    const applyFiles = [];

    /* 省级：按审核状态查看全部地市申请 */
    const PROVINCE_TABS = [
        { key: "all", label: "全部申请" },
        { key: "待省级审核", label: "待审核" },
        { key: "已通过", label: "已通过" },
        { key: "已驳回", label: "已驳回" }
    ];
    /* 市级：四个选项卡 */
    const CITY_TABS = [
        { key: "apply", label: "申请延期" },
        { key: "pending", label: "待审核" },
        { key: "passed", label: "已通过" },
        { key: "rejected", label: "已驳回" }
    ];

    const citySelect = document.getElementById("citySelect");
    CITIES.forEach(city => citySelect.insertAdjacentHTML("beforeend", `<option>${city}</option>`));

    /* ===== 统计 ===== */
    function deferClues() { return CLUES.filter(item => item.defer); }

    function renderStats() {
        const all = deferClues();
        document.getElementById("statWait").textContent = all.filter(item => item.defer.status === "待省级审核").length;
        document.getElementById("statPass").textContent = all.filter(item => item.defer.status === "已通过").length;
        document.getElementById("statReject").textContent = all.filter(item => item.defer.status === "已驳回").length;
        const windowCount = CLUES.filter(item => item.status === "待办" && !item.defer && windowStatus(item).key === "open").length;
        document.getElementById("statWindow").textContent = windowCount;
    }

    /* ===== 申请窗口判定 ===== */
    /* 距期限剩余工作日（含当日；当日为工作日时计入，符合“期满前10个工作日内可申请”的口径） */
    function windowDaysLeft(dueText) {
        const day = new Date().getDay();
        const todayIsWorkday = day !== 0 && day !== 6;
        return workingDaysLeft(dueText) + (todayIsWorkday ? 1 : 0);
    }

    function windowStatus(clue) {
        const effectiveDue = clue.extendedDue || clue.dueDate;
        const defer = clue.defer;
        if (clue.status === "已办") return { key: "closed", text: "已办结，无需延期", cls: "plain" };
        if (defer && defer.status === "待省级审核") return { key: "pending", text: "已有申请，待省级审核", cls: "wait" };
        if (defer && defer.status === "已通过") return { key: "passed", text: `已延期至 ${defer.appliedDue}`, cls: "pass" };
        const rejected = !!(defer && defer.status === "已驳回");
        const overdue = daysBetween(effectiveDue, todayStr()) > 0;
        if (overdue) return { key: "overdue", text: rejected ? "已过期（申请被驳回，可重新申请）" : "已过期，不可申请", cls: "overdue" };
        const wd = windowDaysLeft(effectiveDue);
        if (rejected) return { key: "reopen", text: `申请被驳回，可重新申请（剩 ${wd} 个工作日）`, cls: "reject" };
        if (clue.status === "过期未办") return { key: "overdue", text: "已过期未办，不可申请延期", cls: "overdue" };
        if (clue.status !== "待办") return { key: "closed", text: `当前状态「${clue.status}」，无需延期`, cls: "plain" };
        if (wd > 0 && wd <= 10) return { key: "open", text: `窗口期内，可申请（剩 ${wd} 个工作日）`, cls: "todo" };
        if (wd > 10) return { key: "future", text: `未到申请期，剩 ${wd} 个工作日（期满前10个工作日内可申请）`, cls: "plain" };
        return { key: "lastday", text: "今日到期，请立即整改", cls: "overdue" };
    }

    /* ===== 选项卡 ===== */
    function renderTabs() {
        const tabs = state.role === "province" ? PROVINCE_TABS : CITY_TABS;
        if (!tabs.some(tab => tab.key === state.tab)) state.tab = tabs[0].key;
        document.getElementById("viewTabs").innerHTML = tabs.map(tab =>
            `<button type="button" class="d-tab ${state.tab === tab.key ? "active" : ""}" data-tab="${tab.key}">${tab.label}</button>`).join("");
    }

    document.getElementById("viewTabs").addEventListener("click", event => {
        const tab = event.target.closest("[data-tab]");
        if (!tab) return;
        state.tab = tab.dataset.tab;
        renderTabs();
        renderTable();
    });

    /* 顶栏角色切换联动：省级=审核视角（可通过/驳回），市级=申请视角（仅本市） */
    document.getElementById("citySelectWrap").hidden = state.role !== "city";

    document.addEventListener("rolechange", event => {
        state.role = event.detail.role;
        document.getElementById("citySelectWrap").hidden = state.role !== "city";
        state.tab = state.role === "province" ? "all" : "apply";
        if (state.role === "city") state.city = citySelect.value || state.city;
        renderTabs();
        renderTable();
    });

    citySelect.addEventListener("change", () => {
        state.city = citySelect.value;
        renderTable();
    });

    /* ===== 数据分组 ===== */
    function cityClues() { return CLUES.filter(item => item.city === state.city); }

    /* 市级四个选项卡的数据（互不重复） */
    function cityTabRows(tab) {
        if (tab === "apply") return cityClues().filter(item => !item.defer);
        if (tab === "pending") return cityClues().filter(item => item.defer && item.defer.status === "待省级审核");
        if (tab === "passed") return cityClues().filter(item => item.defer && item.defer.status === "已通过");
        return cityClues().filter(item => item.defer && item.defer.status === "已驳回");
    }

    /* 省级数据（按审核状态） */
    function deferRows() {
        const rows = deferClues();
        if (state.tab !== "all") return rows.filter(item => item.defer.status === state.tab);
        return rows;
    }

    /* ===== 表格 ===== */
    function renderTable() {
        const cols = document.getElementById("tableCols");
        const head = document.getElementById("tableHead");
        const body = document.getElementById("tableBody");

        /* ---------- 市级：申请延期 ---------- */
        if (state.role === "city" && state.tab === "apply") {
            cols.innerHTML = `<col style="width:3.5%"><col style="width:25%"><col style="width:8%"><col style="width:9%"><col style="width:9%"><col style="width:9%"><col style="width:20%"><col style="width:16.5%">`;
            head.innerHTML = `<tr><th class="center">序号</th><th>问题标题</th><th class="center">问题类型</th><th class="center">交办日期</th><th class="center">计划到期时间</th><th class="center">剩余(工作日)</th><th class="center">申请窗口状态</th><th class="center">操作</th></tr>`;
            const rows = cityTabRows("apply");
            if (!rows.length) return emptyBody(body, 8, "本地市暂无可申请延期的线索");
            body.innerHTML = rows.map((clue, index) => {
                const win = windowStatus(clue);
                const effectiveDue = clue.extendedDue || clue.dueDate;
                const wd = windowDaysLeft(effectiveDue);
                const canApply = win.key === "open";
                return `<tr>
                    <td class="center mono">${index + 1}</td>
                    <td><button class="link-btn" data-viewclue="${clue.id}" title="${esc(clue.title)}">${esc(clue.title)}</button><div class="cell-sub">${clue.code}</div></td>
                    <td class="center">${typeTag(clue.type)}</td>
                    <td class="center mono">${clue.assignDate}</td>
                    <td class="center mono">${clue.dueDate}${clue.extendedDue ? `<span class="overdue-mark">已顺延</span>` : ""}</td>
                    <td class="center mono">${clue.status === "待办" ? wd : "—"}</td>
                    <td class="center"><span class="window-tag"><i class="fa-solid ${win.cls === "todo" || win.key === "open" ? "fa-circle-play" : win.cls === "pass" ? "fa-circle-check" : win.cls === "overdue" || win.cls === "reject" ? "fa-circle-exclamation" : "fa-circle-info"}" style="color:${win.cls === "todo" ? "#2f7ce8" : win.cls === "pass" ? "#21a675" : win.cls === "overdue" || win.cls === "reject" ? "#d84545" : "#8f98a4"}"></i>${win.text}</span></td>
                    <td><div class="actions">${canApply
                        ? `<button class="op-btn warn" data-apply="${clue.id}">延期申请</button>`
                        : `<button class="op-btn" disabled title="${win.text}">延期申请</button>`}</div></td>
                </tr>`;
            }).join("");
            return;
        }

        /* ---------- 市级：待审核 / 已通过 / 已驳回 ---------- */
        if (state.role === "city") {
            cols.innerHTML = `<col style="width:3.5%"><col style="width:21%"><col style="width:7.5%"><col style="width:8%"><col style="width:8.5%"><col style="width:8.5%"><col style="width:8.5%"><col style="width:8.5%"><col style="width:19%"><col style="width:6.5%">`;
            head.innerHTML = `<tr><th class="center">序号</th><th>问题标题</th><th class="center">问题类型</th><th class="center">延期类型</th><th class="center">原计划到期</th><th class="center">申请延期至</th><th class="center">申请日期</th><th class="center">审核状态</th><th>审核意见</th><th class="center">操作</th></tr>`;
            const rows = cityTabRows(state.tab);
            const emptyText = { pending: "暂无待审核的延期申请", passed: "暂无已通过的延期申请", rejected: "暂无被驳回的延期申请" }[state.tab];
            if (!rows.length) return emptyBody(body, 10, emptyText);
            body.innerHTML = rows.map((clue, index) => `<tr>
                <td class="center mono">${index + 1}</td>
                <td>${state.tab === "rejected"
                    ? `<button class="link-btn" data-viewapply="${clue.id}" title="${esc(clue.title)}">${esc(clue.title)}</button>`
                    : `<div class="cell-title" title="${esc(clue.title)}">${esc(clue.title)}</div>`}<div class="cell-sub">${clue.code}</div></td>
                <td class="center">${typeTag(clue.type)}</td>
                <td class="center"><span class="tag general">${esc(clue.defer.category || "—")}</span></td>
                <td class="center mono">${clue.dueDate}</td>
                <td class="center mono ${clue.defer.status === "已通过" ? "defer-red" : ""}">${clue.defer.appliedDue}</td>
                <td class="center mono">${clue.defer.applyDate}</td>
                <td class="center">${deferTag(clue.defer.status)}</td>
                <td title="${esc(clue.defer.reviewNote || "待省级审核")}"><span style="color:${clue.defer.reviewNote ? "#33465e" : "#a5afbb"}">${esc(clue.defer.reviewNote || "待省级审核")}</span></td>
                <td><div class="actions">
                    ${state.tab === "rejected"
                        ? `<button class="op-btn warn" data-apply="${clue.id}">申请延期</button>`
                        : `<button class="op-btn" data-viewapply="${clue.id}">查看</button>`}
                </div></td>
            </tr>`).join("");
            return;
        }

        /* ---------- 省级：审核视角 ---------- */
        cols.innerHTML = `<col style="width:3.5%"><col style="width:17%"><col style="width:6%"><col style="width:7%"><col style="width:6.5%"><col style="width:6.5%"><col style="width:7%"><col style="width:6.5%"><col style="width:19%"><col style="width:6.5%"><col style="width:14.5%">`;
        head.innerHTML = `<tr><th class="center">序号</th><th>问题标题</th><th class="center">问题类型</th><th class="center">延期类型</th><th class="center">所属地市</th><th class="center">原计划到期</th><th class="center">申请延期至</th><th class="center">申请日期</th><th>延期理由</th><th class="center">状态</th><th class="center">操作</th></tr>`;
        const rows = deferRows();
        if (!rows.length) return emptyBody(body, 11, "暂无延期申请记录");
        body.innerHTML = rows.map((clue, index) => `<tr>
            <td class="center mono">${index + 1}</td>
            <td><div class="cell-title" title="${esc(clue.title)}">${esc(clue.title)}</div><div class="cell-sub">${clue.code}</div></td>
            <td class="center">${typeTag(clue.type)}</td>
            <td class="center"><span class="tag general">${esc(clue.defer.category || "—")}</span></td>
            <td class="center">${esc(clue.city)}</td>
            <td class="center mono">${clue.dueDate}</td>
            <td class="center mono ${clue.defer.status === "已通过" ? "defer-red" : ""}">${clue.defer.appliedDue}</td>
            <td class="center mono">${clue.defer.applyDate}</td>
            <td title="${esc(clue.defer.reason)}">${esc(clue.defer.reason)}</td>
            <td class="center">${deferTag(clue.defer.status)}</td>
            <td><div class="actions">
                <button class="op-btn" data-viewapply="${clue.id}">查看</button>
                ${clue.defer.status === "待省级审核"
                    ? `<button class="op-btn warn" data-review="${clue.id}">审核</button>`
                    : clue.defer.status === "已驳回"
                        ? `<button class="op-btn warn" data-review="${clue.id}" title="查看驳回意见">驳回意见</button>`
                        : ""}
            </div></td>
        </tr>`).join("");
    }

    function emptyBody(body, colSpan, text) {
        body.innerHTML = `<tr class="empty-row"><td colspan="${colSpan}"><span class="empty-state"><i class="fa-regular fa-folder-open"></i>${text}</span></td></tr>`;
    }

    document.getElementById("tableBody").addEventListener("click", event => {
        const viewClue = event.target.closest("[data-viewclue]");
        const apply = event.target.closest("[data-apply]");
        const viewApply = event.target.closest("[data-viewapply]");
        const review = event.target.closest("[data-review]");
        if (viewClue) openClueInfo(Number(viewClue.dataset.viewclue));
        if (apply) openApply(Number(apply.dataset.apply));
        if (viewApply) openApplyView(Number(viewApply.dataset.viewapply));
        if (review) openReview(Number(review.dataset.review));
    });

    document.getElementById("exportBtn").addEventListener("click", () => {
        const rows = state.role === "city" ? cityTabRows(state.tab) : deferRows();
        exportCsv(`延期申请数据_${state.role === "city" ? state.city : "全省"}.csv`,
            ["序号", "问题编号", "问题标题", "问题类型", "所属地市", "延期类型", "原计划到期时间", "申请延期至", "申请日期", "审核状态", "审核意见"],
            rows.map((item, index) => [
                index + 1, item.code, item.title, item.type, item.city,
                item.defer ? item.defer.category || "" : "", item.dueDate,
                item.defer ? item.defer.appliedDue : "", item.defer ? item.defer.applyDate : "",
                item.defer ? item.defer.status : "未申请", item.defer ? item.defer.reviewNote || "" : ""
            ]));
    });

    /* ===== 上传 ===== */
    document.getElementById("applyFileUpload").addEventListener("click", event => {
        if (event.target.closest("[data-rm-file]")) { applyFiles.length = 0; renderApplyFiles(); return; }
        if (!event.target.closest("[data-add]")) return;
        applyFiles.length = 0;
        applyFiles.push({ name: "工程可行性方案.pdf", size: `${(Math.random() * 4 + 1).toFixed(1)}MB` });
        renderApplyFiles();
    });

    function renderApplyFiles() {
        const box = document.getElementById("applyFileUpload");
        box.innerHTML = applyFiles.map((file, index) =>
            `<div class="file-row"><i class="fa-solid fa-file-pdf file-ic"></i><span class="file-name">${esc(file.name)}</span><span class="file-size">${file.size}</span><button class="file-x" type="button" data-rm-file="${index}"><i class="fa-solid fa-xmark"></i></button></div>`).join("") +
            `<div class="upload-add" data-add="file"><i class="fa-solid fa-file-arrow-up"></i>点击上传</div>`;
    }

    /* ===== 发起申请（含被驳回后重新申请） ===== */
    function openApply(id) {
        applyClueId = id;
        const clue = clueById(id);
        const rejected = !!(clue.defer && clue.defer.status === "已驳回");
        applyFiles.length = 0;
        renderApplyFiles();
        document.getElementById("applyTitle").textContent = `${rejected ? "重新申请延期" : "延期申请"} - ${clue.code}`;
        document.getElementById("applyClueInfo").innerHTML = `
            <div class="label">问题标题</div><div class="span3 wrap">${esc(clue.title)}</div>
            <div class="label">问题类型</div><div>${typeTag(clue.type)}</div>
            <div class="label">所属地市</div><div>${esc(clue.city)}${clue.district ? " · " + esc(clue.district) : ""}</div>
            <div class="label">交办日期</div><div class="mono">${clue.assignDate}</div>
            <div class="label">剩余工作日</div><div class="mono">${workingDaysLeft(clue.extendedDue || clue.dueDate)} 个</div>
            ${rejected ? `<div class="label">上次审核意见</div><div class="span3 wrap" style="color:#c8403b">${esc(clue.defer.reviewNote)}</div>` : ""}`;
        document.getElementById("applyOldDue").value = clue.extendedDue || clue.dueDate;
        document.getElementById("applyNewDue").value = "";
        document.getElementById("applyNewDue").min = clue.extendedDue || clue.dueDate;
        document.getElementById("applyCategory").value = rejected && clue.defer.category ? clue.defer.category : "";
        document.getElementById("applyReason").value = rejected ? clue.defer.reason : "";
        document.getElementById("applyRemark").value = "";
        openModal("applyModal");
    }

    document.getElementById("applySubmit").addEventListener("click", () => {
        const clue = clueById(applyClueId);
        const newDue = document.getElementById("applyNewDue").value;
        const category = document.getElementById("applyCategory").value;
        const reason = document.getElementById("applyReason").value.trim();
        if (!newDue) return showToast("请选择申请延期至的日期");
        if (daysBetween((clue.extendedDue || clue.dueDate), newDue) <= 0) return showToast("申请延期时间须晚于原整改期限");
        if (!category) return showToast("请选择延期类型（管网改造 / 工程施工 / 其他）");
        if (!reason) return showToast("请填写延期理由");
        if (!applyFiles.length) return showToast("请上传工程可行性方案");
        clue.defer = {
            status: "待省级审核",
            category,
            appliedDue: newDue,
            reason,
            planFile: { ...applyFiles[0] },
            applyDate: todayStr(),
            reviewDate: "",
            reviewNote: "",
            reviewer: "",
            remark: document.getElementById("applyRemark").value.trim()
        };
        closeModal("applyModal");
        showToast("延期申请已提交，等待省级审核");
        state.tab = "pending";
        renderAll();
    });

    /* ===== 申请详情 ===== */
    function openApplyView(id) {
        const clue = clueById(id);
        const defer = clue.defer;
        document.getElementById("applyViewTitle").textContent = `延期申请详情 - ${clue.code}`;
        document.getElementById("applyViewBody").innerHTML = `
            <div class="info-grid">
                <div class="label">问题标题</div><div class="span3 wrap">${esc(clue.title)}</div>
                <div class="label">所属地市</div><div>${esc(clue.city)}生态环境局</div>
                <div class="label">审核状态</div><div>${deferTag(defer.status)}</div>
                <div class="label">延期类型</div><div class="span3"><span class="tag general">${esc(defer.category || "—")}</span></div>
                <div class="label">原计划到期时间</div><div class="mono">${clue.dueDate}</div>
                <div class="label">申请延期至</div><div class="mono">${defer.appliedDue}</div>
                <div class="label">申请日期</div><div class="span3 mono">${defer.applyDate}</div>
            </div>
            <div class="block-label">延期理由</div>
            <div class="desc-block">${esc(defer.reason)}</div>
            ${defer.remark ? `<div class="block-label">备注</div><div class="desc-block">${esc(defer.remark)}</div>` : ""}
            <div class="block-label">工程可行性方案</div>
            <div class="file-list" style="grid-template-columns:1fr">
                <div class="file-row"><i class="fa-solid fa-file-pdf file-ic"></i><span class="file-name">${esc(defer.planFile.name)}</span><span class="file-size">${defer.planFile.size}</span></div>
            </div>
            ${defer.reviewNote ? `<div class="block-label">省级审核意见</div><div class="desc-block" style="${defer.status === "已驳回" ? "color:#c8403b" : ""}">${esc(defer.reviewNote)}</div>` : ""}
            ${defer.status === "已驳回" ? `<div class="block-label">后续办理</div><div class="desc-block">该申请已被省级驳回，请按审核意见补正材料后，在「申请延期」选项卡中重新提交申请。</div>` : ""}`;
        openModal("applyViewModal");
    }

    /* ===== 省级审核（可通过 / 可驳回） ===== */
    function openReview(id) {
        reviewClueId = id;
        const clue = clueById(id);
        const defer = clue.defer;
        const rejected = defer.status === "已驳回";
        document.getElementById("reviewTitle").textContent = `${rejected ? "驳回意见" : "延期申请审核"} - ${clue.code}`;
        document.getElementById("reviewInfo").innerHTML = `
            <div class="label">问题标题</div><div class="span3 wrap">${esc(clue.title)}</div>
            <div class="label">延期类型</div><div class="span3"><span class="tag general">${esc(defer.category || "—")}</span></div>
            <div class="label">所属地市</div><div>${esc(clue.city)}生态环境局</div>
            <div class="label">问题类型</div><div>${typeTag(clue.type)}</div>
            <div class="label">原计划到期时间</div><div class="mono">${clue.dueDate}</div>
            <div class="label">申请延期至</div><div class="mono">${defer.appliedDue}</div>
            <div class="label">申请日期</div><div class="span3 mono">${defer.applyDate}</div>`;
        document.getElementById("reviewReason").textContent = defer.reason;
        document.getElementById("reviewFiles").innerHTML = `<div class="file-row"><i class="fa-solid fa-file-pdf file-ic"></i><span class="file-name">${esc(defer.planFile.name)}</span><span class="file-size">${defer.planFile.size}</span></div>`;
        document.getElementById("reviewNote").value = rejected ? defer.reviewNote : "";
        document.getElementById("reviewNote").placeholder = rejected ? "可修改驳回意见" : "请填写审核意见（驳回时须说明补正要求）";
        document.getElementById("reviewReject").innerHTML = `<i class="fa-solid fa-ban"></i>驳 回`;
        document.getElementById("reviewPass").innerHTML = `<i class="fa-solid fa-check"></i>审核通过`;
        openModal("reviewModal");
    }

    function finishReview(pass) {
        const clue = clueById(reviewClueId);
        const note = document.getElementById("reviewNote").value.trim();
        if (!note) return showToast(pass ? "请填写审核意见" : "驳回须填写驳回意见及补正要求");
        const defer = clue.defer;
        defer.reviewNote = note;
        defer.reviewDate = todayStr();
        defer.reviewer = "省生态环境厅水生态环境处";
        if (pass) {
            defer.status = "已通过";
            clue.extendedDue = defer.appliedDue;
            clue.deferDays = daysBetween(clue.dueDate, defer.appliedDue);
        } else {
            defer.status = "已驳回";
            clue.extendedDue = "";
            clue.deferDays = 0;
        }
        closeModal("reviewModal");
        showToast(pass ? "审核通过，整改期限已顺延并通知地市" : "已驳回，已通知地市补正材料后重新申请");
        renderAll();
    }

    document.getElementById("reviewPass").addEventListener("click", () => finishReview(true));
    document.getElementById("reviewReject").addEventListener("click", () => finishReview(false));

    /* ===== 地市线索查看弹窗 ===== */
    function openClueInfo(id) {
        const clue = clueById(id);
        const win = windowStatus(clue);
        document.getElementById("applyViewTitle").textContent = `问题线索详情 - ${clue.code}`;
        document.getElementById("applyViewBody").innerHTML = `
            <div class="info-grid">
                <div class="label">问题标题</div><div class="span3 wrap">${esc(clue.title)}</div>
                <div class="label">问题类型</div><div>${typeTag(clue.type)}</div>
                <div class="label">办理状态</div><div>${esc(clue.status)}</div>
                <div class="label">所属地市</div><div>${esc(clue.city)}${clue.district ? " · " + esc(clue.district) : ""}</div>
                <div class="label">交办日期</div><div class="mono">${clue.assignDate}</div>
                <div class="label">计划到期时间</div><div class="mono">${clue.dueDate}</div>
                <div class="label">剩余工作日</div><div class="mono">${clue.status === "待办" ? workingDaysLeft(clue.extendedDue || clue.dueDate) : "—"}</div>
                <div class="label">申请窗口</div><div>${win.text}</div>
            </div>
            <div class="block-label">问题描述</div>
            <div class="desc-block">${esc(clue.desc)}</div>`;
        openModal("applyViewModal");
    }

    function renderAll() {
        renderStats();
        renderTabs();
        renderTable();
    }

    renderAll();
})();
