export function createMainWindow() {
    const win = document.createElement("div");
    win.className = "window";
    win.id = "main-window";

    win.style.width = "70%";
    win.style.maxWidth = "800px";
    win.style.maxHeight = "500px";
    win.style.height = "70%";
    win.style.left = "30px";
    win.style.top = "30px";
    win.style.zIndex = 1;

    win.innerHTML = `
        <div class="top-bar">
            <div class="left-buttons">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="right-buttons">
                <div class="white-bar"></div>
                <div class="x-div">
                    <div class="x-icon"></div>
                </div>
            </div>
        </div>
        <div class="bottom-container">
            <div class="scrolling-bar">
                <ul>
                    <li>CRAZYHORSE</li>
                    <li>SAUSYMEATBALL</li>
                    <li>DANCINGMONKEY</li>
                    <li>PANDAFART</li>

                    <li>CRAZYHORSE</li>
                    <li>SAUSYMEATBALL</li>
                    <li>DANCINGMONKEY</li>
                    <li>PANDAFART</li>

                </ul>
            </div>
            <div class="inner-container">
                <div class="left-inner-container">
                    <div class="inner-top-bar">
                        <div class="color-btn">
                            <input type="color" id="color-picker" value="#ff5bec">
                        </div>
                        <div class="border-btn">
                            <button onclick="explode()" class="button">
                                <p>explode</p>
                            </button>
                        </div>
                        <div class="stroke-btn">
                            <p>HELLO</p>
                        </div>
                    </div>
                    <div class="bottom-inner-container">
                        <div class="left-cat">
                            <div>about me:</div>
                            <img src="assets/cat1.png" alt="cat icon" id="cat">
                        </div>
                        <div class="right-cat">
                            <div></div>
                            <div id="word" class="default">
                                <span>F</span><span>A</span><span>R</span><span>T</span>
                            </div>

                        </div>
                        <div class="files">
                            <div class="files-page active" data-page="root">
                                <div></div>
                                <div></div>
                                <div class="file-div">
                                    <div class="file" data-open="js"></div>
                                    <p>js</p>
                                </div>
                                <div class="file-div">
                                    <div class="file" data-open="python"></div>
                                    <p>python</p>
                                </div>
                                <div class="file-div">
                                    <div class="file" id="blender"></div>
                                    <p>blender</p>
                                </div>
                                <div class="file-div">
                                    <div class="file"></div>
                                    <p>figma</p>
                                </div>
                                <div class="file-div">
                                    <div class="file" id="meme"></div>
                                    <p>memes</p>
                                </div>
                                <div class="file-div">
                                    <div class="file"></div>
                                    <p>art</p>
                                </div>
                            </div>
                            <div class="files-page" data-page="js">
                                <div class="arrow-back">
                                    &#8592;
                                </div>
                                <div></div>
                                <div class="file-div">
                                    <div class="file" id="suwmania"></div>
                                    <p>suwmania</p>
                                </div>
                                <div class="file-div">
                                    <div class="file"></div>
                                    <p>weather</p>
                                </div>
                            </div>
                            <div class="files-page" data-page="python">
                                <div class="arrow-back">
                                    &#8592;
                                </div>
                                <div></div>
                                <div class="file-div">
                                    <div class="file"></div>
                                    <p>cube</p>
                                </div>
                                <div class="file-div">
                                    <div class="file"></div>
                                    <p>stars-game</p>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(win);
    initMainWindowLogic(win);
    function initMainWindowLogic(win) {
        function explode() {
            const word = document.getElementById("word");
            word.classList.remove("default");
            word.classList.add("exploding");
            setTimeout(() => {
                word.classList.remove("exploding");
                word.classList.add("default");
            }, 1600);
        }
        //create window on clicking file
        function createWindow(type = "Empty File") {
            const win = document.createElement("div");
            win.className = "window";
            win.style.width = "200px";
            win.style.height = "150px";

            // mostly centered + random offset
            const centerX = window.innerWidth / 2 - 200;
            const centerY = window.innerHeight / 2 - 175;

            win.style.left = centerX + (Math.random() * 80 - 40) + "px";
            win.style.top = centerY + (Math.random() * 80 - 40) + "px";

            win.style.zIndex = ++topZ;

            let content = `<p>${type}</p>`;
            let containerClass = "content-container";
            if (type === "meme") {
                let memeNr = Math.floor(Math.random() * 16) + 1;
                content = `<img src="assets/memes/${memeNr}.jpg" alt="meme" class="meme-img"/>`;
                containerClass = "meme-container";
                win.classList.add("meme-window");
            }
            if (type === "suwmania") {
                content = `<iframe id="frame" src="https://host914956.xce.pl/basia/suwmania/B/" scrolling="no" ></iframe>`;
                containerClass = "suwmania-container";
                win.classList.add("suwmania-window");

            }


            win.innerHTML = `
             <div class="top-bar">
         <div class="left-buttons">
          <div></div><div></div><div></div>
         </div>
         <div class="right-buttons">
            <div class="white-bar"></div>
            <div class="x-div">
         <div  class="x-icon"></div>
         </div>
        </div>
        </div>
        <div class="${containerClass}">${content}</div>
        `;

            document.body.appendChild(win);
        }

        document.querySelectorAll(".file").forEach(file => {
            file.addEventListener("click", (e) => {
                type = e.target.id;
                if (file.dataset.open) return;
                createWindow(type);
            });
        });

        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("x-div") || e.target.classList.contains("x-icon")) {
                const win = e.target.closest(".window");
                win.remove();
            };
        });


        //color picker
        const colorPicker = document.getElementById("color-picker");
        const word = document.getElementById("word");


        colorPicker.addEventListener("input", (e) => {
            word.style.color = e.target.value;
        });

        //file tabs
        const pages = document.querySelectorAll(".files-page");
        const historyStack = ["root"];

        function showPage(page) {
            pages.forEach(p => { p.classList.remove("active"); });
            document.querySelector(`.files-page[data-page="${page}"]`).classList.add("active");
        }

        document.querySelectorAll(".file-div").forEach(fileDiv => {
            fileDiv.addEventListener("click", (e) => {
                const opener = e.target.closest("[data-open]");
                if (!opener) return;
                const pageToOpen = opener.dataset.open;
                historyStack.push(pageToOpen);
                showPage(pageToOpen);
            });
        });
        //arrow back 
        document.addEventListener("click", (e) => {
            if (!e.target.classList.contains("arrow-back")) return;

            historyStack.pop(); // remove current
            const previous = historyStack[historyStack.length - 1];
            showPage(previous);
        });

    }
}