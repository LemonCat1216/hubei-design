/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./问题聚焦-清单.html",
        "./问题聚焦-底单.html",
        "./问题聚焦-统计.html"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3b82f6",
                "background-light": "#f4f7fb",
                "background-dark": "#0f172a",
            },
            fontFamily: {
                display: ["Inter", "system-ui", "-apple-system", "sans-serif"],
            },
        },
    },
    plugins: [],
};
