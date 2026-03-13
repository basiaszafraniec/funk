import { createTopBar } from "./topBar.js";

export function openAudioPlayerWindow() {

    const player = document.createElement("div");
    player.className = "music-player window";

    const topBar = createTopBar({
        closable: true
    });


    const body = document.createElement("div");
    body.className = "player-body";

    const title = document.createElement("p");
    title.className = "music-title";
    title.textContent = "crazy horse";

    const timeWrapper = document.createElement("div");

    const currentTime = document.createElement("span");
    currentTime.className = "music-time";
    currentTime.textContent = "0:00 /";

    const duration = document.createElement("span");
    duration.className = "music-time";
    duration.textContent = "0:00";

    timeWrapper.append(currentTime, duration);

    const progress = document.createElement("input");
    progress.id = "progress";
    progress.type = "range";
    progress.value = 0;
    progress.min = 0;
    progress.max = 100;

    const buttons = document.createElement("div");
    buttons.className = "music-buttons";

    const muteBtn = document.createElement("button");
    const muteImg = document.createElement("img");
    muteBtn.id = "mute";
    muteImg.src = "assets/sound-icon.png";
    muteBtn.appendChild(muteImg);

    const playBtn = document.createElement("button");
    playBtn.id = "play";
    playBtn.textContent = "▶";

    const heartBtn = document.createElement("button");
    const heartImg = document.createElement("img");
    heartBtn.id = "heart";
    heartImg.src = "assets/heart-icon.png";
    heartBtn.appendChild(heartImg);

    buttons.append(muteBtn, playBtn, heartBtn);

    const audio = document.createElement("audio");
    audio.src = "assets/music/BeepBox-Song.mp3";
    audio.preload = "metadata";

    body.append(title, timeWrapper, progress, buttons);
    player.append(topBar, body, audio);


    const calculateTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    audio.addEventListener("loadedmetadata", () => {
        duration.textContent = calculateTime(audio.duration);
    });

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
        currentTime.textContent = calculateTime(audio.currentTime) + " /";
    });

    progress.addEventListener("input", () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });

    muteBtn.addEventListener("click", () => {
        audio.muted = !audio.muted;
        muteImg.src = audio.muted
            ? "assets/sound-icon-crossed.png"
            : "assets/sound-icon.png";
    });

    heartBtn.addEventListener("click", () => {
        heartImg.src = "assets/heart-icon-clicked.png";
        player.classList.add("shake");

        setTimeout(() => {
            player.classList.remove("shake");
            heartImg.src = "assets/heart-icon.png";
        }, 500);
    });

    document.body.appendChild(player);
}