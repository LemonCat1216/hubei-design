    const state = { filtered: rawData.slice(), page: 1, pageSize: 15, summaryView: "all", activeSummaryCard: "outlets" };
    let activeInlineItem = null;
    const inlineMonitorState = { mode: "day", project: "ammonia", page: 1, pageSize: 15, rows: [] };
    const inlineAlarmState = { page: 1, pageSize: 10 };
    const monitorProjectMeta = {
        ammonia: { name: "氨氮", unit: "mg/L" },
        phosphorus: { name: "总磷", unit: "mg/L" },
        nitrogen: { name: "总氮", unit: "mg/L" },
        cod: { name: "化学需氧量", unit: "mg/L" }
    };
    const tableBody = document.getElementById("tableBody");
    const pagination = document.getElementById("pagination");
    const tableScroll = document.querySelector(".table-scroll");
    const monitorTable = document.getElementById("monitorTable");
    const tableColumns = document.getElementById("tableColumns");
    const tableHead = document.getElementById("tableHead");
    const regionFilter = document.getElementById("regionFilter");
    const statusFilter = document.getElementById("statusFilter");

    [...new Set(rawData.map(item => item.region))].forEach(region => {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        regionFilter.appendChild(option);
    });

    function escapeHtml(value) {
        return String(value).replace(/[&<>"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char]));
    }

    function displayPark(item) {
        return item.subpark ? `${item.park} / ${item.subpark}` : item.park;
    }

    function levelClass(level) {
        return ({ "省级": "province", "市级": "city", "县级": "county", "国家级": "national", "未定级": "unknown" })[level] || "unknown";
    }

    function isAlarmView() {
        return state.summaryView === "alarm";
    }

    function updateStatusFilter(view) {
        const alarmOptions = '<option value="">处置状态</option><option value="未处理">未处理</option><option value="已处理">已处理</option>';
        const monitorOptions = '<option value="">全部</option><option value="在线">在线</option><option value="掉线">掉线</option>';
        statusFilter.innerHTML = view === "alarm" ? alarmOptions : monitorOptions;
        statusFilter.setAttribute("aria-label", view === "alarm" ? "处置状态" : "监测状态");
    }

    function renderTableHeader() {
        if (isAlarmView()) {
            monitorTable.setAttribute("aria-label", "报警数据清单");
            tableColumns.innerHTML = '<col style="width:70px"><col style="width:220px"><col style="width:350px"><col style="width:210px"><col style="width:225px"><col style="width:120px"><col style="width:479px">';
            tableHead.innerHTML = '<tr><th>序号</th><th>排口名称</th><th>报警内容</th><th>报警时间</th><th>监管机构</th><th>反馈状态</th><th>反馈内容</th></tr>';
            return;
        }

        monitorTable.setAttribute("aria-label", "在线监测排污口列表");
        tableColumns.innerHTML = '<col style="width:70px"><col style="width:440px"><col style="width:80px"><col style="width:360px"><col style="width:96px"><col style="width:303px"><col style="width:95px"><col style="width:95px"><col style="width:135px">';
        tableHead.innerHTML = '<tr><th>序号</th><th>排污口名称</th><th>地区</th><th>园区/分园名称</th><th>园区级别</th><th>企业名称</th><th>企业经度</th><th>企业纬度</th><th>操作</th></tr>';
    }

    function renderAlarmRows(pageRows, start) {
        return pageRows.map((item, index) => `
            <tr>
                <td class="center">${start + index + 1}</td>
                <td class="alarm-list-cell" title="${escapeHtml(item.outlet)}">${escapeHtml(item.outlet)}</td>
                <td class="alarm-list-cell" title="${escapeHtml(item.alarmContent)}">${escapeHtml(item.alarmContent)}</td>
                <td class="center coordinate">${item.alarmTime}</td>
                <td class="alarm-list-cell" title="${escapeHtml(item.regulator)}">${escapeHtml(item.regulator)}</td>
                <td class="center">${formatFeedbackStatus(item.feedbackContent)}</td>
                <td class="alarm-list-cell feedback-cell ${item.feedbackContent ? "" : "is-empty"}" title="${escapeHtml(item.feedbackContent || "未反馈")}">${formatFeedbackContent(item.feedbackContent)}</td>
            </tr>`).join("");
    }

    function formatFeedbackStatus(feedbackContent) {
        return `<span class="alarm-state ${feedbackContent ? "handled" : "pending"}">${feedbackContent ? "已反馈" : "未反馈"}</span>`;
    }

    function formatFeedbackContent(feedbackContent) {
        return feedbackContent ? escapeHtml(feedbackContent) : '<span class="feedback-empty">--</span>';
    }

    function renderTable() {
        const start = (state.page - 1) * state.pageSize;
        const pageRows = state.filtered.slice(start, start + state.pageSize);
        renderTableHeader();

        if (!pageRows.length) {
            tableBody.innerHTML = `<tr class="empty-row"><td colspan="${isAlarmView() ? 7 : 9}"><i class="fa-regular fa-folder-open"></i>&nbsp;&nbsp;暂无匹配数据</td></tr>`;
        } else if (isAlarmView()) {
            tableBody.innerHTML = renderAlarmRows(pageRows, start);
        } else {
            tableBody.innerHTML = pageRows.map((item, index) => `
                <tr>
                    <td class="center">${start + index + 1}</td>
                    <td><button type="button" class="outlet-link" data-detail="${item.id}" title="${escapeHtml(item.outlet)}">${escapeHtml(item.outlet)}</button></td>
                    <td>${escapeHtml(item.region)}</td>
                    <td title="${escapeHtml(displayPark(item))}">${escapeHtml(displayPark(item))}</td>
                    <td class="center"><span class="level-tag ${levelClass(item.level)}">${escapeHtml(item.level)}</span></td>
                    <td title="${escapeHtml(item.enterprise)}">${escapeHtml(item.enterprise)}</td>
                    <td class="center coordinate" title="${item.lng.toFixed(6)}">${item.lng.toFixed(4)}</td>
                    <td class="center coordinate" title="${item.lat.toFixed(6)}">${item.lat.toFixed(4)}</td>
                    <td><div class="actions">
                        <button type="button" class="icon-btn" data-archive="${item.id}" title="进入一口一档" aria-label="进入一口一档"><i class="fa-solid fa-magnifying-glass"></i></button>
                        <button type="button" class="icon-btn" data-detail-page="${item.id}" data-detail-source="monitor" title="查看企业详情" aria-label="查看企业详情"><i class="fa-regular fa-chart-bar"></i></button>
                    </div></td>
                </tr>`).join("");
        }
        tableScroll.scrollTop = 0;
        renderPagination();
    }

    function renderPagination() {
        const pages = Math.max(1, Math.ceil(state.filtered.length / state.pageSize));
        const pageButtons = Array.from({ length: pages }, (_, index) => {
            const page = index + 1;
            return `<button type="button" class="page-btn ${page === state.page ? "active" : ""}" data-page="${page}">${page}</button>`;
        }).join("");

        pagination.innerHTML = `
            <select class="page-size" id="pageSize" aria-label="每页条数"><option value="15" selected>15条/页</option><option value="10">10条/页</option><option value="20">20条/页</option></select>
            <span>共 ${state.filtered.length} 条</span>
            <div class="page-buttons">
                <button type="button" class="page-btn" data-step="-1" ${state.page === 1 ? "disabled" : ""} aria-label="上一页"><i class="fa-solid fa-chevron-left"></i></button>
                ${pageButtons}
                <button type="button" class="page-btn" data-step="1" ${state.page === pages ? "disabled" : ""} aria-label="下一页"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
            <span>前往</span><input class="jump-input" id="jumpInput" type="number" min="1" max="${pages}" value="${state.page}" aria-label="跳转页码"><span>页</span>`;
    }

    function applyFilters() {
        const outlet = document.getElementById("outletFilter").value.trim().toLowerCase();
        const region = regionFilter.value;
        const status = statusFilter.value;
        const park = document.getElementById("parkFilter").value.trim().toLowerCase();
        const company = document.getElementById("companyFilter").value.trim().toLowerCase();
        const source = isAlarmView() ? alarmData : rawData;

        state.filtered = source.filter(item =>
            (!outlet || item.outlet.toLowerCase().includes(outlet)) &&
            (!region || item.region === region) &&
            (isAlarmView() ? (!status || item.handleStatus === status) : (!status || item.monitorStatus === status)) &&
            (!park || displayPark(item).toLowerCase().includes(park)) &&
            (!company || item.enterprise.toLowerCase().includes(company))
        );
        state.page = 1;
        renderTable();
    }

    function setSummaryView(view, activeCard) {
        state.summaryView = view;
        if (activeCard) state.activeSummaryCard = activeCard.dataset.summaryCard;
        updateStatusFilter(view);
        if (view === "online") statusFilter.value = "在线";
        if (view === "all" || view === "alarm") statusFilter.value = "";

        document.querySelectorAll("[data-summary-view]").forEach(card => {
            const active = card.dataset.summaryCard === state.activeSummaryCard;
            card.classList.toggle("summary-active", active);
            card.setAttribute("aria-pressed", String(active));
        });
        applyFilters();
    }

    function findMonitorItem(id) {
        const numericId = Number(id);
        return rawData.find(row => row.id === numericId) || alarmData.find(row => row.id === numericId);
    }

    function openDetail(id) {
        const item = findMonitorItem(id);
        if (!item) return;
        document.getElementById("detailGrid").innerHTML = `
            <div class="label">排污口名称</div><div class="wide">${escapeHtml(item.outlet)}</div>
            <div class="label">地区</div><div>${escapeHtml(item.region)}</div><div class="label">园区级别</div><div><span class="level-tag ${levelClass(item.level)}">${escapeHtml(item.level)}</span></div>
            <div class="label">园区/分园</div><div class="wide">${escapeHtml(displayPark(item))}</div>
            <div class="label">企业名称</div><div class="wide">${escapeHtml(item.enterprise)}</div>
            <div class="label">企业经度</div><div>${item.lng.toFixed(6)}</div><div class="label">企业纬度</div><div>${item.lat.toFixed(6)}</div>`;
        document.getElementById("detailModal").classList.add("open");
    }

    function openArchive(id) {
        const item = findMonitorItem(id);
        if (!item) return;
        document.querySelectorAll(".top-nav button").forEach(button => button.classList.remove("active"));
        document.querySelector('[data-nav="一口一档"]').classList.add("active");
        showToast(`已进入一口一档：${item.outlet}`);
    }

    function openTrend(id) {
        const item = rawData.find(row => row.id === Number(id));
        if (!item) return;
        document.getElementById("trendOutlet").textContent = item.enterprise;
        document.getElementById("trendModal").classList.add("open");
        requestAnimationFrame(() => drawTrend(item.id));
    }
