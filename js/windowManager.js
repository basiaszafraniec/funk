export function manageWindows() {
    let activeWindow = null;
    let offsetX = 0;
    let offsetY = 0;
    let topZ = 10;


    const isMobile = /Mobi|Android/i.test(navigator.userAgent);


    //move windows and icons around 
    document.addEventListener("pointerdown", (e) => {
        if (e.target.closest("input, button, select, textarea")) return;
        if (e.pointerType === "touch") {
            e.preventDefault();
        };

        if (e.target.closest(".x-div")) return;
        const topBar = e.target.closest(".top-bar");
        if (!topBar) return;

        const win = topBar.closest(".window");
        if (!win) return;

        activeWindow = win;

        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;

        if (!win.id === "main-window") {
            win.style.zIndex = ++topZ;
        }
        topBar.style.cursor = "grabbing";
    });

    document.addEventListener("pointermove", (e) => {
        if (!activeWindow) return;

        activeWindow.style.left = e.clientX - offsetX + "px";
        activeWindow.style.top = e.clientY - offsetY + "px";
    });

    document.addEventListener("pointerup", () => {
        if (!activeWindow) return;
        activeWindow.querySelector(".top-bar").style.cursor = "grab";
        clampWindowToViewport(activeWindow);

        activeWindow = null;

    });

    const TOP_BAR_HEIGHT = 30;
    const MIN_VISIBLE_WIDTH_RATIO = 0.2;
    const MARGIN = 8;

    function clampWindowToViewport(win) {
        const rect = win.getBoundingClientRect();

        const minVisibleWidth = rect.width * MIN_VISIBLE_WIDTH_RATIO;

        // vertical: strict (top bar always visible)
        const minY = MARGIN;
        const maxY = window.innerHeight - TOP_BAR_HEIGHT - MARGIN;

        // horizontal: allow 80% off-screen
        const minX = -(rect.width - minVisibleWidth);
        const maxX = window.innerWidth - minVisibleWidth;

        let x = rect.left;
        let y = rect.top;

        x = Math.min(Math.max(x, minX), maxX);
        y = Math.min(Math.max(y, minY), maxY);

        win.style.transition =
            "left 0.35s cubic-bezier(.34,1.56,.64,1), top 0.35s cubic-bezier(.34,1.56,.64,1)";
        win.style.left = x + "px";
        win.style.top = y + "px";

        setTimeout(() => {
            win.style.transition = "";
        }, 350);
    }




    //bring to front on click
    document.addEventListener("pointerdown", (e) => {
        const win = e.target.closest(".window");
        if (win && win.id === "main-window") return;
        if (!win) return;

        win.style.zIndex = ++topZ;
    });

}
