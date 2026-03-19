export function manageWindows() {
    let activeWindow = null;
    let activeDoodle = null;
    let offsetX = 0;
    let offsetY = 0;
    let topZ = 10;

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    // ── window dragging (via top-bar) ─────────────────────────
    document.addEventListener("pointerdown", (e) => {
        if (e.target.closest("input, button, select, textarea")) return;
        if (e.pointerType === "touch") e.preventDefault();
        if (e.target.closest(".x-div")) return;

        const topBar = e.target.closest(".top-bar");
        if (!topBar) return;

        const win = topBar.closest(".window");
        if (!win) return;

        activeWindow = win;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;

        if (win.id !== "main-window") win.style.zIndex = ++topZ;
        topBar.style.cursor = "grabbing";
    });

    // ── doodle sticker dragging ───────────────────────────────
    document.addEventListener("pointerdown", (e) => {
        if (e.target.closest(".desktop-doodle-close")) return;

        const doodle = e.target.closest(".desktop-doodle");
        if (!doodle) return;

        activeDoodle = doodle;
        offsetX = e.clientX - doodle.offsetLeft;
        offsetY = e.clientY - doodle.offsetTop;
        doodle.style.zIndex = ++topZ;
        doodle.setPointerCapture(e.pointerId);
    });

    // ── move ──────────────────────────────────────────────────
    document.addEventListener("pointermove", (e) => {
        if (activeWindow) {
            activeWindow.style.left = e.clientX - offsetX + "px";
            activeWindow.style.top  = e.clientY - offsetY + "px";
        }
        if (activeDoodle) {
            activeDoodle.style.left = e.clientX - offsetX + "px";
            activeDoodle.style.top  = e.clientY - offsetY + "px";
        }
    });

    // ── release ───────────────────────────────────────────────
    document.addEventListener("pointerup", () => {
        if (activeWindow) {
            activeWindow.querySelector(".top-bar").style.cursor = "grab";
            clampWindowToViewport(activeWindow);
            activeWindow = null;
        }
        if (activeDoodle) {
            activeDoodle = null;
        }
    });

    // ── clamp windows to viewport ─────────────────────────────
    const TOP_BAR_HEIGHT = 30;
    const MIN_VISIBLE_WIDTH_RATIO = 0.2;
    const MARGIN = 8;

    function clampWindowToViewport(win) {
        const rect = win.getBoundingClientRect();
        const minVisibleWidth = rect.width * MIN_VISIBLE_WIDTH_RATIO;

        const minX = -(rect.width - minVisibleWidth);
        const maxX = window.innerWidth  - minVisibleWidth;
        const minY = MARGIN;
        const maxY = window.innerHeight - TOP_BAR_HEIGHT - MARGIN;

        let x = Math.min(Math.max(rect.left, minX), maxX);
        let y = Math.min(Math.max(rect.top,  minY), maxY);

        win.style.transition = "left 0.35s cubic-bezier(.34,1.56,.64,1), top 0.35s cubic-bezier(.34,1.56,.64,1)";
        win.style.left = x + "px";
        win.style.top  = y + "px";

        setTimeout(() => { win.style.transition = ""; }, 350);
    }

    // ── bring windows to front on click ───────────────────────
    document.addEventListener("pointerdown", (e) => {
        const win = e.target.closest(".window");
        if (win && win.id === "main-window") return;
        if (!win) return;
        win.style.zIndex = ++topZ;
    });
}