/* 问题线索列表页逻辑 */
(function () {
    const { showToast, openModal, closeModal, esc, todayStr, daysBetween, workingDaysLeft, beforePhotoUrl, afterPhotoUrl, typeTag, deferTag, exportCsv, getRole } = ClueUI;

    /* 本页状态名称：待办→待填报、已办→已反馈、过期未办→过期未反馈 */
    const STATUS_META = { "待办": { cls: "todo", label: "待填报" }, "已办": { cls: "done", label: "已反馈" }, "过期未办": { cls: "overdue", label: "过期未反馈" } };
    function statusTag(status) {
        const meta = STATUS_META[status] || { cls: "plain", label: status };
        return `<span class="tag ${meta.cls}">${esc(meta.label)}</span>`;
    }

    const state = { role: getRole(), view: "all", type: "", city: "", defer: "", year: "", kw: "", page: 1, pageSize: 12 };
    /* 支持从其它页面跳转进入并直接显示「即将到期」列表 */
    if (new URLSearchParams(location.search).get("view") === "near") state.view = "即将到期";
    let currentDetailId = null;
    let editingId = null;
    let editFiles = [];
    let reportBeforePhotos = [], reportPhotos = [], reportFiles = [];
    let reportGis = null, reportGisMarker = null;

    function showReportGis(clue) {
        const box = document.getElementById("reportGisMap");
        const coordEl = document.getElementById("reportGisCoord");
        if (!box || !coordEl) return;
        coordEl.innerHTML = `问题坐标：${clue.lng ? `${clue.lng}, ${clue.lat}` : "未设置"}`;
        const showFallback = text => {
            if (reportGis) { reportGis.remove(); reportGis = null; reportGisMarker = null; }
            box.innerHTML = `<div class="map-fallback">${text}</div>`;
        };
        if (!window.L) return showFallback("<i class=\"fa-solid fa-satellite-dish\" style=\"margin-right:8px\"></i>在线地图组件加载失败，请检查网络后重试");
        if (clue.lng == null || clue.lat == null) return showFallback("该问题线索未设置坐标，暂无法展示点位");
        if (!reportGis) {
            reportGis = L.map(box, { zoomControl: true, attributionControl: false }).setView([clue.lat, clue.lng], 13);
            L.tileLayer("https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}", {
                subdomains: ["1", "2", "3", "4"], minZoom: 4, maxZoom: 18
            }).addTo(reportGis);
            reportGisMarker = L.circleMarker([clue.lat, clue.lng], {
                radius: 8, color: "#ffffff", weight: 2.5, fillColor: "#e0342f", fillOpacity: 1
            }).addTo(reportGis).bindTooltip("", { direction: "top", offset: [0, -8] });
        } else {
            reportGisMarker.setLatLng([clue.lat, clue.lng]);
            reportGis.setView([clue.lat, clue.lng], 13);
        }
        reportGisMarker.setTooltipContent(`${clue.title}（省级发布点位）`);
        setTimeout(() => { if (reportGis) reportGis.invalidateSize(); }, 180);
    }
    let reportClueId = null;
    let editMap = null;
    let zoomMap = null;
    let zoomPick = null;

    const citySelect = document.getElementById("cityFilter");
    CITIES.forEach(city => {
        citySelect.insertAdjacentHTML("beforeend", `<option>${city}</option>`);
        document.getElementById("fCity").insertAdjacentHTML("beforeend", `<option>${city}</option>`);
    });

    /* ===== 地市负责人：随所选问题地区自动带出 ===== */
    const fOfficer = document.getElementById("fOfficer");

    function officerOf(city) {
        const staff = (typeof STAFF_DIRECTORY !== "undefined" ? STAFF_DIRECTORY : []).find(item => item.city === city);
        if (!staff) return "";
        const phone = String(staff.phone).replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
        return `${staff.name}（${phone}）`;
    }

    function syncOfficer() {
        fOfficer.value = officerOf(document.getElementById("fCity").value);
    }

    /* 切换问题地区：地图定位到该地市，并清除原坐标 */
    function focusEditMapOnCity(clearPoint = true) {
        const city = document.getElementById("fCity").value;
        const center = city ? ClueMap.centerOf(city) : null;
        const hasPoint = document.getElementById("fLng").value !== "" || document.getElementById("fLat").value !== "";
        const cleared = clearPoint && hasPoint;
        if (cleared) {
            document.getElementById("fLng").value = "";
            document.getElementById("fLat").value = "";
            if (editMap) editMap.setPoint(null, null);
        }
        if (editMap && center) editMap.focus(center.lng, center.lat, 2.2);
        document.getElementById("editCoord").innerHTML = center
            ? `已定位到 <strong>${esc(city)}</strong>，请点击地图选择问题点位${cleared ? "（切换地区后原坐标已清除）" : ""}。`
            : "点击地图设置问题坐标";
    }

    document.getElementById("fCity").addEventListener("change", () => {
        syncOfficer();
        focusEditMapOnCity(true);
    });

    /* 手工修改经纬度时同步地图标点 */
    ["fLng", "fLat"].forEach(id => {
        document.getElementById(id).addEventListener("change", () => {
            const lng = parseFloat(document.getElementById("fLng").value);
            const lat = parseFloat(document.getElementById("fLat").value);
            if (editMap && !isNaN(lng) && !isNaN(lat)) editMap.setPoint(lng, lat);
        });
    });

    /* ===== 统计卡片 ===== */
    function renderStats() {
        document.getElementById("statAll").textContent = CLUES.length;
        document.getElementById("statTodo").textContent = CLUES.filter(item => item.status === "待办").length;
        document.getElementById("statDone").textContent = CLUES.filter(item => item.status === "已办").length;
        document.getElementById("statUndone").textContent = CLUES.filter(item => item.status === "过期未办").length;
        document.getElementById("statOverdue").textContent = CLUES.filter(isOverdue).length;
        document.getElementById("statNearDue").textContent = CLUES.filter(isNearDue).length;
        document.querySelectorAll("#summaryCards article").forEach(card => {
            const active = card.dataset.view === state.view;
            card.classList.toggle("summary-active", active);
            card.setAttribute("aria-pressed", active ? "true" : "false");
        });
    }

    document.querySelectorAll("#summaryCards article").forEach(card => {
        const activate = () => {
            state.view = card.dataset.view;
            state.page = 1;
            renderAll();
        };
        card.addEventListener("click", activate);
        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") { event.preventDefault(); activate(); }
        });
    });

    /* 顶栏角色切换：省级为监管查看视角（不提供填报/审核入口），市级为填报办理视角 */
    document.addEventListener("rolechange", event => {
        state.role = event.detail.role;
        state.page = 1;
        if (state.role !== "city") closeModal("remindModal");
        renderAll();
    });

    /* ===== 交办年份选择器（模糊查询条件，仅可选年份） ===== */
    const yearFilter = document.getElementById("yearFilter");
    const yearFilterPanel = document.getElementById("yearFilterPanel");
    const yearFilterGrid = document.getElementById("yearFilterGrid");
    let yearPageStart = 0;

    function renderYearGrid() {
        const active = yearFilter.value;
        document.getElementById("yearFilterRange").textContent = `${yearPageStart} - ${yearPageStart + 11}`;
        let cells = "";
        for (let i = 0; i < 12; i += 1) {
            const year = yearPageStart + i;
            cells += `<button type="button" class="year-cell ${String(year) === active ? "active" : ""}" data-year="${year}">${year}</button>`;
        }
        yearFilterGrid.innerHTML = cells;
    }

    function openYearPanel() {
        const current = Number(yearFilter.value) || new Date().getFullYear();
        yearPageStart = Math.floor(current / 12) * 12;
        renderYearGrid();
        yearFilterPanel.hidden = false;
    }

    yearFilter.addEventListener("click", () => {
        if (yearFilterPanel.hidden) openYearPanel();
        else yearFilterPanel.hidden = true;
    });

    yearFilterPanel.addEventListener("click", event => {
        const cell = event.target.closest("[data-year]");
        if (cell) { yearFilter.value = cell.dataset.year; yearFilterPanel.hidden = true; return; }
        if (event.target.closest("[data-yclear]")) { yearFilter.value = ""; yearFilterPanel.hidden = true; return; }
        const step = event.target.closest("[data-ystep]");
        if (step) { yearPageStart += Number(step.dataset.ystep); renderYearGrid(); }
    });

    document.addEventListener("click", event => {
        if (!event.target.closest("#yearFilterWrap")) yearFilterPanel.hidden = true;
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") yearFilterPanel.hidden = true;
    });

    /* ===== 筛选 ===== */
    function filteredClues() {
        return CLUES.filter(item => {
            if (state.view === "待办" && item.status !== "待办") return false;
            if (state.view === "已办" && item.status !== "已办") return false;
            if (state.view === "未反馈" && item.status !== "过期未办") return false;
            if (state.view === "过期未反馈" && !isOverdue(item)) return false;
            if (state.view === "即将到期" && !isNearDue(item)) return false;
            if (state.type && item.type !== state.type) return false;
            if (state.city && item.city !== state.city) return false;
            const approved = item.defer && item.defer.status === "已通过";
            if (state.defer === "yes" && !approved) return false;
            if (state.defer === "no" && approved) return false;
            if (state.year && (item.assignDate || "").slice(0, 4) !== state.year) return false;
            if (state.kw) {
                const kw = state.kw.replace(/\s+/g, "").toLowerCase();
                const title = String(item.title || "").replace(/\s+/g, "").toLowerCase();
                const code = String(item.code || "").toLowerCase();
                if (!title.includes(kw) && !code.includes(kw)) return false;
            }
            return true;
        });
    }

    document.getElementById("filterForm").addEventListener("submit", event => {
        event.preventDefault();
        state.type = document.getElementById("typeFilter").value;
        state.city = document.getElementById("cityFilter").value;
        state.defer = document.getElementById("deferFilter").value;
        state.year = yearFilter.value;
        state.kw = document.getElementById("kwFilter").value.trim();
        state.page = 1;
        renderAll();
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
        document.getElementById("filterForm").reset();
        yearFilter.value = "";
        yearFilterPanel.hidden = true;
        Object.assign(state, { view: "all", type: "", city: "", defer: "", year: "", kw: "", page: 1 });
        renderAll();
        showToast("筛选条件已重置");
    });

    /* ===== 列表 ===== */
    function isOverdue(clue) {
        if (clue.status === "已办") return false;
        const effectiveDue = clue.extendedDue || clue.dueDate;
        return daysBetween(effectiveDue, todayStr()) > 0;
    }

    /* 即将到期：待办且距整改期限不足 5 日（含当日） */
    function isNearDue(clue) {
        if (clue.status !== "待办") return false;
        const effectiveDue = clue.extendedDue || clue.dueDate;
        const remain = daysBetween(todayStr(), effectiveDue);
        return remain >= 0 && remain <= 5;
    }

    function renderTable() {
        const rows = filteredClues();
        const pages = Math.max(1, Math.ceil(rows.length / state.pageSize));
        state.page = Math.min(state.page, pages);
        const pageRows = rows.slice((state.page - 1) * state.pageSize, state.page * state.pageSize);
        const body = document.getElementById("tableBody");

        if (!pageRows.length) {
            body.innerHTML = `<tr class="empty-row"><td colspan="8"><span class="empty-state"><i class="fa-regular fa-folder-open"></i>暂无符合条件的问题线索</span></td></tr>`;
        } else {
            body.innerHTML = pageRows.map((clue, index) => {
                const overdueBadge = isOverdue(clue) ? `<span class="overdue-mark">已过期${daysBetween(clue.extendedDue || clue.dueDate, todayStr())}天</span>` : "";
                const deferCell = clue.defer && clue.defer.status === "已通过"
                    ? `<span class="defer-red">${clue.extendedDue}</span><button class="defer-note-link" data-defernote="${clue.id}">延期说明</button>`
                    : `<span class="muted-dash">—</span>`;
                const ops = [`<button class="op-icon" data-detail="${clue.id}" title="详情" aria-label="详情"><i class="fa-regular fa-magnifying-glass"></i></button>`];
                if (canReport(clue)) {
                    ops.push(`<button class="op-icon" data-report="${clue.id}" title="填报" aria-label="填报"><i class="fa-regular fa-pen-to-square"></i></button>`);
                }
                const rowCls = isOverdue(clue) ? "row-overdue" : (isNearDue(clue) ? "row-near" : "");
                return `<tr${rowCls ? ` class="${rowCls}"` : ""} data-clue="${clue.id}">
                    <td class="center mono">${(state.page - 1) * state.pageSize + index + 1}</td>
                    <td><div class="cell-title" title="${esc(clue.title)}">${esc(clue.title)}</div></td>
                    <td class="center">${typeTag(clue.type)}</td>
                    <td class="center">${esc(clue.city)}</td>
                    <td class="center mono">${clue.assignDate}</td>
                    <td class="center mono">${clue.dueDate}${overdueBadge}</td>
                    <td class="center">${deferCell}</td>
                    <td><div class="actions">${ops.join("")}</div></td>
                </tr>`;
            }).join("");
        }
        renderPagination(rows.length, pages);
    }

    function renderPagination(total, pages) {
        const box = document.getElementById("pagination");
        let buttons = "";
        for (let i = 1; i <= pages; i += 1) {
            if (pages > 7 && i > 2 && i < pages - 1 && Math.abs(i - state.page) > 1) {
                if (!buttons.endsWith("…")) buttons += `<span>…</span>`;
                continue;
            }
            buttons += `<button type="button" class="page-btn ${i === state.page ? "active" : ""}" data-page="${i}">${i}</button>`;
        }
        box.innerHTML = `
            <span>共 ${total} 条</span>
            <select class="page-size" id="pageSize">
                ${[12, 15, 20, 50].map(size => `<option value="${size}" ${size === state.pageSize ? "selected" : ""}>${size}条/页</option>`).join("")}
            </select>
            <div class="page-buttons">
                <button type="button" class="page-btn" data-step="-1" ${state.page <= 1 ? "disabled" : ""}><i class="fa-solid fa-chevron-left"></i></button>
                ${buttons}
                <button type="button" class="page-btn" data-step="1" ${state.page >= pages ? "disabled" : ""}><i class="fa-solid fa-chevron-right"></i></button>
            </div>
            <span>跳至 <input class="jump-input" id="jumpInput" value="${state.page}"> 页</span>`;
    }

    document.getElementById("pagination").addEventListener("click", event => {
        const pageBtn = event.target.closest("[data-page]");
        const stepBtn = event.target.closest("[data-step]");
        const pages = Math.max(1, Math.ceil(filteredClues().length / state.pageSize));
        if (pageBtn) state.page = Number(pageBtn.dataset.page);
        if (stepBtn) state.page = Math.min(pages, Math.max(1, state.page + Number(stepBtn.dataset.step)));
        if (pageBtn || stepBtn) renderTable();
    });

    document.getElementById("pagination").addEventListener("change", event => {
        if (event.target.id === "pageSize") { state.pageSize = Number(event.target.value); state.page = 1; renderTable(); }
        if (event.target.id === "jumpInput") {
            const pages = Math.max(1, Math.ceil(filteredClues().length / state.pageSize));
            state.page = Math.min(pages, Math.max(1, Number(event.target.value) || 1));
            renderTable();
        }
    });

    document.getElementById("tableBody").addEventListener("click", event => {
        const detail = event.target.closest("[data-detail]");
        const report = event.target.closest("[data-report]");
        const edit = event.target.closest("[data-edit]");
        const deferNote = event.target.closest("[data-defernote]");
        if (detail) return openDetail(Number(detail.dataset.detail));
        if (report) return openReport(Number(report.dataset.report));
        if (edit) return openEdit(Number(edit.dataset.edit));
        if (deferNote) return openDeferNote(Number(deferNote.dataset.defernote));
        /* 点击整行任意位置查看详情 */
        const row = event.target.closest("tr[data-clue]");
        if (row) openDetail(Number(row.dataset.clue));
    });

    document.getElementById("exportBtn").addEventListener("click", () => {
        const rows = filteredClues();
        exportCsv("问题线索数据.csv", ["序号", "问题编号", "问题线索标题", "问题类型", "所属地市", "交办日期", "计划截止日期", "延期截止日期", "是否延期", "延期类型", "办理状态"],
            rows.map((item, index) => [index + 1, item.code, item.title, item.type, item.city, item.assignDate, item.dueDate,
                item.defer && item.defer.status === "已通过" ? item.extendedDue : "", item.defer && item.defer.status === "已通过" ? "是" : "否", item.defer ? item.defer.category || "" : "", item.status]));
    });

    /* ===== 到期提醒弹窗 ===== */
    function nearDueClues() {
        return CLUES.filter(item => {
            if (item.status !== "待办") return false;
            const remain = daysBetween(todayStr(), item.dueDate);
            return remain >= 0 && remain <= 5;
        }).sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    }

    function renderRemind() {
        const list = nearDueClues();
        const box = document.getElementById("remindList");
        if (!list.length) {
            box.innerHTML = `<div class="popup-row"><span class="t" style="grid-column:1/-1;color:#9aa8b8;text-align:center">近5日内无即将到期的问题线索</span></div>`;
            return;
        }
        box.innerHTML = `
            <div class="popup-row head"><span>问题线索标题</span><span>问题类型</span><span>地市</span><span>计划截止日期</span><span>剩余时间</span></div>
            ${list.map(clue => {
                const remain = daysBetween(todayStr(), clue.dueDate);
                const label = remain === 0 ? "今日到期" : `剩 ${remain} 天`;
                return `<div class="popup-row" data-near="${clue.id}">
                    <span class="t">${esc(clue.title)}</span>
                    <span>${typeTag(clue.type)}</span>
                    <span>${esc(clue.city)}</span>
                    <span class="mono">${clue.dueDate}</span>
                    <span><span class="remain-badge ${remain > 3 ? "warn" : ""}">${label}</span></span>
                </div>`;
            }).join("")}`;
    }

    function autoRemind() {
        /* 仅地市角色收到到期提醒弹框 */
        if (state.role !== "city") return;
        const flag = "clueRemindDismissed";
        if (localStorage.getItem(flag) !== todayStr()) openModal("remindModal");
    }

    document.getElementById("remindNever").addEventListener("click", () => {
        localStorage.setItem("clueRemindDismissed", todayStr());
        closeModal("remindModal");
        showToast("今日内不再自动弹出到期提醒");
    });

    document.getElementById("remindBtn").addEventListener("click", () => { renderRemind(); openModal("remindModal"); });

    /* 点击提醒弹框中的某条数据：跳转到问题线索页并显示「即将到期」列表 */
    document.getElementById("remindList").addEventListener("click", event => {
        const row = event.target.closest("[data-near]");
        if (!row) return;
        if (document.getElementById("tableBody")) {
            closeModal("remindModal");
            state.view = "即将到期";
            state.page = 1;
            renderAll();
            document.querySelector(".table-wrap").scrollIntoView({ behavior: "smooth", block: "start" });
            showToast("已显示即将到期的问题线索");
        } else {
            window.location.href = "01-问题线索.html?view=near";
        }
    });

    /* ===== 上传组件 ===== */
    const FILE_POOL = ["整改实施方案.pdf", "现场核查记录.docx", "监督性监测报告.pdf", "整改前后对比说明.pdf", "工程可行性方案.pdf"];

    function bindUpload(boxId, items, kind, photoPrompts, capText) {
        const box = document.getElementById(boxId);
        box.addEventListener("click", event => {
            const removePhoto = event.target.closest("[data-rm-photo]");
            const removeFile = event.target.closest("[data-rm-file]");
            if (removePhoto) { items.splice(Number(removePhoto.dataset.rmPhoto), 1); renderUpload(box, items, kind, capText); return; }
            if (removeFile) { items.splice(Number(removeFile.dataset.rmFile), 1); renderUpload(box, items, kind, capText); return; }
            if (!event.target.closest("[data-add]")) return;
            if (kind === "photo") items.push(photoPrompts[Math.floor(Math.random() * photoPrompts.length)]);
            else items.push({ name: FILE_POOL[Math.floor(Math.random() * FILE_POOL.length)], size: `${(Math.random() * 5 + 0.3).toFixed(1)}MB` });
            renderUpload(box, items, kind, capText);
        });
    }

    function renderUpload(box, items, kind, capText) {
        const add = `<div class="upload-add" data-add="${kind}"><i class="fa-solid ${kind === "photo" ? "fa-camera" : "fa-file-arrow-up"}"></i>点击上传</div>`;
        const nodes = items.map((item, index) => kind === "photo"
            ? `<div class="photo-card"><img src="${ClueUI.photoUrl(item)}" alt="${capText}"><span class="photo-cap">${capText}${index + 1}</span><button class="photo-x" type="button" data-rm-photo="${index}"><i class="fa-solid fa-xmark"></i></button></div>`
            : `<div class="file-row"><i class="fa-solid fa-file-pdf file-ic"></i><span class="file-name">${esc(item.name)}</span><span class="file-size">${item.size}</span><button class="file-x" type="button" data-rm-file="${index}"><i class="fa-solid fa-xmark"></i></button></div>`);
        box.innerHTML = nodes.join("") + add;
    }

    bindUpload("materialUpload", editFiles, "file");
    bindUpload("reportBeforeUpload", reportBeforePhotos, "photo", BEFORE_PHOTO_PROMPTS, "整改前照片");
    bindUpload("afterUpload", reportPhotos, "photo", AFTER_PHOTO_PROMPTS, "整改后照片");
    bindUpload("reportFileUpload", reportFiles, "file");

    /* ===== 新增 / 编辑 ===== */
    const TYPE_HINTS = {
        "重大问题": "整改时限提示：自交办之日起6个月内完成整改及查处。",
        "突出问题": "整改时限提示：自交办之日起3个月内完成全面整改。",
        "一般问题": "整改时限提示：自交办之日起1个月内首次报送立行立改完成情况。",
        "其他问题": "整改时限提示：按交办要求在规定时限内完成整改。"
    };

    /* 各问题类型对应的整改时限（月），"其他问题"无固定时限 */
    const TYPE_MONTHS = { "重大问题": 6, "突出问题": 3, "一般问题": 1 };

    function addMonths(dateStr, months) {
        const [year, month, day] = dateStr.split("-").map(Number);
        const base = new Date(year, month - 1 + months, 1);
        const lastDay = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
        base.setDate(Math.min(day, lastDay));
        return `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}-${String(base.getDate()).padStart(2, "0")}`;
    }

    /* 依据问题类型同步截止日期：有明确时限的类型自动计算并锁定，其他问题可手动选择 */
    function syncDueField(type, recalc) {
        const start = document.getElementById("fStart").value || todayStr();
        const dueInput = document.getElementById("fDue");
        const dueHint = document.getElementById("dueHint");
        const months = TYPE_MONTHS[type];
        if (months) {
            if (recalc) dueInput.value = addMonths(start, months);
            dueInput.readOnly = true;
            dueHint.textContent = `按「${type}」时限自动计算（${months} 个月），不可手动修改`;
        } else if (type) {
            dueInput.readOnly = false;
            dueHint.textContent = "无固定整改时限，请按交办要求自行选择";
        } else {
            dueInput.readOnly = false;
            dueHint.textContent = "";
        }
    }

    function setEditCoord(lng, lat) {
        document.getElementById("fLng").value = lng;
        document.getElementById("fLat").value = lat;
        document.getElementById("editCoord").innerHTML = `问题坐标：<strong>${lng}, ${lat}</strong><br>支持点击地图重新选点，或在左侧输入框直接修改。`;
    }

    function openEdit(id) {
        editingId = id || null;
        const clue = id ? clueById(id) : null;
        document.getElementById("editTitle").textContent = clue ? "编辑问题线索" : "新增问题线索";
        document.getElementById("editSave").textContent = clue ? "保 存" : "提 交";
        document.getElementById("editIdLabel").textContent = "";
        editFiles.length = 0;
        if (clue && clue.files && clue.files.length) editFiles.push(...clue.files.map(file => ({ ...file })));
        renderUpload(document.getElementById("materialUpload"), editFiles, "file");
        document.getElementById("fTitle").value = clue ? clue.title : "";
        document.getElementById("fType").value = clue ? clue.type : "";
        document.getElementById("fCity").value = clue ? clue.city : CITIES[0];
        syncOfficer();
        document.getElementById("fStart").value = clue ? clue.startDate : todayStr();
        document.getElementById("fDue").value = clue ? clue.dueDate : "";
        document.getElementById("fLng").value = clue ? clue.lng : "";
        document.getElementById("fLat").value = clue ? clue.lat : "";
        document.getElementById("fDesc").value = clue ? clue.desc : "";
        const hint = document.getElementById("typeHint");
        hint.hidden = !clue;
        hint.textContent = clue ? TYPE_HINTS[clue.type] : "";
        syncDueField(clue ? clue.type : "", false);
        openModal("editModal");     /* 先展示弹窗，容器有真实尺寸后再创建地图 */
        editMap = ClueMap.create(document.getElementById("editMapWrap"), {
            pick: true,
            zoom: true,
            lng: clue ? clue.lng : null,
            lat: clue ? clue.lat : null,
            onPick: setEditCoord
        });
        if (clue && clue.lng && clue.lat) {
            setEditCoord(clue.lng, clue.lat);
            editMap.focus(clue.lng, clue.lat, 2.4);
        } else {
            focusEditMapOnCity(false);
        }
    }

    document.getElementById("addBtn").addEventListener("click", () => openEdit());

    document.getElementById("fType").addEventListener("change", event => {
        const hint = document.getElementById("typeHint");
        hint.hidden = !event.target.value;
        hint.textContent = TYPE_HINTS[event.target.value] || "";
        syncDueField(event.target.value, true);
    });

    document.getElementById("editSave").addEventListener("click", () => {
        const title = document.getElementById("fTitle").value.trim();
        const type = document.getElementById("fType").value;
        const city = document.getElementById("fCity").value;
        const start = document.getElementById("fStart").value;
        const due = document.getElementById("fDue").value;
        const desc = document.getElementById("fDesc").value.trim();
        const lng = parseFloat(document.getElementById("fLng").value);
        const lat = parseFloat(document.getElementById("fLat").value);
        if (!title) return showToast("请填写问题标题");
        if (!type) return showToast("请选择问题类型");
        if (!start || !due) return showToast("请选择问题类型以生成截止日期");
        if (daysBetween(start, due) < 0) return showToast("截止日期不能早于开始日期");
        if (!desc) return showToast("请填写问题描述");

        if (editingId) {
            const clue = clueById(editingId);
            Object.assign(clue, { title, type, city, startDate: start, dueDate: due, desc, lng: isNaN(lng) ? clue.lng : lng, lat: isNaN(lat) ? clue.lat : lat, files: editFiles.map(file => ({ ...file })) });
            showToast("问题线索已更新");
        } else {
            const nextNum = Math.max(...CLUES.map(item => Number(item.code.replace(/\D/g, "")))) + 1;
            CLUES.unshift({
                id: Math.max(...CLUES.map(item => item.id)) + 1,
                code: `WT2026-${String(nextNum).padStart(3, "0")}`,
                title, type, city, district: "", desc,
                assignDate: todayStr(), startDate: start, dueDate: due, status: "待办",
                lng: isNaN(lng) ? null : lng, lat: isNaN(lat) ? null : lat,
                files: editFiles.map(file => ({ ...file })),
                beforePhotos: [],
                reports: [], defer: null, extendedDue: "", deferDays: 0
            });
            showToast("问题线索已新增并交办");
        }
        closeModal("editModal");
        renderAll();
    });

    /* ===== 整改填报 ===== */
    const REPORT_FORM_TEXT = {
        "突出问题": {
            noteLabel: `整改进展情况说明<i class="req">*</i>`, notePh: "请说明当前整改进展"
        },
        "重大问题": {
            noteLabel: `整改进展情况说明<i class="req">*</i>`, notePh: "请说明当前整改进展"
        }
    };
    const REPORT_FORM_SIMPLE = {
        noteLabel: `立行立改完成情况<i class="req">*</i>`, notePh: "请说明立行立改措施及完成情况"
    };
    function updateReportForm(type) {
        const conf = REPORT_FORM_TEXT[type] || REPORT_FORM_SIMPLE;
        const isComplex = type === "突出问题" || type === "重大问题";
        ["reportSourceItem", "reportMeasuresItem", "reportPlanItem"].forEach(itemId => {
            document.getElementById(itemId).style.display = isComplex ? "" : "none";
        });
        document.getElementById("reportNoteLabel").innerHTML = conf.noteLabel;
        document.getElementById("reportNote").placeholder = conf.notePh;
    }

    /* 可填报：待办且（未反馈 或 最近一次反馈为整改中），办结后锁定 */
    function canReport(clue) {
        if (clue.status !== "待办" || state.role !== "city") return false;
        const last = clue.reports[clue.reports.length - 1];
        return !last || !last.done;
    }

    function openReport(id) {
        reportClueId = id;
        const clue = clueById(id);
        const last = clue.reports[clue.reports.length - 1] || null;
        /* 已办结锁定不可再反馈；整改中允许再次填报更新 */
        if (last && last.done) { showToast("该问题已完成整改办结，无需再次反馈"); return; }
        const editing = !!last;
        reportBeforePhotos.length = 0; reportPhotos.length = 0; reportFiles.length = 0;
        document.querySelector('input[name="reportDone"][value="no"]').checked = true;
        document.getElementById("reportNote").value = "";
        ["reportSource", "reportMeasures", "reportPlan"].forEach(fieldId => document.getElementById(fieldId).value = "");
        if (editing) {
            document.querySelector(`input[name="reportDone"][value="${last.done ? "yes" : "no"}"]`).checked = true;
            document.getElementById("reportNote").value = last.note || "";
            document.getElementById("reportSource").value = last.source || "";
            document.getElementById("reportMeasures").value = last.measures || "";
            document.getElementById("reportPlan").value = last.plan || "";
            reportBeforePhotos.push(...(last.beforePhotos || []).map(index => BEFORE_PHOTO_PROMPTS[index % BEFORE_PHOTO_PROMPTS.length]));
            reportPhotos.push(...(last.afterPhotos || []).map(index => AFTER_PHOTO_PROMPTS[index % AFTER_PHOTO_PROMPTS.length]));
            reportFiles.push(...(last.files || []).map(file => ({ ...file })));
        }
        renderUpload(document.getElementById("reportBeforeUpload"), reportBeforePhotos, "photo", "整改前照片");
        renderUpload(document.getElementById("afterUpload"), reportPhotos, "photo", "整改后照片");
        renderUpload(document.getElementById("reportFileUpload"), reportFiles, "file");
        updateReportForm(clue.type);
        document.getElementById("reportTitle").textContent = "地市反馈填报";
        const updateHint = editing ? `<p class="popup-note" style="margin:0 0 10px">该线索已反馈「整改中」，本次提交将<strong>更新</strong>反馈内容；确认整改完成后请勾选「已完成整改（办结）」。</p>` : "";
        document.getElementById("reportClueInfo").innerHTML = `${updateHint}
            <div class="rc-head"><span class="rc-label">问题线索标题</span><span class="rc-val">${esc(clue.title)}</span></div>
            <div class="info-grid" style="margin-top:10px">
                <div class="label">问题类型</div><div>${typeTag(clue.type)}</div>
                <div class="label">所属地市</div><div>${esc(clue.city)}</div>
                <div class="label">交办日期</div><div class="mono">${clue.assignDate}</div>
                <div class="label">计划截止日期</div><div class="mono">${clue.dueDate}</div>
                <div class="label">剩余工作日</div><div class="mono">${workingDaysLeft(clue.extendedDue || clue.dueDate) || 0} 个</div>
                <div class="label">延期截止日期</div><div>${clue.defer && clue.defer.status === "已通过" ? `<span class="defer-red mono">${clue.extendedDue}</span>` : `<span style="color:#a5afbb">—</span>`}</div>
            </div>`;
        openModal("reportModal");
        showReportGis(clue);
    }

    document.getElementById("reportSave").addEventListener("click", () => {
        const clue = clueById(reportClueId);
        const note = document.getElementById("reportNote").value.trim();
        const done = document.querySelector('input[name="reportDone"]:checked').value === "yes";
        const payload = {
            date: todayStr(),
            person: `${clue.city}生态环境局`,
            done,
            beforePhotos: reportBeforePhotos.map(prompt => BEFORE_PHOTO_PROMPTS.indexOf(prompt)),
            afterPhotos: reportPhotos.map(prompt => AFTER_PHOTO_PROMPTS.indexOf(prompt)),
            files: reportFiles.map(file => ({ ...file }))
        };
        if (clue.type === "突出问题" || clue.type === "重大问题") {
            const source = document.getElementById("reportSource").value.trim();
            const measures = document.getElementById("reportMeasures").value.trim();
            const plan = document.getElementById("reportPlan").value.trim();
            if (!source) return showToast("请填写溯源排查结果");
            if (!measures) return showToast("请填写整改措施");
            if (!plan) return showToast("请填写整改方案");
            if (!note) return showToast("请填写整改进展情况说明");
            payload.source = source; payload.measures = measures; payload.plan = plan;
            payload.note = note;
        } else {
            if (!note) return showToast("请填写立行立改完成情况");
            payload.note = note;
        }
        clue.reports = [payload];
        if (done) clue.status = "已办";
        closeModal("reportModal");
        showToast(done ? "填报成功，该问题已办结" : "整改情况已报送");
        renderAll();
        if (currentDetailId === clue.id) renderDetailPanes(clue);
    });

    /* ===== 放大选点：滚轮缩放 / 拖拽平移 / 确定回传点位 ===== */
    function renderZoomCoord() {
        document.getElementById("zoomCoord").innerHTML = zoomPick
            ? `当前点位：<strong>${zoomPick.lng}, ${zoomPick.lat}</strong>`
            : "当前点位：未选择（单击地图落点）";
    }

    function openMapZoom() {
        const city = document.getElementById("fCity").value;
        const lng = parseFloat(document.getElementById("fLng").value);
        const lat = parseFloat(document.getElementById("fLat").value);
        zoomPick = (!isNaN(lng) && !isNaN(lat)) ? { lng, lat } : null;
        document.getElementById("mapZoomCity").textContent = city || "未选择地区";
        renderZoomCoord();
        openModal("mapZoomModal");
        zoomMap = ClueMap.create(document.getElementById("zoomMapWrap"), {
            pick: true,
            zoom: true,
            lng: zoomPick ? zoomPick.lng : null,
            lat: zoomPick ? zoomPick.lat : null,
            onPick: (l, a) => { zoomPick = { lng: l, lat: a }; renderZoomCoord(); }
        });
        const center = zoomPick || (city ? ClueMap.centerOf(city) : null);
        if (center) zoomMap.focus(center.lng, center.lat, zoomPick ? 3 : 2.2);
    }

    document.getElementById("editMapZoom").addEventListener("click", openMapZoom);
    document.getElementById("zoomIn").addEventListener("click", () => { if (zoomMap) zoomMap.zoomBy(1.3); });
    document.getElementById("zoomOut").addEventListener("click", () => { if (zoomMap) zoomMap.zoomBy(1 / 1.3); });
    document.getElementById("zoomReset").addEventListener("click", () => {
        if (!zoomMap) return;
        zoomMap.resetView();
        const center = ClueMap.centerOf(document.getElementById("fCity").value);
        if (center) zoomMap.focus(center.lng, center.lat, 2.2);
    });
    document.getElementById("zoomConfirm").addEventListener("click", () => {
        if (!zoomPick) return showToast("请先在地图上点击选择点位");
        setEditCoord(zoomPick.lng, zoomPick.lat);
        if (editMap) editMap.setPoint(zoomPick.lng, zoomPick.lat);
        closeModal("mapZoomModal");
        showToast(`已回填点位：${zoomPick.lng}, ${zoomPick.lat}`);
    });

    /* ===== 延期说明 ===== */
    function openDeferNote(id) {
        const clue = clueById(id);
        const defer = clue.defer;
        if (!defer) return;
        document.getElementById("deferNoteBody").innerHTML = `
            <div class="info-grid">
                <div class="label">延期类型</div><div><span class="tag general">${esc(defer.category || "未分类")}</span></div>
                <div class="label">审核状态</div><div>${deferTag(defer.status)}</div>
                <div class="label">问题线索标题</div><div class="span3 wrap">${esc(clue.title)}</div>
                <div class="label">原计划截止日期</div><div class="mono">${clue.dueDate}</div>
                <div class="label">延期截止日期</div><div class="mono defer-red">${defer.appliedDue}</div>
                <div class="label">申请日期</div><div class="mono">${defer.applyDate}</div>
                <div class="label">审核人</div><div>${esc(defer.reviewer || "待审核")}</div>
                <div class="label">审核日期</div><div class="mono">${defer.reviewDate || "—"}</div>
            </div>
            <div class="block-label">延期说明</div>
            <div class="desc-block">${esc(defer.reason)}</div>
            <div class="block-label">工程可行性方案</div>
            <div class="file-list" style="grid-template-columns:1fr">
                <div class="file-row"><i class="fa-solid fa-file-pdf file-ic"></i><span class="file-name">${esc(defer.planFile.name)}</span><span class="file-size">${defer.planFile.size}</span></div>
            </div>
            ${defer.reviewNote ? `<div class="block-label">省级审核意见</div><div class="desc-block">${esc(defer.reviewNote)}</div>` : ""}`;
        openModal("deferNoteModal");
    }

    /* ===== 详情 ===== */
    document.getElementById("detailTabs").addEventListener("click", event => {
        const tab = event.target.closest("[data-pane]");
        if (!tab) return;
        document.querySelectorAll("#detailTabs .d-tab").forEach(item => item.classList.toggle("active", item === tab));
        ["paneInfo", "paneReport", "paneDefer"].forEach(paneId => {
            document.getElementById(paneId).style.display = paneId === tab.dataset.pane ? "" : "none";
        });
    });

    function openDetail(id) {
        currentDetailId = id;
        const clue = clueById(id);
        const tags = [typeTag(clue.type), statusTag(clue.status)];
        if (clue.defer && clue.defer.status === "已通过") tags.push(`<span class="tag reject">已延期</span>`);
        if (clue.defer && clue.defer.status === "待省级审核") tags.push(`<span class="tag wait">延期审核中</span>`);
        if (clue.defer && clue.defer.status === "已驳回") tags.push(`<span class="tag reject">延期被驳回</span>`);
        document.getElementById("detailHeadTitle").textContent = clue.title;
        document.getElementById("detailHeadTags").innerHTML = tags.join("");
        /* 省级在 01 页仅查看，不提供编辑/填报入口；已办结的线索锁定填报 */
        document.getElementById("detailActions").innerHTML = canReport(clue)
            ? `<button class="btn primary" type="button" data-dreport="${clue.id}" style="height:34px;padding:0 14px;font-size:14px"><i class="fa-solid fa-pen"></i>填报整改</button>`
            : "";
        /* 无延期记录时隐藏「延期记录」选项卡 */
        const deferTab = document.querySelector('#detailTabs .d-tab[data-pane="paneDefer"]');
        if (deferTab) deferTab.style.display = clue.defer ? "" : "none";
        document.querySelectorAll("#detailTabs .d-tab").forEach((tab, index) => tab.classList.toggle("active", index === 0));
        ["paneInfo", "paneReport", "paneDefer"].forEach((paneId, index) => {
            document.getElementById(paneId).style.display = index === 0 ? "" : "none";
        });
        renderDetailPanes(clue);
        openModal("detailModal");
    }

    document.getElementById("detailActions").addEventListener("click", event => {
        const edit = event.target.closest("[data-dedit]");
        const report = event.target.closest("[data-dreport]");
        if (edit) { closeModal("detailModal"); openEdit(Number(edit.dataset.dedit)); }
        if (report) openReport(Number(report.dataset.dreport));
    });

    function renderDetailPanes(clue) {
        const overdueBadge = isOverdue(clue) ? `<span class="overdue-mark">已过期</span>` : "";
        document.getElementById("paneInfoMain").innerHTML = `
            <div class="info-grid">
                <div class="label">问题类型</div><div>${typeTag(clue.type)}</div>
                <div class="label">所属地市</div><div>${esc(clue.city)}${clue.district ? " · " + esc(clue.district) : ""}</div>
                <div class="label">办理状态</div><div>${statusTag(clue.status)}</div>
                <div class="label">交办日期</div><div class="mono">${clue.assignDate}</div>
                <div class="label">开始日期</div><div class="mono">${clue.startDate}</div>
                <div class="label">计划截止日期</div><div class="mono">${clue.dueDate}${overdueBadge}</div>
                <div class="label">延期截止日期</div><div>${clue.defer && clue.defer.status === "已通过" ? `<span class="defer-red mono">${clue.extendedDue}</span>` : `<span style="color:#a5afbb">—</span>`}</div>
                <div class="label">问题坐标</div><div class="mono">${clue.lng ? `${clue.lng}, ${clue.lat}` : "未设置"}</div>
            </div>
            <div class="dt-section"><i class="fa-regular fa-file-lines"></i>问题描述</div>
            <div class="desc-block">${esc(clue.desc)}</div>
            <div class="dt-section"><i class="fa-solid fa-paperclip"></i>问题材料</div>
            ${clue.files && clue.files.length ? `<div class="file-list">${clue.files.map(file => `<div class="file-row"><i class="fa-solid fa-file-pdf file-ic"></i><span class="file-name">${esc(file.name)}</span><span class="file-size">${file.size}</span></div>`).join("")}</div>` : `<div class="desc-block" style="color:#9aa8b8">暂无问题材料</div>`}`;

        const isComplex = clue.type === "突出问题" || clue.type === "重大问题";
        const fb = clue.reports.length ? clue.reports[clue.reports.length - 1] : null;
        const fbField = (icon, label, value) => `<div class="dt-field"><div class="dt-field-label"><i class="fa-solid ${icon}"></i>${label}</div><div class="dt-field-value">${value}</div></div>`;
        const fbDash = `<span class="dt-empty">—</span>`;
        const fbBlock = fb ? `
            <div class="dt-result">
                <div class="dt-result-item">
                    <div class="dt-result-label">是否完成整改</div>
                    <div class="dt-result-value"><span class="dt-status ${fb.done ? "is-done" : ""}"><i class="fa-solid ${fb.done ? "fa-circle-check" : "fa-arrows-rotate"}"></i>${fb.done ? "已完成整改" : "整改中"}</span></div>
                </div>
                <div class="dt-result-item">
                    <div class="dt-result-label">反馈人</div>
                    <div class="dt-result-value">${esc(fb.person)}</div>
                </div>
                <div class="dt-result-item">
                    <div class="dt-result-label">反馈时间</div>
                    <div class="dt-result-value mono">${fb.date}</div>
                </div>
            </div>
            <div class="dt-section"><i class="fa-regular fa-comment-dots"></i>反馈内容</div>
            <div class="dt-fields">
                    ${isComplex ? fbField("fa-screwdriver-wrench", "整改措施", fb.measures ? esc(fb.measures) : fbDash) : ""}
                    ${isComplex ? fbField("fa-diagram-project", "整改方案", fb.plan ? esc(fb.plan) : fbDash) : ""}
                    ${isComplex ? fbField("fa-magnifying-glass-chart", "溯源排查结果", fb.source ? esc(fb.source) : fbDash) : ""}
                    ${fbField("fa-list-check", isComplex ? "整改进展情况说明" : "立行立改完成情况", fb.note ? esc(fb.note) : fbDash)}
                    ${fbField("fa-image", `整改前照片（${(fb.beforePhotos || []).length} 张）`, (fb.beforePhotos || []).length
                        ? `<div class="tl-photos">${fb.beforePhotos.map(index => `<div class="photo-card"><img src="${beforePhotoUrl(index)}" alt="整改前照片"><span class="photo-cap">整改前照片</span></div>`).join("")}</div>`
                        : fbDash)}
                    ${fbField("fa-images", `整改后照片（${(fb.afterPhotos || []).length} 张）`, (fb.afterPhotos || []).length
                        ? `<div class="tl-photos">${fb.afterPhotos.map(index => `<div class="photo-card"><img src="${afterPhotoUrl(index)}" alt="整改后照片"><span class="photo-cap">整改后照片</span></div>`).join("")}</div>`
                        : fbDash)}
                    ${fbField("fa-paperclip", `佐证材料（${(fb.files || []).length} 份）`, (fb.files || []).length
                        ? `<div class="file-list">${fb.files.map(file => `<div class="file-row"><i class="fa-solid fa-file-pdf file-ic"></i><span class="file-name">${esc(file.name)}</span><span class="file-size">${file.size}</span></div>`).join("")}</div>`
                        : fbDash)}
            </div>` : "";

        document.getElementById("paneReport").innerHTML = fb
            ? fbBlock
            : `<div style="padding:40px 0;text-align:center"><span class="empty-state"><i class="fa-solid fa-comment-dots"></i>暂无地市反馈记录${canReport(clue) ? "，请点击右上角「填报整改」提交情况" : (state.role === "province" && clue.status === "待办" ? "，请督促地市尽快填报" : "")}</span></div>`;

        document.getElementById("paneDefer").innerHTML = clue.defer ? `
            <div class="info-grid">
                <div class="label">延期类型</div><div><span class="tag general">${esc(clue.defer.category || "未分类")}</span></div>
                <div class="label">审核状态</div><div>${deferTag(clue.defer.status)}</div>
                <div class="label">原计划截止日期</div><div class="mono">${clue.dueDate}</div>
                <div class="label">申请延期至</div><div class="mono">${clue.defer.appliedDue}</div>
                <div class="label">申请日期</div><div class="mono">${clue.defer.applyDate}</div>
                <div class="label">审核人</div><div>${esc(clue.defer.reviewer || "待审核")}</div>
                <div class="label">审核日期</div><div class="mono">${clue.defer.reviewDate || "—"}</div>
            </div>
            <div class="dt-section"><i class="fa-solid fa-comment-dots"></i>审核意见</div>
            <div class="desc-block">${esc(clue.defer.reviewNote || "待省级审核")}</div>
            <div class="dt-section"><i class="fa-solid fa-hourglass-half"></i>延期理由</div>
            <div class="desc-block">${esc(clue.defer.reason)}</div>
            <div class="dt-section"><i class="fa-solid fa-file-shield"></i>工程可行性方案</div>
            <div class="file-list" style="grid-template-columns:1fr">
                <div class="file-row"><i class="fa-solid fa-file-pdf file-ic"></i><span class="file-name">${esc(clue.defer.planFile.name)}</span><span class="file-size">${clue.defer.planFile.size}</span></div>
            </div>`
            : `<div style="padding:40px 0;text-align:center"><span class="empty-state"><i class="fa-solid fa-hourglass-half"></i>该问题线索暂无延期记录</span></div>`;

        ClueMap.create(document.getElementById("detailMapWrap"), {
            pick: false,
            lng: clue.lng, lat: clue.lat
        });
        document.getElementById("detailCoord").innerHTML = `问题坐标：${clue.lng ? `${clue.lng}, ${clue.lat}` : "未设置"}`;
    }

    function renderAll() {
        renderStats();
        renderTable();
        document.getElementById("addBtn").style.display = state.role === "city" ? "none" : "";
    }

    renderAll();
    renderRemind();
    autoRemind();
})();
