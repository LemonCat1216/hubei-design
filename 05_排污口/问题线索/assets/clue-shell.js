/* 共用外壳：画布缩放 / 菜单 / 弹窗 / Toast / 通用工具 */
(function () {
    function fitApp() {
        const scale = Math.min(window.innerWidth / 2048, window.innerHeight / 1088);
        const shell = document.getElementById("appShell");
        const left = Math.max(0, (window.innerWidth - 2048 * scale) / 2);
        shell.style.left = `${left}px`;
        shell.style.transform = `scale(${scale})`;
    }
    window.addEventListener("resize", fitApp);
    fitApp();

    let toastTimer;
    function showToast(message) {
        const toast = document.getElementById("toast");
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
    }

    function openModal(id) { document.getElementById(id).classList.add("open"); }
    function closeModal(id) { document.getElementById(id).classList.remove("open"); }

    document.querySelectorAll("[data-close]").forEach(button => {
        button.addEventListener("click", () => closeModal(button.dataset.close));
    });

    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
        backdrop.addEventListener("click", event => {
            if (event.target === backdrop) backdrop.classList.remove("open");
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            document.querySelectorAll(".modal-backdrop.open").forEach(modal => modal.classList.remove("open"));
        }
    });

    document.querySelectorAll(".side-parent").forEach(button => {
        button.addEventListener("click", () => button.closest(".side-group").classList.toggle("collapsed"));
    });

    document.querySelectorAll(".branch-toggle").forEach(button => {
        button.addEventListener("click", () => button.closest(".side-child-branch").classList.toggle("collapsed"));
    });

    document.querySelectorAll(".side-grandchild[data-page]").forEach(button => {
        button.addEventListener("click", () => {
            const page = button.dataset.page;
            const map = { clue: "01-问题线索.html", defer: "02-延期申请.html", sms: "03-短信通知记录.html", contact: "04-联系人设置.html" };
            if (map[page] && !button.classList.contains("active")) window.location.href = map[page];
        });
    });

    document.querySelectorAll(".side-child:not(.branch-toggle)").forEach(button => {
        button.addEventListener("click", () => showToast(`「${button.querySelector("span").textContent}」模块演示`));
    });

    document.querySelectorAll(".top-nav button").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".top-nav button").forEach(item => item.classList.remove("active"));
            button.classList.add("active");
            if (button.dataset.nav !== "业务管理") showToast(`${button.dataset.nav}模块`);
        });
    });

    /* ===== 省市角色切换（顶栏，全局记忆） ===== */
    const ROLE_KEY = "clueRole";
    function getRole() { return localStorage.getItem(ROLE_KEY) === "city" ? "city" : "province"; }
    function applyRoleButtons(role) {
        document.querySelectorAll("#roleSwitch button").forEach(btn => btn.classList.toggle("active", btn.dataset.role === role));
    }
    function setRole(role) {
        localStorage.setItem(ROLE_KEY, role);
        applyRoleButtons(role);
        document.dispatchEvent(new CustomEvent("rolechange", { detail: { role } }));
    }
    document.querySelectorAll("#roleSwitch button").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("active")) return;
            setRole(btn.dataset.role);
            showToast(btn.dataset.role === "province" ? "已切换为省级视角" : "已切换为市级视角");
        });
    });
    applyRoleButtons(getRole());

    function esc(value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    function parseDate(text) {
        const parts = String(text).split("-").map(Number);
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    function fmtDate(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    }

    function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function todayStr() { return fmtDate(new Date()); }

    function daysBetween(fromText, toText) {
        const from = parseDate(fromText), to = parseDate(toText);
        return Math.round((to - from) / 86400000);
    }

    /* 自明日（含）起至截止日的剩余工作日（跳过周末） */
    function workingDaysLeft(dueText) {
        const today = parseDate(todayStr());
        const due = parseDate(dueText);
        if (due < today) return 0;
        let count = 0;
        const cursor = addDays(today, 1);
        while (cursor <= due) {
            const day = cursor.getDay();
            if (day !== 0 && day !== 6) count += 1;
            cursor.setDate(cursor.getDate() + 1);
        }
        return count;
    }

    function photoUrl(prompt) {
        return "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=" + encodeURIComponent(prompt) + "&image_size=landscape_4_3";
    }

    function beforePhotoUrl(index) { return photoUrl(BEFORE_PHOTO_PROMPTS[index % BEFORE_PHOTO_PROMPTS.length]); }
    function afterPhotoUrl(index) { return photoUrl(AFTER_PHOTO_PROMPTS[index % AFTER_PHOTO_PROMPTS.length]); }

    function typeTag(type) {
        const map = { "重大问题": "major", "突出问题": "severe", "一般问题": "general", "其他问题": "other" };
        return `<span class="tag tag-type ${map[type] || "other"}">${esc(type)}</span>`;
    }

    function statusTag(status) {
        const map = { "待办": "todo", "已办": "done", "过期未办": "overdue" };
        return `<span class="tag ${map[status] || "plain"}">${esc(status)}</span>`;
    }

    function deferTag(status) {
        const map = { "待省级审核": "wait", "已通过": "pass", "已驳回": "reject" };
        return `<span class="tag ${map[status] || "plain"}">${esc(status)}</span>`;
    }

    function exportCsv(filename, headers, rows) {
        const csv = [headers, ...rows].map(row => row.map(value => `"${String(value == null ? "" : value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
        const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
        showToast(`已导出 ${rows.length} 条数据`);
    }

    window.ClueUI = { showToast, openModal, closeModal, esc, parseDate, fmtDate, addDays, todayStr, daysBetween, workingDaysLeft, photoUrl, beforePhotoUrl, afterPhotoUrl, typeTag, statusTag, deferTag, exportCsv, getRole, setRole };
})();
