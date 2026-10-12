/* 联系人设置：左侧地市列表 + 右侧联系人表单，保存时自动校验系统人员 */
(function () {
    const { showToast, esc, todayStr } = window.ClueUI;

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
            return { key: "idle", cls: "", ok: false, text: "尚未选择联系人，请点击「选择联系人」从系统人员库中检索并选择。" };
        }
        if (!personName) return { key: "idle", cls: "warn", ok: false, text: "尚未选择联系人。" };
        if (!personPhone) return { key: "idle", cls: "warn", ok: false, text: "所选联系人缺少手机号，请重新选择。" };
        if (!/^1\d{10}$/.test(personPhone)) {
            return { key: "bad", cls: "bad", ok: false, text: "手机号格式不正确，应为 11 位手机号码。" };
        }

        const matched = staffByName(personName);
        if (!matched.length) {
            return { key: "bad", cls: "bad", ok: false, text: `系统中不存在此人（${personName}），不允许设置，请重新选择。` };
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

    /* ---------- 右栏：联系人表单（从系统人员库中选择） ---------- */
    function pickedOf(city) {
        const draft = draftOf(city);
        if (!draft || !draft.name) return null;
        const matched = staffByName(draft.name);
        return matched.find(item => item.phone === draft.phone) || matched[0] || null;
    }

    function pickFieldHtml(staff) {
        if (!staff) {
            return `<button type="button" class="pick-field empty" id="pickField">
                    <span class="pf-avatar"><i class="fa-solid fa-user-plus"></i></span>
                    <span class="pf-main">
                        <span class="pf-name">点击选择联系人</span>
                        <span class="pf-sub">从系统人员库中检索并选择联系人</span>
                    </span>
                    <span class="pf-action">选择<i class="fa-solid fa-chevron-right"></i></span>
                </button>`;
        }
        return `<button type="button" class="pick-field" id="pickField">
                <span class="pf-avatar">${esc(staff.name.slice(0, 1))}</span>
                <span class="pf-main">
                    <span class="pf-name">${esc(staff.name)}</span>
                    <span class="pf-sub">${esc(staff.dept)} · ${esc(staff.phone)}</span>
                </span>
                <span class="pf-action">更换<i class="fa-solid fa-chevron-right"></i></span>
            </button>`;
    }

    function renderDetail() {
        const city = state.city;
        const staff = pickedOf(city);
        document.getElementById("detailCity").textContent = city;
        document.getElementById("detailBody").innerHTML = `
            <table class="kv-table">
                <tbody>
                <tr>
                    <th>地市名称</th>
                    <td><span class="kv-static" id="kvCityName">${esc(city)}</span></td>
                </tr>
                <tr>
                    <th>选择联系人<i class="req">*</i></th>
                    <td>${pickFieldHtml(staff)}</td>
                </tr>
                <tr>
                    <th>手机号码</th>
                    <td><span class="kv-static mono" id="kvPhone">${staff ? esc(staff.phone) : "—"}</span></td>
                </tr>
                <tr>
                    <th>所属单位</th>
                    <td><span class="kv-static" id="kvDept">${staff ? esc(staff.dept) : "—"}</span></td>
                </tr>
                <tr>
                    <th>最近更新时间</th>
                    <td><span class="kv-time" id="kvTime"></span></td>
                </tr>
                </tbody>
            </table>`;
        updateDetailUI();
    }

    function updateDetailUI() {
        const city = state.city;
        const draft = draftOf(city);

        const personName = String(draft.name || "").trim();
        const personPhone = String(draft.phone || "").replace(/[\s-]/g, "");
        const v = validate(personName, personPhone, city);
        vstateMap[city] = v;

        const matched = pickedOf(city);

        const kvPhone = document.getElementById("kvPhone");
        const kvDept = document.getElementById("kvDept");
        if (kvPhone) {
            kvPhone.textContent = matched ? matched.phone : "—";
            kvPhone.classList.toggle("muted", !matched);
        }
        if (kvDept) {
            kvDept.textContent = matched ? matched.dept : "—";
            kvDept.classList.toggle("muted", !matched);
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
        const kvTime = document.getElementById("kvTime");
        if (kvTime) kvTime.textContent = saved ? contact.updateTime : "尚未保存";
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

    document.getElementById("detailBody").addEventListener("click", event => {
        if (event.target.closest("#pickField")) openPicker();
    });

    /* ---------- 选择联系人弹窗 ---------- */
    function renderPickerPlaceholder(text) {
        document.getElementById("pickBody").innerHTML =
            `<tr class="pick-empty"><td colspan="5">${esc(text || "请输入人员姓名或手机号，点击「搜索」查询系统人员")}</td></tr>`;
        document.getElementById("pickCount").textContent = "";
    }

    function renderPickerList(kw) {
        const key = String(kw || "").trim().toLowerCase();
        const rows = STAFF_DIRECTORY.filter(staff =>
            !key || `${staff.name} ${staff.phone} ${staff.dept}`.toLowerCase().indexOf(key) >= 0);
        const current = draftOf(state.city);
        document.getElementById("pickBody").innerHTML = rows.length
            ? rows.map(staff => {
                const isCurrent = current.name === staff.name && current.phone === staff.phone;
                return `<tr class="pick-row ${isCurrent ? "is-current" : ""}" data-name="${esc(staff.name)}" data-phone="${esc(staff.phone)}">
                        <td>${esc(staff.name)}</td>
                        <td class="mono">${esc(staff.phone)}</td>
                        <td>${esc(staff.dept)}</td>
                        <td><span class="dir-city">${staff.city === "省级" ? "省级人员" : "地市联系人"}</span></td>
                        <td class="center">${isCurrent ? '<span class="pick-flag">当前</span>' : '<span class="pick-op">选择</span>'}</td>
                    </tr>`;
            }).join("")
            : `<tr class="pick-empty"><td colspan="5">未查询到符合条件的人员</td></tr>`;
        document.getElementById("pickCount").textContent = `匹配 ${rows.length} 人`;
    }

    function doPickerSearch() {
        const kw = document.getElementById("pickSearch").value.trim();
        if (!kw) {
            renderPickerPlaceholder("请输入人员姓名或手机号后再点击「搜索」");
            return;
        }
        renderPickerList(kw);
    }

    function openPicker() {
        document.getElementById("pickCity").textContent = state.city;
        document.getElementById("pickTotal").textContent = STAFF_DIRECTORY.length;
        document.getElementById("pickSearch").value = "";
        renderPickerPlaceholder();
        window.ClueUI.openModal("pickerModal");
        setTimeout(() => document.getElementById("pickSearch").focus(), 30);
    }

    function pickContact(name, phone) {
        const draft = draftOf(state.city);
        draft.name = name;
        draft.phone = phone;
        window.ClueUI.closeModal("pickerModal");
        renderDetail();
        showToast(`已选择「${state.city}」联系人：${name}（${maskPhone(phone)}）`);
    }

    document.getElementById("pickSearchBtn").addEventListener("click", doPickerSearch);

    document.getElementById("pickSearch").addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            doPickerSearch();
        }
    });

    document.getElementById("pickBody").addEventListener("click", event => {
        const row = event.target.closest(".pick-row");
        if (!row) return;
        pickContact(row.dataset.name, row.dataset.phone);
    });

    function saveContact() {
        const city = state.city;
        const draft = draftOf(city);
        const name = String(draft.name || "").trim();
        const phone = String(draft.phone || "").replace(/[\s-]/g, "").slice(0, 11);
        draft.name = name;
        draft.phone = phone;

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
        showToast(contact && contact.name ? `已还原「${city}」已保存的联系人信息` : `已清空「${city}」联系人选择`);
    });

    document.getElementById("stateSeg").addEventListener("click", event => {
        const button = event.target.closest("button[data-state]");
        if (!button) return;
        document.querySelectorAll("#stateSeg button").forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        state.filter = button.dataset.state;
        renderList();
    });

    renderList();
})();
