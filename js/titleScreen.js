export function initTitleScreen(onComplete) {

    const screen = document.createElement("div");
    screen.id = "title-screen";

    // ── ticker ────────────────────────────────────────────────
    const ticker = document.createElement("div");
    ticker.className = "scrolling-bar title-ticker";
    ticker.innerHTML = `<ul>
        <li>basia szafraniec</li><li>developer</li><li>designer</li><li>portfolio 2025</li>
        <li>basia szafraniec</li><li>developer</li><li>designer</li><li>portfolio 2025</li>
    </ul>`;

    // ── sky canvas ────────────────────────────────────────────
    const skyCanvas = document.createElement("canvas");
    skyCanvas.className = "title-sky";

    // ── footer ────────────────────────────────────────────────
    const footer = document.createElement("div");
    footer.className = "title-footer";

    // ── STATE 1 ───────────────────────────────────────────────
    const s1 = document.createElement("div");
    s1.className = "title-s1";

    // swap src for your actual png when ready
    const icon = document.createElement("img");
    icon.src = "assets/comp.png";
    icon.className = "title-icon";
    icon.draggable = false;

    const name = document.createElement("div");
    name.className = "title-name";
    name.textContent = "basia.szafraniec";

    const sub = document.createElement("div");
    sub.className = "title-sub";
    sub.textContent = "developer · designer · creator";

    // button + bubbles
    const btnWrap = document.createElement("div");
    btnWrap.className = "title-btn-wrap";

    const bubbleCanvas = document.createElement("canvas");
    bubbleCanvas.className = "title-bubbles";

    const btn = document.createElement("div");
    btn.className = "button title-btn";
    btn.innerHTML = "<p>enter ↗</p>";

    btnWrap.append(bubbleCanvas, btn);
    s1.append(name, sub, icon, btnWrap);

    // ── STATE 2 ───────────────────────────────────────────────
    const s2 = document.createElement("div");
    s2.className = "title-s2 hidden";

    const loadIcon = document.createElement("img");
    loadIcon.src = "assets/comp.png";
    loadIcon.className = "title-icon";
    loadIcon.draggable = false;

    const loadName = document.createElement("div");
    loadName.className = "title-name";
    loadName.textContent = "basia.dev";

    const loadSub = document.createElement("div");
    loadSub.className = "title-sub";
    loadSub.textContent = "loading...";

    const track = document.createElement("div");
    track.className = "title-track";

    const BLOCKS = 16;
    const blocks = [];
    for (let i = 0; i < BLOCKS; i++) {
        const b = document.createElement("div");
        b.className = "title-block";
        track.appendChild(b);
        blocks.push(b);
    }

    const loadMsg = document.createElement("div");
    loadMsg.className = "title-msg";
    loadMsg.textContent = "preparing workspace";

    s2.append(loadIcon, loadName, loadSub, track, loadMsg);

    // ── assemble ──────────────────────────────────────────────
    screen.append(ticker, skyCanvas, s1, s2, footer);
    document.body.appendChild(screen);

    // ── animations ────────────────────────────────────────────
    initTitleSky(skyCanvas);
    initTitleBubbles(bubbleCanvas);

    // ── enter button ──────────────────────────────────────────
    document.addEventListener("keydown", onEnter);
    btn.addEventListener("click", onEnter);
    function onEnter(){
        s1.classList.add("hidden");
        s2.classList.remove("hidden");

        const MSGS = [
            "preparing workspace",
            "loading projects",
            "setting up desktop",
            "almost ready...",
            "done!"
        ];
        let i = 0;
        const interval = setInterval(() => {
            if (i < BLOCKS) {
                blocks[i].classList.add("on");
                i++;
                loadMsg.textContent = MSGS[Math.min(
                    Math.floor(i / BLOCKS * (MSGS.length - 1)),
                    MSGS.length - 1
                )];
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    screen.classList.add("title-out");
                    setTimeout(() => {
                        screen.remove();
                        if (onComplete) onComplete();
                    }, 500);
                }, 300);
            }
        }, 100);
    };
}

// ── sky: clouds + birds ───────────────────────────────────────
function initTitleSky(cv) {
    const ctx = cv.getContext("2d");
    function resize() { cv.width = window.innerWidth; cv.height = window.innerHeight; }
    resize();
    window.addEventListener("resize", resize);

    const SZ = 6;
    const CLOUD_A = [[0,0,0,0,1,1,1,1,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,0,0,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,1,1,1,1,0]];
    const CLOUD_B = [[0,0,1,1,1,0,0,0],[0,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,0]];
    const CLOUD_C = [[0,0,0,1,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,1,0]];

    const clouds = [
        { shape: CLOUD_A, x: 0.05, y: 0.06, speed: 0.18, alpha: 0.92 },
        { shape: CLOUD_B, x: 0.38, y: 0.14, speed: 0.11, alpha: 0.72 },
        { shape: CLOUD_C, x: 0.62, y: 0.07, speed: 0.15, alpha: 0.85 },
        { shape: CLOUD_B, x: 0.82, y: 0.20, speed: 0.09, alpha: 0.60 },
        { shape: CLOUD_A, x: 1.10, y: 0.28, speed: 0.13, alpha: 0.70 },
    ];
    let init = false;

    function initClouds() {
        clouds.forEach(c => { c.px = c.x * cv.width; c.py = c.y * cv.height; });
        init = true;
    }

    function drawCloud(shape, cx, cy, alpha) {
        ctx.globalAlpha = alpha;
        shape.forEach((row, r) => row.forEach((cell, c) => {
            if (!cell) return;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(cx + c * SZ, cy + r * SZ, SZ, SZ);
        }));
        ctx.globalAlpha = 1;
    }

    const birds = [
        { x: -30, py: 0, y: 0.18, speed: 0.55, flap: 0,  flapDir: 1,  active: false },
        { x: -60, py: 0, y: 0.22, speed: 0.45, flap: 3,  flapDir: 1,  active: false },
        { x: -40, py: 0, y: 0.13, speed: 0.60, flap: 6,  flapDir: -1, active: false },
    ];

    function activateBird(b) { b.x = -30; b.py = b.y * cv.height + (Math.random() * 30 - 15); b.active = true; }
    setTimeout(() => activateBird(birds[0]), 4000);
    setTimeout(() => activateBird(birds[1]), 11000);
    setTimeout(() => activateBird(birds[2]), 20000);

    function drawBird(b) {
        const wing = Math.sin(b.flap * 0.35) * 2;
        ctx.fillStyle = "#430396";
        ctx.fillRect(b.x - 6, b.py + wing,       3, 2);
        ctx.fillRect(b.x - 3, b.py + wing * 0.5, 3, 2);
        ctx.fillRect(b.x,     b.py,               2, 2);
        ctx.fillRect(b.x + 2, b.py + wing * 0.5, 3, 2);
        ctx.fillRect(b.x + 5, b.py + wing,       3, 2);
    }

    function tick() {
        if (!init) initClouds();
        ctx.clearRect(0, 0, cv.width, cv.height);
        clouds.forEach(c => {
            c.px += c.speed;
            const cw = c.shape[0].length * SZ;
            if (c.px > cv.width + cw) c.px = -cw;
            drawCloud(c.shape, Math.round(c.px), Math.round(c.py), c.alpha);
        });
        birds.forEach(b => {
            if (!b.active) return;
            b.x += b.speed; b.flap += b.flapDir;
            if (Math.abs(b.flap) > 8) b.flapDir *= -1;
            drawBird(b);
            if (b.x > cv.width + 30) {
                b.active = false;
                setTimeout(() => activateBird(b), 25000 + Math.random() * 35000);
            }
        });
        requestAnimationFrame(tick);
    }
    tick();
}

// ── pixel bubbles above button ────────────────────────────────
function initTitleBubbles(cv) {
    cv.style.position = "absolute";
    cv.style.bottom   = "100%";
    cv.style.left     = "0";
    cv.style.width    = "100%";
    cv.style.height   = "50px";
    cv.style.pointerEvents = "none";
    cv.width  = 160;
    cv.height = 50;

    const ctx = cv.getContext("2d");
    const COLS = ["#430396", "#f891e9", "#c4a0f5", "#fff6a3"];
    const particles = [];

    function spawn() {
        if (particles.length > 10) return;
        particles.push({
            x: 6 + Math.random() * (cv.width - 12),
            y: cv.height,
            vy: 0.5 + Math.random() * 0.6,
            life: 0,
            max: 35 + Math.random() * 25,
            color: COLS[Math.floor(Math.random() * COLS.length)],
            size: 3
        });
    }

    function draw() {
        ctx.clearRect(0, 0, cv.width, cv.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.y -= p.vy; p.life++;
            if (p.life > p.max) { particles.splice(i, 1); continue; }
            ctx.globalAlpha = 1 - p.life / p.max;
            ctx.fillStyle = p.color;
            ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
            ctx.globalAlpha = 1;
        }
        requestAnimationFrame(draw);
    }
    setInterval(spawn, 250);
    draw();
}