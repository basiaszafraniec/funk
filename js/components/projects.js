import { createTopBar } from "./topBar.js";
import { FILE_SYSTEM } from "../data/projectData.js";
import { openProjectWindow } from "./projectWindow.js";

export function openProjectsWindow() {

    if (document.getElementById("projects-window")) return;

    const projectsWindow = document.createElement("div");
    projectsWindow.className = "window big-window";
    projectsWindow.id = "projects-window";

    const topBar = createTopBar({ closable: true });
    projectsWindow.appendChild(topBar);

    const bottomContainer = document.createElement("div");
    bottomContainer.className = "bottom-container";

    const innerContainer = document.createElement("div");
    innerContainer.className = "inner-container";

    const leftInnerContainer = document.createElement("div");
    leftInnerContainer.className = "left-inner-container";

    const innerTopBar = document.createElement("div");
    innerTopBar.className = "inner-top-bar";

    const bottomInnerContainer = document.createElement("div");
    bottomInnerContainer.className = "bottom-inner-container";

    const leftCat = document.createElement("div");
    leftCat.className = "left-cat";

    const rightCat = document.createElement("div");
    rightCat.className = "right-cat";

    const files = document.createElement("div");
    files.className = "files";

    // ── file system ───────────────────────────────────────────
    const history = ["root"];

    function render(page) {
        files.innerHTML = "";

        const pageDiv = document.createElement("div");
        pageDiv.className = "files-page active";
        pageDiv.dataset.page = page;

        if (page !== "root") {
            const back = document.createElement("div");
            back.className = "arrow-back";
            back.innerHTML = "&#8592;";
            back.addEventListener("click", () => {
                history.pop();
                render(history[history.length - 1]);
            });
            pageDiv.appendChild(back);
            pageDiv.appendChild(document.createElement("div"));
            pageDiv.appendChild(document.createElement("div"));
        } else {
            pageDiv.appendChild(document.createElement("div"));
            pageDiv.appendChild(document.createElement("div"));
            pageDiv.appendChild(document.createElement("div"));
        }

        FILE_SYSTEM[page].forEach(item => {
            const fileDiv = document.createElement("div");
            fileDiv.className = "file-div";

            const fileIcon = document.createElement("div");
            fileIcon.className = "file";

            const label = document.createElement("p");
            label.textContent = item.name;

            fileDiv.append(fileIcon, label);

            if (item.type === "folder") {
                fileDiv.addEventListener("click", () => {
                    history.push(item.target);
                    render(item.target);
                });
            }

            if (item.type === "file") {
                fileDiv.addEventListener("click", () => {
                    openProjectWindow(item.id);
                });
            }

            pageDiv.appendChild(fileDiv);
        });

        files.appendChild(pageDiv);
    }

    render("root");

    // ── assemble (identical structure to original) ────────────
    bottomInnerContainer.append(leftCat, files, rightCat);
    leftInnerContainer.append(innerTopBar, bottomInnerContainer);
    innerContainer.appendChild(leftInnerContainer);
    bottomContainer.appendChild(innerContainer);
    projectsWindow.appendChild(bottomContainer);

    document.body.appendChild(projectsWindow);
}