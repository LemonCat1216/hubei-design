/* 短信通知记录：筛选 / 列表 / 重发 / 导出 */
(function () {
    const { showToast, esc, exportCsv, todayStr } = window.ClueUI;

    const state = { category: "", status: "", city: "", dateFrom: "", dateTo: "", kw: "", page: 1, pageSize: 12 };

    const STATUS_TAG = { "成功": "done", "失败": "reject" };

    function statusTagOf(status) {
        return `<span class="tag ${STATUS_TAG[status] || "plain"}">${esc(status)}</span>`;
    }

    function filteredRecords() {
        const kw = state.kw.trim().toLowerCase();
        return SMS_RECORDS.filter(record => {
            if (state.category && record.category !== state.category) return false;
            if (state.status && record.status !== state.status) return false;
            if (state.city && record.city !== state.city) return false;
            const day = record.sendTime.slice(0, 10);
            if (state.dateFrom && day < state.dateFrom) return false;
            if (state.dateTo && day > state.dateTo) return false;
            if (kw) {
                /* 支持按接收人姓名或手机号搜索（手机号按数字归一化，兼容掩码显示） */
                const nameHit = record.receiver.toLowerCase().includes(kw);
                const digits = kw.replace(/\D/g, "");
                const phoneHit = digits ? record.phone.replace(/\D/g, "").includes(digits) : false;
                if (!nameHit && !phoneHit) return false;
            }
            return true;
        }).sort((a, b) => (a.sendTime < b.sendTime ? 1 : -1));
    }

    function renderTable() {
        const rows = filteredRecords();
        const pages = Math.max(1, Math.ceil(rows.length / state.pageSize));
        state.page = Math.min(state.page, pages);
        const pageRows = rows.slice((state.page - 1) * state.pageSize, state.page * state.pageSize);
        const body = document.getElementById("tableBody");

        if (!pageRows.length) {
            body.innerHTML = `<tr class="empty-row"><td colspan="7"><span class="empty-state"><i class="fa-regular fa-comment-dots"></i>暂无符合条件的短信通知记录</span></td></tr>`;
        } else {
            body.innerHTML = pageRows.map((record, index) => {
                const content = window.smsContentOf(record);
                return `<tr>
                    <td class="center mono">${(state.page - 1) * state.pageSize + index + 1}</td>
                    <td class="center">${esc(record.receiver)}</td>
                    <td class="center mono">${esc(record.phone)}</td>
                    <td class="center">${esc(record.city)}</td>
                    <td><div class="cell-title sms-content" title="${esc(content)}">${esc(content)}</div></td>
                    <td class="center mono">${esc(record.sendTime)}</td>
                    <td class="center">${statusTagOf(record.status)}${record.status === "失败" ? '<button class="op-btn warn" data-resend="' + record.id + '" style="margin-left:8px">重发</button>' : ""}</td>
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
            </div>`;
    }

    function exportData() {
        const rows = filteredRecords();
        if (!rows.length) return showToast("暂无可导出的数据");
        exportCsv(`短信通知记录_${todayStr().replace(/-/g, "")}.csv`,
            ["短信编号", "通知类型", "接收人", "联系电话", "所属地市", "关联问题线索", "发送时间", "发送状态"],
            rows.map(record => [record.code, record.category, record.receiver, record.phone, record.city, record.clueCode, record.sendTime, record.status]));
    }

    function resetFilters() {
        state.category = ""; state.status = ""; state.city = "";
        state.dateFrom = ""; state.dateTo = ""; state.kw = ""; state.page = 1;
        document.getElementById("categoryFilter").value = "";
        document.getElementById("statusFilter").value = "";
        document.getElementById("cityFilter").value = "";
        document.getElementById("dateFrom").value = "";
        document.getElementById("dateTo").value = "";
        document.getElementById("kwFilter").value = "";
        renderTable();
    }

    document.getElementById("cityFilter").innerHTML = `<option value="">所属地市</option>` + CITIES.map(city => `<option>${city}</option>`).join("");

    document.getElementById("filterForm").addEventListener("submit", event => {
        event.preventDefault();
        state.category = document.getElementById("categoryFilter").value;
        state.status = document.getElementById("statusFilter").value;
        state.city = document.getElementById("cityFilter").value;
        state.dateFrom = document.getElementById("dateFrom").value;
        state.dateTo = document.getElementById("dateTo").value;
        state.kw = document.getElementById("kwFilter").value;
        state.page = 1;
        renderTable();
    });

    document.getElementById("resetBtn").addEventListener("click", resetFilters);
    document.getElementById("exportBtn").addEventListener("click", exportData);

    document.getElementById("pagination").addEventListener("click", event => {
        const button = event.target.closest(".page-btn");
        if (!button || button.disabled) return;
        const pages = Math.max(1, Math.ceil(filteredRecords().length / state.pageSize));
        if (button.dataset.page) state.page = Number(button.dataset.page);
        else if (button.dataset.step) state.page = Math.min(pages, Math.max(1, state.page + Number(button.dataset.step)));
        renderTable();
    });

    document.getElementById("pagination").addEventListener("change", event => {
        if (event.target.id === "pageSize") { state.pageSize = Number(event.target.value); state.page = 1; renderTable(); }
    });

    document.getElementById("tableBody").addEventListener("click", event => {
        const target = event.target.closest("[data-resend]");
        if (!target) return;
        const record = SMS_RECORDS.find(item => item.id === Number(target.dataset.resend));
        if (record) {
            record.status = "成功";
            record.sendTime = `${todayStr()} ${new Date().toTimeString().slice(0, 8)}`;
            record.code = `DX${todayStr().replace(/-/g, "")}-R${String(record.id).padStart(2, "0")}`;
            renderTable();
            showToast(`已重新发送短信至${record.receiver}`);
        }
    });

    renderTable();
})();
