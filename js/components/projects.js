import { createTopBar } from "./topBar.js";
import { createPopupWindow } from "./popupWindow.js";

export function openProjectsWindow() {

    // layout
    const projectsWindow = document.createElement("div");
    projectsWindow.className = "window big-window";
    projectsWindow.id = "projects-window";

    const topBar = createTopBar({
        closable: true
    });
    projectsWindow.appendChild(topBar);

    const bottomContainer = document.createElement("div");
    bottomContainer.className = "bottom-container";

    // const scrollingBar = document.createElement("div");
    // scrollingBar.className = "scrolling-bar";

    // scrollingBar.innerHTML = `
    //         <ul>
    //             <li>CRAZYHORSE</li>
    //             <li>SAUSYMEATBALL</li>
    //             <li>DANCINGMONKEY</li>
    //             <li>PANDAFART</li>

    //             <li>CRAZYHORSE</li>
    //             <li>SAUSYMEATBALL</li>
    //             <li>DANCINGMONKEY</li>
    //             <li>PANDAFART</li>

    //         </ul>`;
    const innerContainer = document.createElement("div");
    innerContainer.className = "inner-container";

    const leftInnerContainer = document.createElement("div");
    leftInnerContainer.className = "left-inner-container";

    const innerTopBar = document.createElement("div");
    innerTopBar.className = "inner-top-bar";

    const bottomInnerContainer = document.createElement("div");
    bottomInnerContainer.className = "bottom-inner-container";

    const leftCat = document.createElement("div");
    leftCat.classList = "left-cat";

    const rightCat = document.createElement("div");
    rightCat.classList = "right-cat";

    const files = document.createElement("div");
    files.classList = "files";
    // file system
    const FILE_SYSTEM = {
        root: [
            { name: "js", type: "folder", target: "js" },
            { name: "python", type: "folder", target: "python" },
            { name: "blender", type: "file", id: "blender" },
            { name: "figma", type: "file", id: "figma" },
            { name: "memes", type: "file", id: "meme" },
            { name: "art", type: "file", id: "art" }
        ],
        js: [
            { name: "suwmania", type: "file", id: "suwmania" },
            { name: "weather", type: "file", id: "weather" }
        ],
        python: [
            { name: "cube", type: "file", id: "cube" },
            { name: "stars-game", type: "file", id: "stars-game" }
        ]
    };
    function initFileSystem(container) {

        let currentPage = "root";
        const history = ["root"];

        function render(page) {
            container.innerHTML = "";

            const pageDiv = document.createElement("div");
            pageDiv.className = "files-page active";
            pageDiv.dataset.page = page;

            // Back arrow if not root
            if (page !== "root") {
                const back = document.createElement("div");
                back.className = "arrow-back";
                back.innerHTML = "&#8592;";

                back.addEventListener("click", () => {
                    history.pop();
                    currentPage = history[history.length - 1];
                    render(currentPage);
                });

                pageDiv.appendChild(back);

                // empty spacer (because you had that extra <div></div>)
                pageDiv.appendChild(document.createElement("div"));
                pageDiv.appendChild(document.createElement("div"));
            } else {
                // root had two empty divs in your layout
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
                    fileIcon.dataset.open = item.target;

                    fileDiv.addEventListener("click", () => {
                        history.push(item.target);
                        currentPage = item.target;
                        render(currentPage);
                    });
                }

                if (item.type === "file") {
                    fileIcon.id = item.id;

                    fileDiv.addEventListener("click", () => {
                        createPopupWindow(item.id);
                    });
                }

                pageDiv.appendChild(fileDiv);
            });

            container.appendChild(pageDiv);
        }

        render(currentPage);
    }
    initFileSystem(files);


    bottomInnerContainer.append(leftCat, files, rightCat);
    leftInnerContainer.append(innerTopBar, bottomInnerContainer);
    innerContainer.appendChild(leftInnerContainer);

    bottomContainer.append
        (
            // scrollingBar, 
            innerContainer);

    projectsWindow.appendChild(bottomContainer);

    document.body.appendChild(projectsWindow);
}