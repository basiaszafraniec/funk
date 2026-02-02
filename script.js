
let activeWindow = null;
let offsetX = 0;
let offsetY = 0;
let topZ = 10;

const isMobile = /Mobi|Android/i.test(navigator.userAgent);


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
        <div class="x-icon"></div>
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


//move windows around 
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
    activeWindow = null;
});

//bring to front on click
document.addEventListener("pointerdown", (e) => {
    const win = e.target.closest(".window");
    if (win && win.id === "main-window") return;
    if (!win) return;

    win.style.zIndex = ++topZ;
});

//conlor picker
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
//aroow back 
document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("arrow-back")) return;

    historyStack.pop(); // remove current
    const previous = historyStack[historyStack.length - 1];
    showPage(previous);
});

