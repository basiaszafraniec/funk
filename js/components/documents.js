import { createTopBar } from "./topBar.js";
import { nextZ, bringToFront } from "../zIndex.js";


const DOCUMENTS = [
    { id: "cv",             name: "cv",             file: "assets/docs/BevisDiploma.pdf"             },
    { id: "recommendation", name: "recommendation", file: "assets/docs/recommendations.pdf" },
    { id: "english-test",   name: "english test",   file: "assets/docs/english-test.pdf"   },
];

let topZ = 40;

export function openDocumentsWindow() {
    if (document.getElementById("documents-window")) return;

    const win = document.createElement("div");
    win.className = "window docs-window";
    win.id = "documents-window";
    win.style.left = window.innerWidth  / 2 - 160 + (Math.random() * 60 - 30) + "px";
    win.style.top  = window.innerHeight / 2 - 160 + (Math.random() * 60 - 30) + "px";
    win.style.zIndex = nextZ();

    win.appendChild(createTopBar({ closable: true }));

    // ticker
    const ticker = document.createElement("div");
    ticker.className = "scrolling-bar docs-ticker";
    ticker.innerHTML = `<ul>
        <li>documents</li><li>cv</li><li>certificates</li><li>pdf</li>
        <li>documents</li><li>cv</li><li>certificates</li><li>pdf</li>
    </ul>`;

    // label
    const label = document.createElement("div");
    label.className = "proj-col-label";
    label.textContent = "files";

    // grid
    const grid = document.createElement("div");
    grid.className = "docs-grid";

    DOCUMENTS.forEach(doc => {
        const item = document.createElement("div");
        item.className = "file-div";

        const icon = document.createElement("div");
        icon.style.backgroundImage = "url('./assets/doc1.png')";
        icon.className = "file file--project";

        const name = document.createElement("p");
        name.textContent = doc.name;

        item.append(icon, name);
        item.addEventListener("click", () => openDocPopup(doc));
        grid.appendChild(item);
    });

    // bottom stripe
    const stripe = document.createElement("div");
    stripe.className = "docs-stripe";
    for (let i = 0; i < 16; i++) stripe.appendChild(document.createElement("div"));

    win.append(ticker, label, grid, stripe);
    document.body.appendChild(win);
}

// ── doc popup ─────────────────────────────────────────────────
function openDocPopup(doc) {
    const existingId = "doc-" + doc.id;
    if (document.getElementById(existingId)) {
        document.getElementById(existingId).style.zIndex = nextZ();
        return;
    }

    const win = document.createElement("div");
    win.className = "window doc-popup";
    win.id = existingId;
    win.style.left = window.innerWidth  / 2 - 150 + (Math.random() * 80 - 40) + "px";
    win.style.top  = window.innerHeight / 2 - 200 + (Math.random() * 80 - 40) + "px";
    win.style.zIndex = nextZ();

    win.appendChild(createTopBar({ title: doc.name, closable: true }));

    // pdf embed
    const embed = document.createElement("iframe");
    embed.className = "doc-pdf-frame";
    embed.src = doc.file;

    // footer
    const footer = document.createElement("div");
    footer.className = "doc-popup-footer";

    const name = document.createElement("div");
    name.className = "doc-popup-name";
    name.textContent = doc.name + ".pdf";

    const btns = document.createElement("div");
    btns.className = "doc-popup-btns";

    const openBtn = document.createElement("a");
    openBtn.className = "doc-btn";
    openBtn.textContent = "↗ open";
    openBtn.href = doc.file;
    openBtn.target = "_blank";
    openBtn.rel = "noopener";

    const dlBtn = document.createElement("a");
    dlBtn.className = "doc-btn doc-btn-dk";
    dlBtn.textContent = "↓ download";
    dlBtn.href = doc.file;
    dlBtn.download = doc.name + ".pdf";

    btns.append(openBtn, dlBtn);
    footer.append(name, btns);
    win.append(embed, footer);
    document.body.appendChild(win);
}