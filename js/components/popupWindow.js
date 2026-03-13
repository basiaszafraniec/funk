import { createTopBar } from "./topBar.js";

let topZ = 20;

export function createPopupWindow(type) {

    const win = document.createElement("div");
    win.className = "window popup-window";

    win.style.width = "250px";
    win.style.height = "150px";

    win.style.left = window.innerWidth / 2 - 125 + "px";
    win.style.top = window.innerHeight / 2 - 75 + "px";
    win.style.zIndex = ++topZ;

    const topBar = createTopBar({ closable: true });

    const content = document.createElement("div");
    content.className = "content-container";

    content.textContent = type;

    win.append(topBar, content);

    document.body.appendChild(win);
}