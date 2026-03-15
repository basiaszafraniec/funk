import { createTopBar } from "../components/topBar.js";
import { PROJECT_DATA } from "../data/projectData.js";

let topZ = 30;

export function openProjectWindow(id) {
    const project = PROJECT_DATA[id];
    if (!project) return;

    // Don't duplicate
    if (document.getElementById("project-" + id)) {
        document.getElementById("project-" + id).style.zIndex = ++topZ;
        return;
    }

    const win = document.createElement("div");
    win.className = "window project-window";
    win.id = "project-" + id;

    win.style.width = "480px";
    win.style.zIndex = ++topZ;
    win.style.left = window.innerWidth / 2 - 240 + (Math.random() * 60 - 30) + "px";
    win.style.top  = window.innerHeight / 2 - 200 + (Math.random() * 60 - 30) + "px";

    const topBar = createTopBar({ title: project.title, closable: true });

    // ── meta row: stack tags + learned tags ──────────────────
    const meta = document.createElement("div");
    meta.className = "project-meta";

    const stackGroup = document.createElement("div");
    stackGroup.className = "project-tag-group";
    stackGroup.innerHTML = `<span class="tag-label">stack</span>`;
    project.stack.forEach(s => {
        const tag = document.createElement("span");
        tag.className = "project-tag";
        tag.textContent = s;
        stackGroup.appendChild(tag);
    });

    const learnedGroup = document.createElement("div");
    learnedGroup.className = "project-tag-group";
    learnedGroup.innerHTML = `<span class="tag-label">learned</span>`;
    project.learned.forEach(l => {
        const tag = document.createElement("span");
        tag.className = "project-tag learned";
        tag.textContent = l;
        learnedGroup.appendChild(tag);
    });

    meta.append(stackGroup, learnedGroup);

    // ── description ──────────────────────────────────────────
    const desc = document.createElement("p");
    desc.className = "project-description";
    desc.textContent = project.description;

    // ── media area ───────────────────────────────────────────
    const media = document.createElement("div");
    media.className = "project-media";

    if (project.type === "iframe") {
        const frame = document.createElement("iframe");
        frame.src = project.src;
        frame.scrolling = "no";
        media.appendChild(frame);
        media.classList.add("project-media--iframe");

    } else if (project.type === "image") {
        if (project.images && project.images.length > 0) {
            let current = 0;

            const img = document.createElement("img");
            img.src = project.images[0];
            img.className = "project-img";
            media.appendChild(img);

            if (project.images.length > 1) {
                const nav = document.createElement("div");
                nav.className = "project-img-nav";

                const prev = document.createElement("button");
                prev.textContent = "←";
                const next = document.createElement("button");
                next.textContent = "→";

                const counter = document.createElement("span");
                counter.textContent = `1 / ${project.images.length}`;

                const update = () => {
                    img.src = project.images[current];
                    counter.textContent = `${current + 1} / ${project.images.length}`;
                };

                prev.addEventListener("click", () => { current = (current - 1 + project.images.length) % project.images.length; update(); });
                next.addEventListener("click", () => { current = (current + 1) % project.images.length; update(); });

                nav.append(prev, counter, next);
                media.appendChild(nav);
            }
        } else {
            // placeholder until screenshots are added
            const placeholder = document.createElement("div");
            placeholder.className = "project-placeholder";
            placeholder.textContent = "[ screenshots coming soon ]";
            media.appendChild(placeholder);
        }
    }

    // ── assemble ─────────────────────────────────────────────
    const body = document.createElement("div");
    body.className = "project-body";
    body.append(meta, desc, media);

    win.append(topBar, body);
    document.body.appendChild(win);
}