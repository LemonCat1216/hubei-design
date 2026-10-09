/* 轻量 GIS 模拟地图：湖北域内选点 / 排污口标点展示 / 滚轮缩放与拖拽平移 */
const ClueMap = (function () {
    const DW = 560, DH = 400;                                   /* 设计基准尺寸（装饰层按此绘制后等比适配） */
    const LNG0 = 108.4, LNG1 = 116.6, LAT0 = 29.0, LAT1 = 33.6; /* 湖北经纬度范围 */

    const CITY_POINTS = [
        { name: "武汉", lng: 114.31, lat: 30.60 },
        { name: "宜昌", lng: 111.29, lat: 30.69 },
        { name: "襄阳", lng: 112.12, lat: 32.01 },
        { name: "荆州", lng: 112.24, lat: 30.33 },
        { name: "十堰", lng: 110.80, lat: 32.63 }
    ];

    /* 17个地市（含直管市、林区）中心坐标，用于按地市定位 */
    const CITY_CENTERS = {
        "武汉市": [114.31, 30.60], "黄石市": [115.10, 30.20], "十堰市": [110.79, 32.65],
        "宜昌市": [111.29, 30.69], "襄阳市": [112.14, 32.04], "鄂州市": [114.89, 30.39],
        "荆门市": [112.20, 31.04], "孝感市": [113.92, 30.92], "荆州市": [112.24, 30.33],
        "黄冈市": [114.87, 30.45], "咸宁市": [114.32, 29.84], "随州市": [113.37, 31.72],
        "恩施州": [109.49, 30.28], "仙桃市": [113.45, 30.36], "潜江市": [112.90, 30.40],
        "天门市": [113.17, 30.66], "神农架林区": [110.68, 31.74]
    };

    function centerOf(name) {
        const point = CITY_CENTERS[String(name || "").trim()];
        return point ? { lng: point[0], lat: point[1] } : null;
    }

    /* 装饰底图：按设计基准坐标绘制（河流、湖泊、城市标注、网格） */
    function scene() {
        const dpx = lng => (lng - LNG0) / (LNG1 - LNG0) * DW;
        const dpy = lat => (LAT1 - lat) / (LAT1 - LAT0) * DH;
        const grid = [];
        for (let i = 1; i < 8; i += 1) grid.push(`<line x1="${i * 70}" y1="0" x2="${i * 70}" y2="${DH}" stroke="#edf0e8" stroke-width="1"/>`);
        for (let i = 1; i < 6; i += 1) grid.push(`<line x1="0" y1="${i * 66}" x2="${DW}" y2="${i * 66}" stroke="#edf0e8" stroke-width="1"/>`);
        const cities = CITY_POINTS.map(city => `
            <g class="city-dot">
                <circle cx="${dpx(city.lng)}" cy="${dpy(city.lat)}" r="3" fill="#b3bcc9"/>
                <text x="${dpx(city.lng) + 7}" y="${dpy(city.lat) + 4}" font-size="11" fill="#9aa5b3">${city.name}</text>
            </g>`).join("");
        return `
            ${grid.join("")}
            <path d="M -10 235 C 80 222, 150 244, 205 258 S 330 292, 405 302 S 520 330, 575 342" fill="none" stroke="#b8d9f2" stroke-width="20" stroke-linecap="round"/>
            <path d="M -10 235 C 80 222, 150 244, 205 258 S 330 292, 405 302 S 520 330, 575 342" fill="none" stroke="#d4eaf9" stroke-width="8" stroke-linecap="round"/>
            <path d="M 40 -10 C 62 80, 122 148, 188 190 S 208 238, 205 258" fill="none" stroke="#b8d9f2" stroke-width="11" stroke-linecap="round"/>
            <path d="M 40 -10 C 62 80, 122 148, 188 190 S 208 238, 205 258" fill="none" stroke="#d4eaf9" stroke-width="4" stroke-linecap="round"/>
            <ellipse cx="292" cy="228" rx="26" ry="13" fill="#cfe6f7" stroke="#a9cdec" stroke-width="1"/>
            <ellipse cx="330" cy="330" rx="34" ry="15" fill="#cfe6f7" stroke="#a9cdec" stroke-width="1"/>
            <ellipse cx="160" cy="330" rx="22" ry="11" fill="#cfe6f7" stroke="#a9cdec" stroke-width="1"/>
            <text x="402" y="336" font-size="12" fill="#6d9cc4">长江</text>
            <text x="78" y="96" font-size="11" fill="#6d9cc4">汉江</text>
            ${cities}`;
    }

    function create(container, options) {
        const opts = Object.assign({
            pick: true, zoom: true, lng: null, lat: null,
            outlets: [], onPick: null, onOutletClick: null, onGeoClick: null
        }, options || {});

        let w = DW, h = DH;
        let view = { k: 1, tx: 0, ty: 0 };
        let point = { lng: opts.lng, lat: opts.lat };
        let outlets = opts.outlets || [];
        let nodes = null;
        let drag = null;

        const px = lng => (lng - LNG0) / (LNG1 - LNG0) * w;
        const py = lat => (LAT1 - lat) / (LAT1 - LAT0) * h;
        const toLng = x => LNG0 + x / w * (LNG1 - LNG0);
        const toLat = y => LAT1 - y / h * (LAT1 - LAT0);

        function measure() {
            const cw = Math.round(container.clientWidth || 0);
            const ch = Math.round(container.clientHeight || 0);
            w = Math.max(260, cw || DW);
            h = Math.max(160, ch || Math.round(w * DH / DW));
        }

        function applyView() {
            nodes.view.setAttribute("transform", `translate(${view.tx} ${view.ty}) scale(${view.k})`);
        }

        function clampView() {
            view.tx = Math.min(0, Math.max(w * (1 - view.k), view.tx));
            view.ty = Math.min(0, Math.max(h * (1 - view.k), view.ty));
        }

        function renderOutlets() {
            nodes.outlets.innerHTML = outlets.map(outlet => {
                const x = px(outlet.lng), y = py(outlet.lat);
                return `<g class="outlet-marker" data-outlet-id="${outlet.id}" transform="translate(${x} ${y}) scale(${1 / view.k})">
                    <title>${outlet.name}（${outlet.level}）</title>
                    <circle class="pulse" r="12" fill="rgba(47,124,232,0.28)"/>
                    <circle class="core" r="6" fill="#2f7ce8" stroke="#fff" stroke-width="2"/>
                </g>`;
            }).join("");
        }

        function setPoint(lng, lat) {
            point = { lng, lat };
            if (!nodes) return;
            if (lng == null || lat == null) { nodes.point.style.display = "none"; return; }
            const x = px(lng), y = py(lat);
            nodes.point.innerHTML = `<g transform="translate(${x} ${y}) scale(${1 / view.k})">
                <circle r="15" fill="rgba(224,52,47,0.2)"/>
                <path d="M 0 -16 C -11 -6, -8 3, 0 12 C 8 3, 11 -6, 0 -16 Z" transform="translate(0,-6)" fill="#e0342f" stroke="#fff" stroke-width="2"/>
                <circle cy="-6" r="3.4" fill="#fff"/>
            </g>`;
            nodes.point.style.display = "";
        }

        function renderMarkers() {
            if (!nodes) return;
            renderOutlets();
            if (point.lng != null && point.lat != null) setPoint(point.lng, point.lat);
        }

        function pointerPos(event) {
            const rect = nodes.svg.getBoundingClientRect();
            const rx = rect.width || w, ry = rect.height || h;
            return {
                sx: (event.clientX - rect.left) / rx * w,
                sy: (event.clientY - rect.top) / ry * h
            };
        }

        function geoAt(sx, sy) {
            const ux = (sx - view.tx) / view.k;
            const uy = (sy - view.ty) / view.k;
            return { lng: +toLng(ux).toFixed(6), lat: +toLat(uy).toFixed(6) };
        }

        function zoomAt(sx, sy, factor) {
            const ux = (sx - view.tx) / view.k;
            const uy = (sy - view.ty) / view.k;
            const k = Math.min(6, Math.max(1, +(view.k * factor).toFixed(3)));
            view.k = k;
            view.tx = sx - ux * k;
            view.ty = sy - uy * k;
            clampView();
            applyView();
            renderMarkers();
        }

        function pickAt(event) {
            const { sx, sy } = pointerPos(event);
            const marker = event.target.closest ? event.target.closest(".outlet-marker") : null;
            if (marker && opts.onOutletClick) {
                const outlet = outlets.find(item => item.id === Number(marker.dataset.outletId));
                if (outlet) { opts.onOutletClick(outlet); return; }
            }
            const geo = geoAt(sx, sy);
            if (opts.pick && opts.onPick) {
                setPoint(geo.lng, geo.lat);
                opts.onPick(geo.lng, geo.lat);
            } else if (opts.onGeoClick) {
                opts.onGeoClick(geo.lng, geo.lat);
            }
        }

        function bindEvents() {
            const svg = nodes.svg;
            svg.addEventListener("wheel", event => {
                if (!opts.zoom) return;
                event.preventDefault();
                const { sx, sy } = pointerPos(event);
                zoomAt(sx, sy, event.deltaY < 0 ? 1.16 : 1 / 1.16);
            }, { passive: false });

            svg.addEventListener("pointerdown", event => {
                if (event.button !== 0) return;
                drag = { x: event.clientX, y: event.clientY, tx: view.tx, ty: view.ty, moved: false, captured: false };
            });

            svg.addEventListener("pointermove", event => {
                if (!drag) return;
                const dxPx = event.clientX - drag.x, dyPx = event.clientY - drag.y;
                if (!drag.moved && Math.abs(dxPx) + Math.abs(dyPx) < 5) return;
                if (!drag.moved && opts.zoom) {
                    drag.moved = true;
                    if (svg.setPointerCapture) { svg.setPointerCapture(event.pointerId); drag.captured = true; }
                }
                if (!drag.moved) return;
                const rect = svg.getBoundingClientRect();
                view.tx = drag.tx + dxPx / (rect.width || w) * w;
                view.ty = drag.ty + dyPx / (rect.height || h) * h;
                clampView();
                applyView();
                renderMarkers();
            });

            svg.addEventListener("pointerup", event => {
                const moved = drag && drag.moved;
                if (drag && drag.captured && svg.releasePointerCapture) {
                    try { svg.releasePointerCapture(event.pointerId); } catch (error) { /* ignore */ }
                }
                drag = null;
                if (moved) return;      /* 拖动结束不落点 */
                pickAt(event);
            });

            svg.addEventListener("pointercancel", () => { drag = null; });
        }

        function build() {
            measure();
            container.innerHTML = `
            <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="湖北省域示意地图">
                <rect x="0" y="0" width="${w}" height="${h}" fill="#f6f8f2"/>
                <g class="layer-view" transform="translate(${view.tx} ${view.ty}) scale(${view.k})">
                    <g transform="scale(${w / DW} ${h / DH})">${scene()}</g>
                    <g class="layer-outlets"></g>
                    <g class="layer-point" style="display:none"></g>
                </g>
            </svg>`;
            const svg = container.querySelector("svg");
            nodes = {
                svg,
                view: svg.querySelector(".layer-view"),
                outlets: svg.querySelector(".layer-outlets"),
                point: svg.querySelector(".layer-point")
            };
            if (opts.pick) container.classList.add("pick");
            bindEvents();
            applyView();
            renderOutlets();
            setPoint(point.lng, point.lat);
        }

        build();

        return {
            svg: nodes.svg,
            setPoint,
            setOutlets(list) { outlets = list || []; renderOutlets(); },
            renderMarkers,
            getPoint() { return { ...point }; },
            zoom: () => view.k,
            /* 定位到指定经纬度并按比例放大 */
            focus(lng, lat, k = 2.2) {
                if (lng == null || lat == null) return;
                view.k = Math.min(6, Math.max(1, k));
                view.tx = w / 2 - px(lng) * view.k;
                view.ty = h / 2 - py(lat) * view.k;
                clampView();
                applyView();
                renderMarkers();
            },
            zoomBy(factor) { zoomAt(w / 2, h / 2, factor); },
            resetView() { view = { k: 1, tx: 0, ty: 0 }; applyView(); renderMarkers(); },
            /* 容器尺寸变化后重建（例如弹窗打开、窗口缩放） */
            resize() {
                const keep = { ...view };
                const keepPoint = { ...point };
                build();
                view = keep;
                applyView();
                setPoint(keepPoint.lng, keepPoint.lat);
                renderOutlets();
            }
        };
    }

    return { create, centerOf, cities: Object.keys(CITY_CENTERS) };
})();
