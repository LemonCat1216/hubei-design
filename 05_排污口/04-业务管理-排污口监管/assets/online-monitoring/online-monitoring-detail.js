    function cityName(region) {
        return region.endsWith("市") ? region : `${region}市`;
    }

    function getRelationGroups(item) {
        const city = cityName(item.region);
        return [
            { label: "国控断面", icon: "fa-water", className: "national", items: [{ name: `${city}下游国控断面`, code: `GKDM-${String(item.id).padStart(3, "0")}` }] },
            { label: "省控断面", icon: "fa-water", className: "provincial", items: [{ name: `${city}省控断面`, code: `SKDM-${String(item.id).padStart(3, "0")}` }] },
            { label: "国控自动站", icon: "fa-tower-broadcast", className: "station national", items: [{ name: `${city}国控水质自动站`, code: `GKZD-${String(item.id).padStart(3, "0")}` }] },
            { label: "省控自动站", icon: "fa-tower-broadcast", className: "station", items: [{ name: `${city}省控水质自动站`, code: `SKZD-${String(item.id).padStart(3, "0")}` }] }
        ];
    }

    function renderRelations(item) {
        const groups = getRelationGroups(item);
        const nodes = [
            ["园区 / 分园", item.park, item.subpark ? `分园：${item.subpark}` : "未设置分园", "park", "fa-city"],
            ["企业", item.enterprise, "", "enterprise", "fa-industry"],
            ["排口", item.outfall || "废水第一排口", "", "port", "fa-arrow-right-from-bracket"],
            ["排污口", item.outlet, "", "outlet", "fa-water"]
        ];
        const trunk = nodes.map(node => `<div class="mindmap-node ${node[3]}" title="${escapeHtml([node[1], node[2]].filter(Boolean).join("，"))}"><span class="mindmap-node-icon"><i class="fa-solid ${node[4]}" aria-hidden="true"></i></span><span class="mindmap-node-copy"><small>${node[0]}</small><strong>${escapeHtml(node[1])}</strong>${node[2] ? `<em>${escapeHtml(node[2])}</em>` : ""}</span></div>`).join('<i class="mindmap-arrow" aria-hidden="true"></i>');
        const rows = groups.map(group => `<div class="inline-relation-group ${group.className}"><div class="inline-relation-group-meta"><strong>${escapeHtml(group.label)}</strong></div><div class="inline-relation-items">${group.items.map(entry => `<button type="button" class="inline-relation-item" data-relation-group="${group.label}" data-relation-name="${escapeHtml(entry.name)}" data-relation-code="${entry.code}" title="查看${escapeHtml(entry.name)}详情"><span>${escapeHtml(entry.name)}</span></button>`).join("")}</div></div>`).join("");
        const cards = `<article class="inline-relation-card">${rows}</article>`;
        document.getElementById("inlineLineage").innerHTML = `<div class="inline-mindmap" role="group" aria-label="园区至断面和自动站的关联路径"><div class="inline-mindmap-trunk">${trunk}</div><span class="inline-mindmap-link" aria-hidden="true"></span><div class="inline-relation-grid">${cards}</div></div>`;
    }

    function configureInlineMonitorTime(reset = false) {
        const start = document.getElementById("inlineMonitorStart");
        const end = document.getElementById("inlineMonitorEnd");
        const type = inlineMonitorState.mode === "day" ? "date" : "datetime-local";
        start.type = type;
        end.type = type;
        if (reset) {
            start.value = inlineMonitorState.mode === "day" ? "2026-07-16" : "2026-07-22T18:00";
            end.value = inlineMonitorState.mode === "day" ? "2026-07-23" : "2026-07-23T18:00";
        }
    }

    function getInlineMonitorRange() {
        const startValue = document.getElementById("inlineMonitorStart").value;
        const endValue = document.getElementById("inlineMonitorEnd").value;
        if (!startValue || !endValue) return null;
        const start = new Date(inlineMonitorState.mode === "day" ? `${startValue}T00:00:00` : startValue);
        const end = new Date(inlineMonitorState.mode === "day" ? `${endValue}T23:00:00` : endValue);
        return start <= end ? { start, end } : null;
    }

    function makeMonitoringRows(item, mode, range) {
        const interval = mode === "day" ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000;
        const maxRows = mode === "day" ? 31 : 48;
        const count = Math.min(maxRows, Math.max(1, Math.floor((range.end - range.start) / interval) + 1));
        return Array.from({ length: count }, (_, index) => {
            const date = new Date(range.end.getTime() - index * interval);
            const phase = item.id * 0.42 + index * 0.71;
            return {
                time: mode === "day" ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:00:00`,
                date,
                cod: Number((24.5 + Math.sin(phase * 0.7) * 2.6 + index * 0.11).toFixed(2)),
                ammonia: Number((0.78 + Math.sin(phase) * 0.34 + index * 0.025).toFixed(2)),
                phosphorus: Number((0.06 + Math.cos(phase * 0.8) * 0.018 + index * 0.001).toFixed(2)),
                nitrogen: Number((13.5 + Math.sin(phase * 0.55) * 1.35 + index * 0.13).toFixed(2))
            };
        });
    }

    function drawInlineMonitorChart(rows, project, hoveredIndex = null) {
        const canvas = document.getElementById("inlineMonitorCanvas");
        const ctx = canvas.getContext("2d");
        const tooltip = document.getElementById("inlineMonitorTooltip");
        const meta = monitorProjectMeta[project];
        const ordered = rows.slice().reverse();
        const values = ordered.map(row => row[project]);
        if (!values.length) return;

        const width = Math.max(1, Math.round(canvas.clientWidth));
        const height = Math.max(1, Math.round(canvas.clientHeight));
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const range = Math.max(maxValue - minValue, project === "cod" ? 4 : project === "nitrogen" ? 2 : 0.2);
        const min = Math.max(0, minValue - range * 0.25);
        const max = maxValue + range * 0.25;
        const pad = { left: 60, right: 22, top: 16, bottom: 44 };
        const chartWidth = width - pad.left - pad.right;
        const chartHeight = height - pad.top - pad.bottom;
        const point = (value, index) => ({ x: pad.left + chartWidth * index / Math.max(1, values.length - 1), y: pad.top + chartHeight * (max - value) / (max - min) });

        ctx.clearRect(0, 0, width, height);
        ctx.font = '14px "Microsoft YaHei"';
        ctx.fillStyle = "#8291a4";
        ctx.strokeStyle = "#e7edf5";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 5]);
        for (let index = 0; index <= 4; index += 1) {
            const y = pad.top + chartHeight * index / 4;
            const value = max - (max - min) * index / 4;
            ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(width - pad.right, y); ctx.stroke();
            ctx.setLineDash([]); ctx.textAlign = "right"; ctx.textBaseline = "middle"; ctx.fillText(value.toFixed(project === "cod" || project === "nitrogen" ? 1 : 2), pad.left - 10, y); ctx.setLineDash([5, 5]);
        }
        ctx.setLineDash([]);
        const points = values.map((value, index) => point(value, index));
        if (Number.isInteger(hoveredIndex)) {
            const hoveredPoint = points[hoveredIndex];
            ctx.beginPath();
            ctx.moveTo(hoveredPoint.x, pad.top);
            ctx.lineTo(hoveredPoint.x, height - pad.bottom);
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = "#9fc1f5";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);
        }
        const fill = ctx.createLinearGradient(0, pad.top, 0, height - pad.bottom);
        fill.addColorStop(0, "rgba(52, 121, 236, 0.22)");
        fill.addColorStop(1, "rgba(52, 121, 236, 0.015)");
        ctx.beginPath();
        ctx.moveTo(points[0].x, height - pad.bottom);
        points.forEach(item => ctx.lineTo(item.x, item.y));
        ctx.lineTo(points[points.length - 1].x, height - pad.bottom);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        points.forEach((item, index) => index ? ctx.lineTo(item.x, item.y) : ctx.moveTo(item.x, item.y));
        ctx.strokeStyle = "#347fee";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = "rgba(52, 121, 236, 0.18)";
        ctx.shadowBlur = 5;
        ctx.stroke();
        ctx.restore();

        const labelIndexes = new Set([0, 0.25, 0.5, 0.75, 1].map(position => Math.round((points.length - 1) * position)));
        points.forEach((item, index) => {
            ctx.beginPath();
            ctx.arc(item.x, item.y, index === points.length - 1 ? 4.5 : 3.5, 0, Math.PI * 2);
            ctx.fillStyle = "#347fee";
            ctx.fill();
            if (index === points.length - 1) {
                ctx.strokeStyle = "#fff";
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            if (labelIndexes.has(index)) {
                const label = inlineMonitorState.mode === "day" ? ordered[index].time.slice(5, 10) : ordered[index].time.slice(5, 16);
                ctx.fillStyle = "#7d8da1";
                ctx.textAlign = index === 0 ? "left" : index === points.length - 1 ? "right" : "center";
                ctx.textBaseline = "top";
                ctx.fillText(label, item.x, height - pad.bottom + 13);
            }
        });

        if (Number.isInteger(hoveredIndex)) {
            const hoveredPoint = points[hoveredIndex];
            ctx.beginPath();
            ctx.arc(hoveredPoint.x, hoveredPoint.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(hoveredPoint.x, hoveredPoint.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = "#347fee";
            ctx.fill();
            tooltip.innerHTML = `<span>监测时间：${ordered[hoveredIndex].time}</span><strong>${meta.name}：${values[hoveredIndex].toFixed(2)} ${meta.unit}</strong>`;
            tooltip.style.left = `${hoveredPoint.x}px`;
            tooltip.style.top = `${Math.max(hoveredPoint.y, 60)}px`;
            tooltip.hidden = false;
        } else {
            tooltip.hidden = true;
        }

        canvas.onmousemove = event => {
            const bounds = canvas.getBoundingClientRect();
            const x = event.clientX - bounds.left;
            const nextIndex = Math.max(0, Math.min(points.length - 1, Math.round((x - pad.left) / chartWidth * (points.length - 1))));
            if (nextIndex !== hoveredIndex) drawInlineMonitorChart(rows, project, nextIndex);
        };
        canvas.onmouseleave = () => {
            if (hoveredIndex !== null) drawInlineMonitorChart(rows, project);
        };
        canvas.style.cursor = "crosshair";
    }

    function updateInlineMonitorSummary(rows, project) {
        const meta = monitorProjectMeta[project];
        const values = rows.map(row => row[project]);
        const ordered = rows.slice().reverse();
        const formatValue = value => Number(value).toFixed(2);
        const formatRangeTime = value => (inlineMonitorState.mode === "day" ? value.slice(0, 10) : value.slice(0, 16)).replace(/-/g, "/");
        const average = values.reduce((sum, value) => sum + value, 0) / values.length;
        const current = values[0];
        const previous = values[1];
        const difference = previous === undefined ? null : current - previous;
        document.getElementById("inlineChartTitle").textContent = `${meta.name}浓度趋势`;
        document.getElementById("inlineChartRange").textContent = `${formatRangeTime(ordered[0].time)} 至 ${formatRangeTime(ordered[ordered.length - 1].time)}`;
        document.getElementById("inlineChartMeasure").textContent = `单位：${meta.unit}`;
        document.getElementById("inlineSummaryPrimaryLabel").textContent = `当前值 (${meta.unit})`;
        document.getElementById("inlineSummaryMaximumLabel").textContent = `最大值 (${meta.unit})`;
        document.getElementById("inlineSummaryMinimumLabel").textContent = `最小值 (${meta.unit})`;
        document.getElementById("inlineSummaryAverageLabel").textContent = `平均值 (${meta.unit})`;
        document.getElementById("inlineSummaryCurrent").textContent = formatValue(current);
        const changeIcon = document.getElementById("inlineSummaryChangeIcon");
        changeIcon.className = difference === null
            ? ""
            : `fa-solid ${difference >= 0 ? "fa-arrow-trend-up trend-up" : "fa-arrow-trend-down trend-down"}`;
        document.getElementById("inlineSummaryChange").textContent = difference === null ? "暂无前一时段数据" : `较前一时段${difference >= 0 ? "增加" : "减少"}${formatValue(Math.abs(difference))} ${meta.unit}`;
        document.getElementById("inlineSummaryMaximum").textContent = formatValue(Math.max(...values));
        document.getElementById("inlineSummaryMinimum").textContent = formatValue(Math.min(...values));
        document.getElementById("inlineSummaryAverage").textContent = formatValue(average);
    }

    function renderInlineMonitorPagination(total) {
        const pages = Math.max(1, Math.ceil(total / inlineMonitorState.pageSize));
        inlineMonitorState.page = Math.min(inlineMonitorState.page, pages);
        const pageButtons = Array.from({ length: pages }, (_, index) => {
            const page = index + 1;
            return `<button type="button" class="${page === inlineMonitorState.page ? "active" : ""}" data-inline-monitor-page="${page}" aria-label="第 ${page} 页">${page}</button>`;
        }).join("");
        document.getElementById("inlineMonitorPagination").innerHTML = `
            <select class="inline-page-size" id="inlineMonitorPageSize" aria-label="每页条数">
                <option value="15" ${inlineMonitorState.pageSize === 15 ? "selected" : ""}>15条/页</option>
                <option value="10" ${inlineMonitorState.pageSize === 10 ? "selected" : ""}>10条/页</option>
                <option value="20" ${inlineMonitorState.pageSize === 20 ? "selected" : ""}>20条/页</option>
            </select>
            <span>共 ${total} 条</span>
            <div class="inline-monitor-page-buttons">
                <button type="button" data-inline-monitor-step="-1" ${inlineMonitorState.page === 1 ? "disabled" : ""} aria-label="上一页"><i class="fa-solid fa-angle-left"></i></button>
                ${pageButtons}
                <button type="button" data-inline-monitor-step="1" ${inlineMonitorState.page === pages ? "disabled" : ""} aria-label="下一页"><i class="fa-solid fa-angle-right"></i></button>
            </div>
            <span>前往</span><input class="inline-page-jump" id="inlineMonitorJump" type="number" min="1" max="${pages}" value="${inlineMonitorState.page}" aria-label="跳转页码"><span>页</span>`;
    }

    function renderInlineMonitoring(resetPage = false) {
        if (!activeInlineItem) return;
        const range = getInlineMonitorRange();
        if (!range) { showToast("请选择有效的监测时间范围"); return; }
        const rows = makeMonitoringRows(activeInlineItem, inlineMonitorState.mode, range);
        inlineMonitorState.rows = rows;
        if (resetPage) inlineMonitorState.page = 1;
        const start = (inlineMonitorState.page - 1) * inlineMonitorState.pageSize;
        const pageRows = rows.slice(start, start + inlineMonitorState.pageSize);
        document.getElementById("inlineMonitorBody").innerHTML = pageRows.map((row, index) => `<tr><td>${start + index + 1}</td><td>${row.time}</td><td class="inline-monitor-point-cell" title="${escapeHtml(activeInlineItem.outlet)}">${escapeHtml(activeInlineItem.outlet)}</td><td>${row.cod.toFixed(2)}</td><td>${row.ammonia.toFixed(2)}</td><td>${row.phosphorus.toFixed(2)}</td><td>${row.nitrogen.toFixed(2)}</td></tr>`).join("");
        updateInlineMonitorSummary(rows, inlineMonitorState.project);
        renderInlineMonitorPagination(rows.length);
        requestAnimationFrame(() => drawInlineMonitorChart(rows, inlineMonitorState.project));
    }

    function renderInlineAlarmPagination(total) {
        const container = document.getElementById("inlineAlarmPagination");
        if (!total) {
            container.innerHTML = "";
            container.hidden = true;
            return;
        }

        const pages = Math.max(1, Math.ceil(total / inlineAlarmState.pageSize));
        inlineAlarmState.page = Math.min(inlineAlarmState.page, pages);
        const pageButtons = Array.from({ length: pages }, (_, index) => `<button type="button" class="${index + 1 === inlineAlarmState.page ? "active" : ""}" data-inline-alarm-page="${index + 1}" aria-label="第 ${index + 1} 页">${index + 1}</button>`).join("");
        container.hidden = false;
        container.innerHTML = `<span>共 ${total} 条</span><button type="button" data-inline-alarm-step="-1" aria-label="上一页" ${inlineAlarmState.page === 1 ? "disabled" : ""}><i class="fa-solid fa-angle-left"></i></button>${pageButtons}<button type="button" data-inline-alarm-step="1" aria-label="下一页" ${inlineAlarmState.page === pages ? "disabled" : ""}><i class="fa-solid fa-angle-right"></i></button>`;
    }

    function renderInlineAlarms(resetPage = false) {
        if (!activeInlineItem) return;
        const alarms = alarmData.filter(alarm => alarm.enterprise === activeInlineItem.enterprise && alarm.outlet === activeInlineItem.outlet);
        if (resetPage) inlineAlarmState.page = 1;
        const start = (inlineAlarmState.page - 1) * inlineAlarmState.pageSize;
        const pageRows = alarms.slice(start, start + inlineAlarmState.pageSize);
        document.getElementById("inlineAlarmBody").innerHTML = pageRows.length
            ? pageRows.map(alarm => `<tr><td class="alarm-list-cell" title="${escapeHtml(alarm.outlet)}">${escapeHtml(alarm.outlet)}</td><td class="alarm-list-cell" title="${escapeHtml(alarm.alarmContent)}">${escapeHtml(alarm.alarmContent)}</td><td>${escapeHtml(alarm.alarmTime)}</td><td>${escapeHtml(alarm.regulator)}</td><td>${formatFeedbackStatus(alarm.feedbackContent)}</td><td class="alarm-list-cell feedback-cell ${alarm.feedbackContent ? "" : "is-empty"}" title="${escapeHtml(alarm.feedbackContent || "未反馈")}">${formatFeedbackContent(alarm.feedbackContent)}</td></tr>`).join("")
            : '<tr class="inline-empty-row"><td colspan="6"><span class="inline-empty-state"><i class="fa-regular fa-folder-open" aria-hidden="true"></i><span>暂无报警数据</span></span></td></tr>';
        renderInlineAlarmPagination(alarms.length);
    }

    function openEmbeddedDetail(id, source = "monitor") {
        const item = (source === "alarm" ? alarmData : rawData).find(row => row.id === Number(id));
        if (!item) return;
        activeInlineItem = item;
        inlineMonitorState.mode = "day";
        inlineMonitorState.project = "ammonia";
        inlineMonitorState.page = 1;
        document.getElementById("inlineMonitorProject").value = inlineMonitorState.project;
        document.querySelectorAll("[data-inline-mode]").forEach(button => button.classList.toggle("active", button.dataset.inlineMode === inlineMonitorState.mode));
        configureInlineMonitorTime(true);
        document.getElementById("inlineDetailEnterprise").textContent = item.enterprise;
        document.getElementById("inlineDetailType").textContent = `${item.monitorStatus || "暂无状态"}监测`;
        document.getElementById("inlineBasicEnterprise").textContent = item.enterprise;
        document.getElementById("inlineBasicProvince").textContent = "湖北省";
        document.getElementById("inlineBasicCity").textContent = cityName(item.region);
        document.getElementById("inlineBasicDistrict").textContent = item.district || "暂无数据";
        document.getElementById("inlineBasicPark").textContent = displayPark(item);
        document.getElementById("inlineBasicLevel").textContent = item.level;
        document.getElementById("inlineOutletName").textContent = item.outlet;
        document.getElementById("inlineOutletCode").textContent = item.outletCode || `PS-${String(item.id).padStart(6, "0")}`;
        document.getElementById("inlineOutletWaterSystem").textContent = item.waterSystem || "长江流域";
        document.getElementById("inlineOutletArea").textContent = `湖北省·${cityName(item.region)}·${item.district || "暂无数据"}`;
        document.getElementById("inlineOutletTown").textContent = item.town || "暂无数据";
        document.getElementById("inlineOutletVillage").textContent = item.village || "暂无数据";
        document.getElementById("inlineOutletBasin").textContent = item.basin || "长江流域";
        document.getElementById("inlineOutletCategory").textContent = item.outletCategory || "工业及其他各类园区污水处理厂排污口";
        document.getElementById("inlineMonitorPoint").innerHTML = `<option>${escapeHtml(item.outlet)}</option>`;
        renderRelations(item);
        renderInlineMonitoring(true);
        renderInlineAlarms(true);
        document.querySelectorAll(".inline-detail-tab, .inline-detail-pane").forEach(element => element.classList.remove("active"));
        document.querySelector('[data-inline-pane="inlineBasic"]').classList.add("active");
        document.getElementById("inlineBasic").classList.add("active");
        document.getElementById("embeddedDetail").classList.add("open");
    }

    function closeEmbeddedDetail() {
        document.getElementById("embeddedDetail").classList.remove("open");
    }

