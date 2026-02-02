
let activeWindow = null;
let offsetX = 0;
let offsetY = 0;
let topZ = 10;


//create window on clicking file
function createWindow() {
    const win = document.createElement("div");
    win.className = "window";
    win.style.width = "200px";
    win.style.height = "150px";

    // mostly centered + random offset
    const centerX = window.innerWidth / 2 - 100;
    const centerY = window.innerHeight / 2 - 75;

    win.style.left = centerX + (Math.random() * 80 - 40) + "px";
    win.style.top = centerY + (Math.random() * 80 - 40) + "px";

    win.style.zIndex = ++topZ;

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
    <div class="bottom-container"></div>
  `;

    document.body.appendChild(win);
}

document.querySelectorAll(".file").forEach(file => {
    file.addEventListener("click", () => {
        createWindow();
    });
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("x-div") || e.target.classList.contains("x-icon")) {
        const win = e.target.closest(".window");
        win.remove();
    };
});


//move windows around 
document.addEventListener("mousedown", (e) => {
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

document.addEventListener("mousemove", (e) => {
    if (!activeWindow) return;

    activeWindow.style.left = e.clientX - offsetX + "px";
    activeWindow.style.top = e.clientY - offsetY + "px";
});

document.addEventListener("mouseup", () => {
    if (!activeWindow) return;
    activeWindow.querySelector(".top-bar").style.cursor = "grab";
    activeWindow = null;
});

//bring to front on click
document.addEventListener("mousedown", (e) => {
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

