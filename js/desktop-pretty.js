export function initDesktopPretty() {
    spawnPresetDoodles();
    initSkyCanvas();
}

// ── PRESET DOODLES ────────────────────────────────────────────
const D = "#430396", P = "#f891e9", W = "#fffcee", V = "#c4a0f5", B = "#a5e0ff", Y = "#fff6a3", K = "#ff5bec", S = "#ffa5e0", M = "#96ffd8", _ = null;

const PRESET_DOODLES = [
    {
        x: "78%", y: "12%", rotate: "-3deg",
        pixels: [
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _, _, V, V, V, V, V, V, _, _],
            [_, _, _, _, _, _, _, _, _, _, _, V, B, B, B, B, B, V, V, _],
            [_, _, _, _, _, _, _, _, _, _, _, V, B, B, B, B, B, V, V, _],
            [_, _, _, _, D, D, _, _, _, _, _, V, B, M, B, M, B, V, V, _],
            [_, _, _, D, V, D, D, D, _, _, _, V, B, B, B, B, B, V, V, _],
            [_, _, _, D, D, V, D, D, D, _, _, V, B, B, B, B, B, V, V, _],
            [_, D, D, D, D, D, Y, D, D, _, _, V, B, M, B, M, B, V, V, _],
            [D, V, D, D, D, Y, Y, Y, D, _, _, V, B, B, M, B, B, V, V, _],
            [D, D, V, D, D, Y, Y, Y, _, _, _, V, B, B, B, B, B, V, V, _],
            [D, D, D, V, D, Y, Y, Y, _, _, _, _, V, V, V, V, V, V, _, _],
            [_, D, D, D, _, Y, _, _, _, _, _, _, _, _, _, V, _, _, _, _],
            [_, _, _, _, S, S, S, S, _, _, _, _, _, V, V, V, V, _, _, _],
            [_, _, _, S, S, S, S, S, S, S, Y, Y, Y, D, D, D, D, D, D, D],
            [_, _, D, D, D, S, S, S, S, S, Y, Y, Y, D, D, D, D, D, D, D],
            [_, D, D, D, D, D, S, S, S, S, D, V, V, V, V, D, D, D, D, D],
            [_, D, D, D, D, D, S, S, S, _, D, D, D, D, D, D, D, D, D, D],
            [_, D, D, D, D, D, S, S, S, _, D, _, _, _, _, _, _, _, _, D],
        ]
    },
    {
        x: "5%", y: "20%", rotate: "2deg",
        pixels: [
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, S, S, S, S, S, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, S, S, S, M, M, M, S, S, S, _, _, _, _, _],
            [_, _, _, _, _, S, S, M, M, M, M, M, M, M, S, S, _, _, _, _],
            [_, _, _, _, S, S, M, M, M, V, V, V, M, M, M, S, S, S, _, _],
            [_, _, _, S, S, M, M, M, V, V, V, V, V, M, M, M, S, S, S, _],
            [_, _, S, S, M, M, V, V, V, Y, Y, Y, V, V, V, M, M, S, S, _],
            [_, _, S, S, M, M, V, V, Y, Y, Y, Y, Y, V, V, M, M, S, S, S],
            [_, S, S, M, M, V, V, Y, Y, _, _, _, Y, Y, V, V, M, M, S, S],
            [_, S, S, M, M, V, V, Y, Y, _, _, _, Y, Y, V, V, M, M, S, S],
            [S, S, M, M, V, V, Y, Y, _, _, _, _, _, Y, Y, V, V, M, M, S],
            [S, S, M, M, V, V, Y, Y, _, _, _, _, _, Y, Y, V, V, M, M, S],
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
        ]
    },
    {
        x: "32%", y: "75%", rotate: "-2deg",
        pixels: [
            [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _, _, D, D, D, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, D, D, S, S, S, D, D, _, _, _, _],
            [_, _, _, _, _, _, _, _, D, Y, S, S, S, S, Y, S, D, _, _, _],
            [_, _, _, _, _, _, _, D, Y, S, Y, S, S, S, S, Y, S, D, _, _],
            [_, _, _, _, _, _, _, D, S, Y, S, S, S, S, S, S, K, D, _, _],
            [_, _, _, _, _, _, D, M, S, S, S, D, S, S, S, S, D, K, D, _],
            [_, _, _, _, _, _, D, M, M, S, S, D, S, S, S, S, D, S, D, _],
            [_, _, _, _, _, _, D, M, S, S, S, D, S, S, D, S, D, S, D, _],
            [_, _, _, _, _, _, D, S, S, S, S, V, S, S, D, S, V, S, D, _],
            [_, _, _, _, _, D, S, S, S, S, S, S, S, S, V, S, S, D, _, _],
            [_, _, _, _, _, D, S, K, D, D, B, S, S, S, S, S, S, B, D, _],
            [_, _, _, _, _, D, K, K, K, S, D, S, S, B, S, B, S, S, D, _],
            [_, _, _, _, D, S, S, K, S, S, D, S, B, B, B, B, B, S, D, _],
            [_, _, _, _, D, S, S, S, S, D, V, S, S, B, B, B, S, S, D, _],
            [_, _, _, D, M, D, D, D, D, V, S, S, S, S, B, S, S, S, D, _],
            [_, D, D, V, V, V, V, V, V, S, S, S, S, S, S, S, M, D, _, _],
            [_, _, D, D, D, D, D, D, S, S, S, S, S, S, S, K, K, D, _, _],
            [_, _, _, _, _, _, _, D, D, V, D, D, D, D, V, D, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, D, _, _, _, _, D, _, _, _, _, _],
        ]
    },
];

function spawnPresetDoodles() {
    const desktop = document.querySelector(".desktop");
    if (!desktop) return;

    PRESET_DOODLES.forEach(({ x, y, rotate, pixels }) => {
        const SCALE = 5;
        const COLS = pixels[0].length;
        const ROWS = pixels.length;

        const cv = document.createElement("canvas");
        cv.width = COLS * SCALE;
        cv.height = ROWS * SCALE;
        const ctx = cv.getContext("2d");

        ctx.fillStyle = W;
        ctx.fillRect(0, 0, cv.width, cv.height);

        pixels.forEach((row, r) => {
            row.forEach((color, c) => {
                if (!color) return;
                ctx.fillStyle = color;
                ctx.fillRect(c * SCALE, r * SCALE, SCALE, SCALE);
            });
        });

        const img = document.createElement("img");
        img.src = cv.toDataURL();
        img.draggable = false;

        const close = document.createElement("div");
        close.className = "desktop-doodle-close";
        close.textContent = "×";

        const wrapper = document.createElement("div");
        wrapper.className = "desktop-doodle";
        wrapper.style.left = x;
        wrapper.style.top = y;
        wrapper.style.transform = `rotate(${rotate})`;

        close.addEventListener("click", e => { e.stopPropagation(); wrapper.remove(); });

        wrapper.append(img, close);
        desktop.appendChild(wrapper);

        // pop-in
        wrapper.classList.add("doodle-pop");
        setTimeout(() => wrapper.classList.remove("doodle-pop"), 400);
    });
}


// ── SKY CANVAS ────────────────────────────────────────────────
function initSkyCanvas() {
    const cv = document.createElement("canvas");
    cv.className = "sky-canvas";
    document.body.appendChild(cv);

    function resize() { cv.width = window.innerWidth; cv.height = window.innerHeight; }
    resize();
    window.addEventListener("resize", resize);

    const ctx = cv.getContext("2d");
    const SZ = 6;

    const CLOUD_A = [
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    ];
    const CLOUD_B = [
        [0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 0],
    ];
    const CLOUD_C = [
        [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    ];

    const clouds = [
        { shape: CLOUD_A, x: 0.05, y: 0.06, speed: 0.18, alpha: 0.92 },
        { shape: CLOUD_B, x: 0.38, y: 0.14, speed: 0.11, alpha: 0.72 },
        { shape: CLOUD_C, x: 0.62, y: 0.07, speed: 0.15, alpha: 0.85 },
        { shape: CLOUD_B, x: 0.82, y: 0.20, speed: 0.09, alpha: 0.60 },
        { shape: CLOUD_A, x: 1.10, y: 0.28, speed: 0.13, alpha: 0.70 },
    ];

    let cloudsInit = false;
    function initClouds() {
        clouds.forEach(c => { c.px = c.x * cv.width; c.py = c.y * cv.height; });
        cloudsInit = true;
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
        { x: -30, y: 0.18, speed: 0.55, flap: 0, flapDir: 1, active: false, next: 8000 },
        { x: -60, y: 0.22, speed: 0.45, flap: 3, flapDir: 1, active: false, next: 20000 },
        { x: -40, y: 0.13, speed: 0.60, flap: 6, flapDir: -1, active: false, next: 35000 },
    ];

    birds.forEach(b => setTimeout(() => activateBird(b), b.next));

    function activateBird(b) {
        b.x = -30;
        b.py = b.y * cv.height + (Math.random() * 40 - 20);
        b.active = true;
    }

    function drawBird(b) {
        const wing = Math.sin(b.flap * 0.35) * 2;
        ctx.fillStyle = "#430396";
        ctx.fillRect(b.x - 6, b.py + wing, 3, 2);
        ctx.fillRect(b.x - 3, b.py + wing * 0.5, 3, 2);
        ctx.fillRect(b.x, b.py, 2, 2);
        ctx.fillRect(b.x + 2, b.py + wing * 0.5, 3, 2);
        ctx.fillRect(b.x + 5, b.py + wing, 3, 2);
    }

    function tick() {
        if (!cloudsInit) initClouds();
        ctx.clearRect(0, 0, cv.width, cv.height);

        clouds.forEach(c => {
            c.px += c.speed;
            const cw = c.shape[0].length * SZ;
            if (c.px > cv.width + cw) c.px = -cw;
            drawCloud(c.shape, Math.round(c.px), Math.round(c.py), c.alpha);
        });

        birds.forEach(b => {
            if (!b.active) return;
            b.x += b.speed;
            b.flap += b.flapDir;
            if (Math.abs(b.flap) > 8) b.flapDir *= -1;
            drawBird(b);
            if (b.x > cv.width + 30) {
                b.active = false;
                setTimeout(() => activateBird(b), 30000 + Math.random() * 60000);
            }
        });

        requestAnimationFrame(tick);
    }
    tick();
}