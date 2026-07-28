    function drawTrend(seed) {
        const canvas = document.getElementById("trendCanvas");
        const ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;
        const pad = { left: 92, right: 46, top: 42, bottom: 68 };
        const labels = ["07-18", "07-19", "07-20", "07-21", "07-22", "07-23"];
        const values = labels.map((_, index) => 32 + ((seed * 7 + index * 13) % 22) + Math.sin(seed + index) * 4);
        const min = 20;
        const max = 65;

        ctx.clearRect(0, 0, width, height);
        ctx.font = '24px "Microsoft YaHei"';
        ctx.fillStyle = "#8692a3";
        ctx.strokeStyle = "#e8edf4";
        ctx.lineWidth = 2;

        for (let i = 0; i <= 5; i += 1) {
            const y = pad.top + ((height - pad.top - pad.bottom) * i / 5);
            const value = max - ((max - min) * i / 5);
            ctx.beginPath();
            ctx.moveTo(pad.left, y);
            ctx.lineTo(width - pad.right, y);
            ctx.stroke();
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillText(value.toFixed(0), pad.left - 18, y);
        }

        labels.forEach((label, index) => {
            const x = pad.left + ((width - pad.left - pad.right) * index / (labels.length - 1));
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText(label, x, height - pad.bottom + 18);
        });

        ctx.beginPath();
        values.forEach((value, index) => {
            const x = pad.left + ((width - pad.left - pad.right) * index / (values.length - 1));
            const y = pad.top + (max - value) / (max - min) * (height - pad.top - pad.bottom);
            if (index === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = "#3d82ef";
        ctx.lineWidth = 6;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.stroke();

        values.forEach((value, index) => {
            const x = pad.left + ((width - pad.left - pad.right) * index / (values.length - 1));
            const y = pad.top + (max - value) / (max - min) * (height - pad.top - pad.bottom);
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.strokeStyle = "#3d82ef";
            ctx.lineWidth = 5;
            ctx.stroke();
        });
    }

    function exportCsv() {
        const headers = isAlarmView()
            ? ["序号", "排口名称", "报警内容", "报警时间", "监管机构", "反馈状态", "反馈内容"]
            : ["序号", "排污口名称", "地区", "园区/分园名称", "园区级别", "企业名称", "企业经度", "企业纬度"];
        const rows = state.filtered.map((item, index) => isAlarmView()
            ? [index + 1, item.outlet, item.alarmContent, item.alarmTime, item.regulator, item.feedbackContent ? "已反馈" : "未反馈", item.feedbackContent]
            : [index + 1, item.outlet, item.region, displayPark(item), item.level, item.enterprise, item.lng, item.lat]);
        const csv = [headers, ...rows].map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
        const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "在线监测排污口数据.csv";
        link.click();
        URL.revokeObjectURL(url);
        showToast(`已导出 ${state.filtered.length} 条数据`);
    }

    let toastTimer;
    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
    }

    document.getElementById("filterForm").addEventListener("submit", event => {
        event.preventDefault();
        applyFilters();
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
        document.getElementById("filterForm").reset();
        state.page = 1;
        state.pageSize = 15;
        updateStatusFilter(state.summaryView);
        if (state.summaryView === "online") statusFilter.value = "在线";
        applyFilters();
    });

    document.getElementById("exportBtn").addEventListener("click", exportCsv);

    document.getElementById("inlineDetailClose").addEventListener("click", closeEmbeddedDetail);

    document.getElementById("inlineOutletDetail").addEventListener("click", () => {
        if (activeInlineItem) openDetail(activeInlineItem.id);
    });

    document.getElementById("inlineMonitorProject").addEventListener("change", event => {
        inlineMonitorState.project = event.target.value;
        renderInlineMonitoring();
    });

    document.querySelectorAll("[data-inline-mode]").forEach(button => {
        button.addEventListener("click", () => {
            inlineMonitorState.mode = button.dataset.inlineMode;
            document.querySelectorAll("[data-inline-mode]").forEach(item => item.classList.toggle("active", item === button));
            configureInlineMonitorTime(true);
            renderInlineMonitoring(true);
        });
    });

    document.getElementById("inlineMonitorQuery").addEventListener("click", () => renderInlineMonitoring(true));

    document.getElementById("inlineMonitorPagination").addEventListener("click", event => {
        const pageButton = event.target.closest("[data-inline-monitor-page]");
        const stepButton = event.target.closest("[data-inline-monitor-step]");
        const pages = Math.max(1, Math.ceil(inlineMonitorState.rows.length / inlineMonitorState.pageSize));
        if (pageButton) inlineMonitorState.page = Number(pageButton.dataset.inlineMonitorPage);
        if (stepButton) inlineMonitorState.page = Math.min(pages, Math.max(1, inlineMonitorState.page + Number(stepButton.dataset.inlineMonitorStep)));
        if (pageButton || stepButton) renderInlineMonitoring();
    });

    document.getElementById("inlineMonitorPagination").addEventListener("change", event => {
        if (event.target.id === "inlineMonitorPageSize") {
            inlineMonitorState.pageSize = Number(event.target.value);
            inlineMonitorState.page = 1;
            renderInlineMonitoring();
        }
        if (event.target.id === "inlineMonitorJump") {
            const pages = Math.max(1, Math.ceil(inlineMonitorState.rows.length / inlineMonitorState.pageSize));
            inlineMonitorState.page = Math.min(pages, Math.max(1, Number(event.target.value) || 1));
            renderInlineMonitoring();
        }
    });

    document.getElementById("inlineAlarmPagination").addEventListener("click", event => {
        const pageButton = event.target.closest("[data-inline-alarm-page]");
        const stepButton = event.target.closest("[data-inline-alarm-step]");
        if (!pageButton && !stepButton) return;
        const total = activeInlineItem
            ? alarmData.filter(alarm => alarm.enterprise === activeInlineItem.enterprise && alarm.outlet === activeInlineItem.outlet).length
            : 0;
        const pages = Math.max(1, Math.ceil(total / inlineAlarmState.pageSize));
        if (pageButton) inlineAlarmState.page = Number(pageButton.dataset.inlineAlarmPage);
        if (stepButton) inlineAlarmState.page = Math.min(pages, Math.max(1, inlineAlarmState.page + Number(stepButton.dataset.inlineAlarmStep)));
        renderInlineAlarms();
    });

    document.getElementById("embeddedDetail").addEventListener("click", event => {
        const relationTarget = event.target.closest("[data-relation-name]");
        const alarmTarget = event.target.closest("[data-inline-alarm]");
        if (alarmTarget) {
            const alarm = alarmData.find(item => item.id === Number(alarmTarget.dataset.inlineAlarm));
            if (!alarm) return;
            document.getElementById("relationModalTitle").textContent = "报警详情";
            document.getElementById("relationDetailGrid").innerHTML = `
                <div class="label">排污口名称</div><div class="wide">${escapeHtml(alarm.outlet)}</div>
                <div class="label">报警类型</div><div>${escapeHtml(alarm.alarmType)}</div>
                <div class="label">报警时间</div><div>${escapeHtml(alarm.alarmTime)}</div>
                <div class="label">监管机构</div><div>${escapeHtml(alarm.regulator)}</div>
                <div class="label">报警内容</div><div class="wide">${escapeHtml(alarm.alarmContent)}</div>
                <div class="label">处置状态</div><div><span class="alarm-state ${alarm.handleStatus === "已处理" ? "handled" : "pending"}">${escapeHtml(alarm.handleStatus)}</span></div>
                <div class="label">反馈内容</div><div class="wide">${formatFeedbackContent(alarm.feedbackContent)}</div>`;
            document.getElementById("relationModal").classList.add("open");
            return;
        }
        if (!relationTarget || !activeInlineItem) return;
        const group = relationTarget.dataset.relationGroup;
        const name = relationTarget.dataset.relationName;
        const code = relationTarget.dataset.relationCode;
        document.getElementById("relationModalTitle").textContent = `${group}详情`;
        document.getElementById("relationDetailGrid").innerHTML = `
            <div class="label">监测点名称</div><div class="wide">${escapeHtml(name)}</div>
            <div class="label">监测点类型</div><div>${escapeHtml(group)}</div>
            <div class="label">监测点编码</div><div>${escapeHtml(code)}</div>
            <div class="label">关联排污口</div><div>${escapeHtml(activeInlineItem.outlet)}</div>
            <div class="label">所属地区</div><div>${escapeHtml(cityName(activeInlineItem.region))}</div>
            <div class="label">运行状态</div><div><span class="level-tag city">正常</span></div>`;
        document.getElementById("relationModal").classList.add("open");
    });

    document.querySelectorAll(".inline-detail-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".inline-detail-tab, .inline-detail-pane").forEach(element => element.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById(tab.dataset.inlinePane).classList.add("active");
            if (tab.dataset.inlinePane === "inlineMonitor") renderInlineMonitoring();
        });
    });

    tableBody.addEventListener("click", event => {
        const detailTarget = event.target.closest("[data-detail]");
        const archiveTarget = event.target.closest("[data-archive]");
        const trendTarget = event.target.closest("[data-trend]");
        const detailPageTarget = event.target.closest("[data-detail-page]");
        if (detailTarget) openDetail(detailTarget.dataset.detail);
        if (archiveTarget) openArchive(archiveTarget.dataset.archive);
        if (trendTarget) openTrend(trendTarget.dataset.trend);
        if (detailPageTarget) openEmbeddedDetail(detailPageTarget.dataset.detailPage, detailPageTarget.dataset.detailSource);
    });

    document.querySelectorAll("[data-summary-view]").forEach(card => {
        const activate = () => setSummaryView(card.dataset.summaryView, card);
        card.addEventListener("click", activate);
        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                activate();
            }
        });
    });

    pagination.addEventListener("click", event => {
        const pageButton = event.target.closest("[data-page]");
        const stepButton = event.target.closest("[data-step]");
        const pages = Math.max(1, Math.ceil(state.filtered.length / state.pageSize));
        if (pageButton) state.page = Number(pageButton.dataset.page);
        if (stepButton) state.page = Math.min(pages, Math.max(1, state.page + Number(stepButton.dataset.step)));
        if (pageButton || stepButton) renderTable();
    });

    pagination.addEventListener("change", event => {
        if (event.target.id === "pageSize") {
            state.pageSize = Number(event.target.value);
            state.page = 1;
            renderTable();
        }
        if (event.target.id === "jumpInput") {
            const pages = Math.max(1, Math.ceil(state.filtered.length / state.pageSize));
            state.page = Math.min(pages, Math.max(1, Number(event.target.value) || 1));
            renderTable();
        }
    });

    document.querySelectorAll(".side-parent").forEach(button => {
        button.addEventListener("click", () => button.closest(".side-group").classList.toggle("collapsed"));
    });

    document.querySelectorAll(".side-child").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".side-child").forEach(item => item.classList.remove("active"));
            button.classList.add("active");
        });
    });

    document.querySelectorAll(".top-nav button").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".top-nav button").forEach(item => item.classList.remove("active"));
            button.classList.add("active");
            if (button.dataset.nav !== "业务管理") showToast(`${button.dataset.nav}模块`);
        });
    });

    document.querySelectorAll("[data-close]").forEach(button => {
        button.addEventListener("click", () => document.getElementById(button.dataset.close).classList.remove("open"));
    });

    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
        backdrop.addEventListener("click", event => {
            if (event.target === backdrop) backdrop.classList.remove("open");
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            document.querySelectorAll(".modal-backdrop.open").forEach(modal => modal.classList.remove("open"));
            closeEmbeddedDetail();
        }
    });

    window.addEventListener("message", event => {
        if (event.data && event.data.type === "online-monitoring-detail-close") closeEmbeddedDetail();
    });

    function fitApp() {
        const scale = Math.min(window.innerWidth / 2048, window.innerHeight / 1088);
        const shell = document.getElementById("appShell");
        const left = Math.max(0, (window.innerWidth - 2048 * scale) / 2);
        shell.style.left = `${left}px`;
        shell.style.transform = `scale(${scale})`;
    }

    window.addEventListener("resize", fitApp);
    fitApp();
    renderTable();
