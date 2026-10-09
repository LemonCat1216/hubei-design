/* 联系人设置：左侧地市列表 + 右侧联系人表单，保存时自动校验系统人员 */
(function () {
    const { showToast, esc, exportCsv, todayStr } = window.ClueUI;

    const state = { filter: "all", city: CITIES[0] };
    const draftMap = {};
    const vstateMap = {};

    CITIES.forEach(city => {
        const saved = contactByCity(city);
        draftMap[city] = { name: saved ? saved.name : "", phone: saved ? saved.phone : "" };
    });

    /* ---------- 基础工具 ---------- */
    function hasSaved(city) {
        const contact = contactByCity(city);
        return !!(contact && contact.name && contact.phone);
    }

    function draftOf(city) { return draftMap[city]; }

    function maskPhone(phone) {
        const text = String(phone || "");
        return text.length === 11 ? `${text.slice(0, 3)}****${text.slice(7)}` : text;
    }

    function nowStamp() {
        const date = new Date();
        const hh = String(date.getHours()).padStart(2, "0");
        const mm = String(date.getMinutes()).padStart(2, "0");
        return `${todayStr()} ${hh}:${mm}`;
    }

    function isChanged(city) {
        const contact = contactByCity(city);
        const draft = draftOf(city);
        if (!contact || !contact.name) return !!(draft.name || draft.phone);
        return draft.name !== contact.name || draft.phone !== contact.phone;
    }

    /* ---------- 校验：系统中是否存在此人 ---------- */
    function validate(name, phone, city) {
        const personName = String(name || "").trim();
        const personPhone = String(phone || "").replace(/[\s-]/g, "");

        if (!personName && !personPhone) {
            return { key: "idle", cls: "", ok: false, text: "请输入联系人姓名与手机号，系统将自动校验系统中是否存在此人。" };
        }
        if (!personName) return { key: "idle", cls: "warn", ok: false, text: "请输入联系人姓名。" };
        if (!personPhone) return { key: "idle", cls: "warn", ok: false, text: "请输入联系人手机号。" };
        if (!/^1\d{10}$/.test(personPhone)) {
            return { key: "bad", cls: "bad", ok: false, text: "手机号格式不正确，应为 11 位手机号码。" };
        }

        const matched = staffByName(personName);
        if (!matched.length) {
            return { key: "bad", cls: "bad", ok: false, text: `系统中不存在此人（${personName}），不允许设置，请先完成用户注册。` };
        }

        const staff = matched[0];
        if (staff.phone !== personPhone) {
            const owner = staffByPhone(personPhone)[0];
            if (owner && owner.name !== personName) {
                return { key: "bad", cls: "bad", ok: false, text: `该手机号在系统中登记为「${owner.name}」，与所填姓名不一致，不允许设置。` };
            }
            return { key: "bad", cls: "bad", ok: false, text: `姓名与系统登记手机号不一致（系统登记：${maskPhone(staff.phone)}），不允许设置。` };
        }

        if (city && staff.city !== city && staff.city !== "省级") {
            return { key: "ok", cls: "warn", ok: true, text: `校验通过；该人员在系统登记单位为「${staff.dept}」，非本地市人员。` };
        }
        return { key: "ok", cls: "ok", ok: true, text: `校验通过：姓名与手机号均与系统登记信息一致（${staff.dept}）。` };
    }

    /* ---------- 左栏：地市列表 ---------- */
    function visibleCities() {
        return CITIES.filter(city => {
            if (state.filter === "set" && !hasSaved(city)) return false;
            if (state.filter === "unset" && hasSaved(city)) return false;
            return true;
        });
    }

    function renderList() {
        const visible = visibleCities();
        const visibleSet = new Set(visible);
        const html = visible.map(city => {
            const contact = contactByCity(city);
            const saved = hasSaved(city);
            return `<button type="button" class="city-item ${city === state.city ? "active" : ""}" data-city="${esc(city)}">
                    <span class="ci-name">${esc(city)}</span>
                    <span class="ci-person">${saved ? esc(contact.name) : "未设置"}</span>
                    <span class="ci-dot ${saved ? "ok" : "empty"}"></span>
                </button>`;
        }).join("");
        document.getElementById("cityList").innerHTML = html || `<div class="city-empty"><i class="fa-regular fa-folder-open"></i>暂无符合条件的地市</div>`;

        if (visible.length && !visibleSet.has(state.city)) state.city = visible[0];
        const set = CITIES.filter(hasSaved).length;
        document.getElementById("panelCount").textContent = `已设置 ${set} / ${CITIES.length}`;
        renderDetail();
    }

    /* ---------- 右栏：联系人表单 ---------- */
    function renderDetail() {
        const city = state.city;
        const draft = draftOf(city);
        document.getElementById("detailCity").textContent = city;
        document.getElementById("detailBody").innerHTML = `
            <table class="kv-table">
                <tbody>
                <tr>
                    <th>地市名称</th>
                    <td><span class="kv-static" id="kvCityName">${esc(city)}</span></td>
                </tr>
                <tr>
                    <th>联系人姓名<i class="req">*</i></th>
                    <td>
                        <div class="input-wrap">
                            <input class="kv-input" id="ccName" type="text" maxlength="20" autocomplete="off" placeholder="请输入联系人姓名" value="${esc(draft.name)}">
                            <i class="kv-state" id="nameState"></i>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>手机号码<i class="req">*</i></th>
                    <td>
                        <div class="input-wrap">
                            <input class="kv-input mono" id="ccPhone" type="text" maxlength="11" autocomplete="off" placeholder="请输入11位手机号码" value="${esc(draft.phone)}">
                            <i class="kv-state" id="phoneState"></i>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>校验结果</th>
                    <td><div class="kv-msg" id="kvMsg"></div></td>
                </tr>
                <tr>
                    <th>系统登记信息</th>
                    <td><div class="kv-staff" id="kvStaff"></div></td>
                </tr>
                <tr>
                    <th>最近更新时间</th>
                    <td><span class="kv-time" id="kvTime"></span></td>
                </tr>
                </tbody>
            </table>`;
        updateDetailUI();
    }

    function setFieldState(el, key) {
        if (key === "ok") {
            el.className = "kv-state ok fa-solid fa-circle-check";
        } else if (key === "bad") {
            el.className = "kv-state bad fa-solid fa-circle-exclamation";
        } else {
            el.className = "kv-state fa-solid";
        }
    }

    function updateDetailUI() {
        const city = state.city;
        const nameEl = document.getElementById("ccName");
        const phoneEl = document.getElementById("ccPhone");
        if (!nameEl || !phoneEl) return;

        const personName = nameEl.value.trim();
        const personPhone = phoneEl.value.replace(/[\s-]/g, "");
        const v = validate(personName, personPhone, city);
        vstateMap[city] = v;

        const matched = personName ? staffByName(personName)[0] : null;
        const nameOk = !!matched;
        const phoneOk = !!(matched && matched.phone === personPhone);
        setFieldState(document.getElementById("nameState"), personName ? (nameOk ? "ok" : "bad") : "");
        setFieldState(document.getElementById("phoneState"), personPhone ? (phoneOk ? "ok" : "bad") : "");
        document.getElementById("ccName").classList.toggle("state-ok", !!personName && nameOk);
        document.getElementById("ccName").classList.toggle("state-bad", !!personName && !nameOk);
        document.getElementById("ccPhone").classList.toggle("state-ok", !!personPhone && phoneOk);
        document.getElementById("ccPhone").classList.toggle("state-bad", !!personPhone && !phoneOk);

        const icon = v.ok ? "fa-circle-check" : (v.key === "bad" ? "fa-circle-exclamation" : "fa-shield-halved");
        const msg = document.getElementById("kvMsg");
        msg.className = `kv-msg ${v.cls}`;
        msg.innerHTML = `<i class="fa-solid ${icon}"></i><span>${esc(v.text)}</span>`;

        const staffBox = document.getElementById("kvStaff");
        if (matched) {
            staffBox.innerHTML = `<span class="kv-static">${esc(matched.name)}</span>
                <span class="kv-tag">${esc(matched.dept)}</span>
                <span class="kv-tag ${phoneOk ? "ok" : "bad"}">${phoneOk ? "手机号一致" : `登记手机号 ${esc(maskPhone(matched.phone))}`}</span>`;
        } else {
            staffBox.innerHTML = `<span class="kv-static muted">${personName ? "系统中未查询到该人员" : "输入姓名后自动带出系统登记信息"}</span>`;
        }

        const contact = contactByCity(city);
        const saved = hasSaved(city);
        const pill = document.getElementById("detailPill");
        if (v.key === "bad") {
            pill.className = "cc-pill bad";
            pill.textContent = "校验不通过";
        } else if (v.ok) {
            pill.className = "cc-pill ok";
            pill.textContent = "已设置";
        } else {
            pill.className = "cc-pill empty";
            pill.textContent = saved ? "待修改" : "未设置";
        }

        document.getElementById("detailTime").textContent = saved ? `更新 ${contact.updateTime}` : "尚未设置";
        document.getElementById("kvTime").textContent = saved ? contact.updateTime : "尚未保存";
        const saveBtn = document.getElementById("saveBtn");
        saveBtn.disabled = !v.ok;
        saveBtn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>${isChanged(city) && saved ? "保存修改" : "保存联系人"}`;
    }

    /* ---------- 交互 ---------- */
    document.getElementById("cityList").addEventListener("click", event => {
        const item = event.target.closest(".city-item");
        if (!item || item.dataset.city === state.city) return;
        state.city = item.dataset.city;
        document.querySelectorAll(".city-item").forEach(el => el.classList.toggle("active", el.dataset.city === state.city));
        renderDetail();
    });

    let timer;
    document.getElementById("detailBody").addEventListener("input", event => {
        const input = event.target.closest(".kv-input");
        if (!input) return;
        const field = input.id === "ccPhone" ? "phone" : "name";
        let value = input.value;
        if (field === "phone") {
            value = value.replace(/[^\d]/g, "").slice(0, 11);
            if (value !== input.value) input.value = value;
        }
        draftOf(state.city)[field] = value;
        document.getElementById("kvMsg").className = "kv-msg checking";
        document.getElementById("kvMsg").innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i><span>正在校验系统人员信息…</span>`;
        clearTimeout(timer);
        timer = setTimeout(updateDetailUI, 340);
    });

    document.getElementById("detailBody").addEventListener("focusout", event => {
        if (event.target.closest(".kv-input")) {
            clearTimeout(timer);
            updateDetailUI();
        }
    });

    function saveContact() {
        const city = state.city;
        const name = document.getElementById("ccName").value.trim();
        const phone = document.getElementById("ccPhone").value.replace(/[\s-]/g, "").slice(0, 11);
        draftOf(city).name = name;
        draftOf(city).phone = phone;

        const v = validate(name, phone, city);
        vstateMap[city] = v;
        updateDetailUI();
        if (!v.ok) {
            showToast(v.text);
            return;
        }

        const existing = contactByCity(city);
        const replaced = existing && existing.name && existing.name !== name;
        const oldName = existing ? existing.name : "";
        if (existing) {
            existing.name = name;
            existing.phone = phone;
            existing.updateTime = nowStamp();
        } else {
            CONTACTS.push({ city, name, phone, updateTime: nowStamp() });
        }
        renderList();
        showToast(replaced
            ? `「${city}」联系人已由 ${oldName} 变更为 ${name}（每个地市仅保留1名联系人）`
            : `「${city}」联系人已保存：${name}（${maskPhone(phone)}），系统校验通过`);
    }

    document.getElementById("saveBtn").addEventListener("click", saveContact);

    document.getElementById("resetBtn").addEventListener("click", () => {
        const city = state.city;
        const contact = contactByCity(city);
        draftOf(city).name = contact ? contact.name : "";
        draftOf(city).phone = contact ? contact.phone : "";
        renderDetail();
        showToast(contact && contact.name ? `已还原「${city}」已保存的联系人信息` : `已清空「${city}」输入内容`);
    });

    document.getElementById("stateSeg").addEventListener("click", event => {
        const button = event.target.closest("button[data-state]");
        if (!button) return;
        document.querySelectorAll("#stateSeg button").forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        state.filter = button.dataset.state;
        renderList();
    });

    /* ---------- 一键校验 ---------- */
    document.getElementById("checkAllBtn").addEventListener("click", () => {
        let pass = 0, unset = 0, bad = 0;
        const items = CITIES.map(city => {
            const draft = draftOf(city);
            const v = validate(draft.name, draft.phone, city);
            vstateMap[city] = v;
            let cls = "empty", text = "未设置";
            if (v.key === "bad") { cls = "bad"; text = "校验不通过"; bad += 1; }
            else if (v.ok) { cls = "ok"; text = "校验通过"; pass += 1; }
            else { unset += 1; }
            return `<div class="report-item ${cls}"><span class="ri-city">${esc(city)}</span><span class="ri-text">${text}</span></div>`;
        });
        document.getElementById("reportTip").textContent =
            `共校验 ${CITIES.length} 个地市：校验通过 ${pass} 个，未设置 ${unset} 个，校验不通过 ${bad} 个。`;
        document.getElementById("reportGrid").innerHTML = items.join("");
        window.ClueUI.openModal("reportModal");
        showToast(`已完成 ${CITIES.length} 个地市联系人校验`);
    });

    /* ---------- 系统人员库 ---------- */
    function renderDirectory(kw) {
        const key = String(kw || "").trim().toLowerCase();
        const rows = STAFF_DIRECTORY.filter(staff =>
            !key || `${staff.name} ${staff.phone} ${staff.dept}`.toLowerCase().includes(key));
        document.getElementById("dirBody").innerHTML = rows.length
            ? rows.map(staff => `<tr>
                    <td>${esc(staff.name)}</td>
                    <td class="mono">${esc(maskPhone(staff.phone))}</td>
                    <td>${esc(staff.dept)}</td>
                    <td><span class="dir-city">${staff.city === "省级" ? "省级人员" : "地市联系人"}</span></td>
                </tr>`).join("")
            : `<tr><td colspan="4" style="padding:40px 0;text-align:center;color:#a5afbb">未查询到符合条件的人员</td></tr>`;
        document.getElementById("dirCount").textContent = `匹配 ${rows.length} 人`;
    }

    document.getElementById("directoryBtn").addEventListener("click", () => {
        document.getElementById("dirSearch").value = "";
        document.getElementById("dirTotal").textContent = STAFF_DIRECTORY.length;
        renderDirectory("");
        window.ClueUI.openModal("dirModal");
    });

    document.getElementById("dirSearch").addEventListener("input", event => renderDirectory(event.target.value));

    /* ---------- 导出 ---------- */
    document.getElementById("exportBtn").addEventListener("click", () => {
        const rows = CITIES.map(city => {
            const contact = contactByCity(city);
            const staff = contact && contact.name ? staffByName(contact.name)[0] : null;
            return [city, contact ? contact.name : "", contact ? contact.phone : "",
                staff ? staff.dept : "", hasSaved(city) ? "已设置" : "未设置", contact ? contact.updateTime : ""];
        });
        exportCsv(`地市联系人设置_${todayStr().replace(/-/g, "")}.csv`,
            ["地市", "联系人姓名", "手机号", "所属单位", "设置状态", "更新时间"], rows);
    });

    renderList();
})();
