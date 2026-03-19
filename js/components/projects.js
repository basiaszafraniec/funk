import { createTopBar } from "./topBar.js";
import { FILE_SYSTEM } from "../data/projectData.js";
import { openProjectWindow } from "./projectWindow.js";

export function openProjectsWindow() {

    if (document.getElementById("projects-window")) return;

    const win = document.createElement("div");
    win.className = "window proj-window";
    win.id = "projects-window";

    win.style.left = "30px";
    win.style.top  = "30px";

    win.appendChild(createTopBar({ closable: true }));

    // ── ticker ────────────────────────────────────────────────
    const ticker = document.createElement("div");
    ticker.className = "scrolling-bar proj-ticker";
    ticker.innerHTML = `<ul>
        <li>projects</li><li>javascript</li><li>python</li><li>blender</li><li>figma</li>
        <li>projects</li><li>javascript</li><li>python</li><li>blender</li><li>figma</li>
    </ul>`;

    // ── 3-col body ────────────────────────────────────────────
    const body = document.createElement("div");
    body.className = "proj-body";

    const sidebar  = makeSidebar();
    const middle   = makeMiddle();
    const rightCol = makeRightCol();

    body.append(sidebar.el, middle.el, rightCol);
    win.append(ticker, body);
    document.body.appendChild(win);

    // ── wire sidebar → middle ─────────────────────────────────
    sidebar.onSelect(folderKey => {
        middle.render(folderKey);
    });
}

// ── SIDEBAR ───────────────────────────────────────────────────
function makeSidebar() {
    const el = document.createElement("div");
    el.className = "proj-sidebar";

    const label = document.createElement("div");
    label.className = "proj-col-label";
    label.textContent = "folders";

    const list = document.createElement("div");
    list.className = "proj-folder-list";

    let cb = null;
    let activeRow = null;

    FILE_SYSTEM.root.forEach(folder => {
        const row = document.createElement("div");
        row.className = "proj-folder-row";

        const icon = document.createElement("div");
        icon.className = "proj-folder-icon";

        const name = document.createElement("span");
        name.textContent = folder.name;

        const count = document.createElement("span");
        count.className = "proj-folder-count";
        count.textContent = FILE_SYSTEM[folder.target].length;

        row.append(icon, name, count);

        row.addEventListener("click", () => {
            if (activeRow) activeRow.classList.remove("active");
            row.classList.add("active");
            activeRow = row;
            if (cb) cb(folder.target);
        });

        list.appendChild(row);
    });

    el.append(label, list);

    return {
        el,
        onSelect(fn) { cb = fn; }
    };
}

// ── MIDDLE ────────────────────────────────────────────────────
function makeMiddle() {
    const el = document.createElement("div");
    el.className = "proj-middle";

    const label = document.createElement("div");
    label.className = "proj-col-label";
    label.textContent = "files";
    el.appendChild(label);

    const grid = document.createElement("div");
    grid.className = "proj-file-grid";
    el.appendChild(grid);

    // empty state
    showEmpty();

    function showEmpty() {
        grid.innerHTML = "";
        const empty = document.createElement("div");
        empty.className = "proj-empty";
        empty.textContent = "← pick a folder";
        grid.appendChild(empty);
    }

    function render(folderKey) {
        grid.innerHTML = "";
        FILE_SYSTEM[folderKey].forEach(item => {
            const fileDiv = document.createElement("div");
            fileDiv.className = "file-div";

            const icon = document.createElement("div");
            icon.className = "file file--project";

            const name = document.createElement("p");
            name.textContent = item.name;

            fileDiv.append(icon, name);

            fileDiv.addEventListener("click", () => {
                openProjectWindow(item.id);
            });

            grid.appendChild(fileDiv);
        });
    }

    return { el, render };
}

// ── RIGHT COL (empty for now) ─────────────────────────────────
function makeRightCol() {
    const el = document.createElement("div");
    el.className = "proj-right";

    const label = document.createElement("div");
    label.className = "proj-col-label";
    label.textContent = "aquarium";

    el.appendChild(label);
    return el;
}