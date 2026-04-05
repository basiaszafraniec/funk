import { createTopBar } from "./topBar.js";
import { nextZ } from "../zIndex.js";

const SCALE = 8;
const COLS  = 20;
const ROWS  = 20;
const COLORS = ["#430396","#fffcee","#c4a0f5","#a5e0ff","#fff6a3","#ff5bec","#ffa5e0","#96ffd8"];


export function openDoodleWindow() {
    if (document.getElementById("doodle-window")) {
        document.getElementById("doodle-window").style.zIndex = nextZ();
        return;
    }

    const win = document.createElement("div");
    win.className = "window doodle-window";
    win.id = "doodle-window";
    win.style.left = window.innerWidth  / 2 - 130 + (Math.random() * 60 - 30) + "px";
    win.style.top  = window.innerHeight / 2 - 160 + (Math.random() * 60 - 30) + "px";
    win.style.zIndex = nextZ();

    const topBar = createTopBar({ title: "doodle", closable: true });
    win.appendChild(topBar);

    const body = document.createElement("div");
    body.className = "doodle-body";

    // ── canvas ────────────────────────────────────────────────
    const canvas = document.createElement("canvas");
    canvas.className = "doodle-canvas";
    canvas.width  = COLS * SCALE;
    canvas.height = ROWS * SCALE;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fffcee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ── colour swatches ───────────────────────────────────────
    const swatchRow = document.createElement("div");
    swatchRow.className = "doodle-swatches";

    let curColor = COLORS[0];
    let mode = "draw";
    let painting = false;

    COLORS.forEach((c, i) => {
        const sw = document.createElement("div");
        sw.className = "doodle-swatch" + (i === 0 ? " sel" : "");
        sw.style.background = c;
        sw.addEventListener("click", () => {
            swatchRow.querySelectorAll(".doodle-swatch").forEach(s => s.classList.remove("sel"));
            sw.classList.add("sel");
            curColor = c;
            mode = "draw";
            setMode("draw");
        });
        swatchRow.appendChild(sw);
    });

    // ── tool buttons ──────────────────────────────────────────
    const tools = document.createElement("div");
    tools.className = "doodle-tools";

    const btnDraw  = makeBtn("draw",  true);
    const btnErase = makeBtn("erase", false);
    const btnClear = makeBtn("clear", false);
    const btnSave  = makeBtn("↗ add to desktop", false);
    btnSave.classList.add("doodle-btn-save");

    function setMode(m) {
        mode = m;
        btnDraw.classList.toggle("sel",  m === "draw");
        btnErase.classList.toggle("sel", m === "erase");
    }

    btnDraw.addEventListener("click",  () => setMode("draw"));
    btnErase.addEventListener("click", () => setMode("erase"));
    btnClear.addEventListener("click", () => {
        ctx.fillStyle = "#fffcee";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    btnSave.addEventListener("click", () => addToDesktop(canvas));

    tools.append(btnDraw, btnErase, btnClear, btnSave);

    // ── drawing logic ─────────────────────────────────────────
    function getPixel(e) {
        const r = canvas.getBoundingClientRect();
        return {
            x: Math.floor((e.clientX - r.left)  / (r.width  / COLS)),
            y: Math.floor((e.clientY - r.top)   / (r.height / ROWS))
        };
    }

    function paint(e) {
        const { x, y } = getPixel(e);
        if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return;
        ctx.fillStyle = mode === "erase" ? "#fffcee" : curColor;
        ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
    }

    canvas.addEventListener("pointerdown", e => { painting = true; paint(e); canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener("pointermove", e => { if (painting) paint(e); });
    canvas.addEventListener("pointerup",   () => { painting = false; });

    body.append(canvas, swatchRow, tools);
    win.appendChild(body);
    document.body.appendChild(win);
}

// ── add doodle to desktop ─────────────────────────────────────
function addToDesktop(sourceCanvas) {
    const desktop = document.querySelector(".desktop");
    if (!desktop) return;

    // find a spot that doesn't overlap too much
    const x = 80  + Math.random() * (window.innerWidth  - 280);
    const y = 100 + Math.random() * (window.innerHeight - 300);

    const wrapper = document.createElement("div");
    wrapper.className = "desktop-doodle";
    wrapper.style.left = x + "px";
    wrapper.style.top  = y + "px";

    // copy the canvas pixels into a small img
    const img = document.createElement("img");
    img.src = sourceCanvas.toDataURL();
    img.draggable = false;

    // little close x
    const close = document.createElement("div");
    close.className = "desktop-doodle-close";
    close.textContent = "×";
    close.addEventListener("click", e => { e.stopPropagation(); wrapper.remove(); });

    // pop animation
    wrapper.classList.add("doodle-pop");
    setTimeout(() => wrapper.classList.remove("doodle-pop"), 400);

    wrapper.append(img, close);
    desktop.appendChild(wrapper);
}

function makeBtn(label, active) {
    const btn = document.createElement("div");
    btn.className = "doodle-btn" + (active ? " sel" : "");
    btn.textContent = label;
    return btn;
}