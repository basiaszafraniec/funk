
let activeWindow = null;
let offsetX = 0;
let offsetY = 0;
let topZ = 10;

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

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


//audio player
const player = document.getElementById("music-player");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const durationContainer = document.getElementById('music-duration');
const currentTimeContainer = document.getElementById('current-music-time');
const muteButton = document.getElementById('mute');
const heartIcon = document.getElementById('heart');

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () => {
    durationContainer.textContent = calculateTime(audio.duration);
}

if (audio.readyState > 0) {
    displayDuration();

} else {
    audio.addEventListener('loadedmetadata', () => {
        displayDuration();
    });
}



playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
});





audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTimeContainer.textContent = calculateTime(audio.currentTime);


});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
    currentTimeContainer.textContent = calculateTime(audio.currentTime);
});

muteButton.addEventListener("click", () => {
    muteButton.firstChild.src = audio.muted ? "assets/sound-icon.png" : "assets/sound-icon-crossed.png";
    audio.muted = !audio.muted;
});

heartIcon.addEventListener("click", () => {
    heartIcon.firstChild.src = "assets/heart-icon-clicked.png";
    player.classList.add("shake");
    setTimeout(() => {
        player.classList.remove("shake");
        heartIcon.firstChild.src = "assets/heart-icon.png";
    }, 500);

});