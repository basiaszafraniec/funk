export function createTopBar({
    title = "",
    closable = true,
    onClose = null
} = {}) {

    const topBar = document.createElement("div");
    topBar.className = "top-bar";


    const leftButtons = document.createElement("div");
    leftButtons.className = "left-buttons";

    leftButtons.append(
        document.createElement("div"),
        document.createElement("div"),
        document.createElement("div")
    );


    const titleEl = document.createElement("div");
    titleEl.className = "window-title";
    titleEl.textContent = title;


    const rightButtons = document.createElement("div");
    rightButtons.className = "right-buttons";

    const whiteBar = document.createElement("div");
    whiteBar.className = "white-bar";

    const closeBtn = document.createElement("div");
    closeBtn.className = "x-div";

    const xIcon = document.createElement("div");
    xIcon.className = "x-icon";

    closeBtn.appendChild(xIcon);

    if (!closable) {
        closeBtn.classList.add("disabled");
    } else {
        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            if (onClose) {
                onClose();
            } else {
                // default behavior: remove window
                const win = topBar.closest(".window");
                if (win) win.remove();
            }
        });
    }

    rightButtons.append(whiteBar, closeBtn);

    /* ---------- ASSEMBLE ---------- */

    topBar.append(leftButtons, titleEl, rightButtons);

    return topBar;
}
