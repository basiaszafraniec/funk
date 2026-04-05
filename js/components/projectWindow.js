import { createTopBar } from "../components/topBar.js";
import { nextZ } from "../zIndex.js";
import { PROJECT_DATA } from "../data/projectData.js";

const GH_SVG = `<svg viewBox="0 0 16 16" fill="currentColor" style="width:10px;height:10px;vertical-align:middle;"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`;
const LINK_SVG = `<svg viewBox="0 0 16 16" fill="currentColor" style="width:10px;height:10px;vertical-align:middle;"><path d="M4.715 6.542L3.343 7.914a3 3 0 104.243 4.243l1.828-1.829A3 3 0 008.586 5.5L8 6.086a1.002 1.002 0 00-.154.199 2 2 0 01.861 3.337L6.88 11.45a2 2 0 11-2.83-2.83l.793-.792a4.018 4.018 0 01-.128-1.287z"/><path d="M6.586 4.672A3 3 0 007.414 9.5l.775-.776a2 2 0 01-.896-3.346L9.12 3.55a2 2 0 112.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 10-4.243-4.243L6.586 4.672z"/></svg>`;

export function openProjectWindow(id) {
    const project = PROJECT_DATA[id];
    if (!project) return;

    if (document.getElementById("project-" + id)) {
        document.getElementById("project-" + id).style.zIndex = nextZ();
        return;
    }

    const win = document.createElement("div");
    win.className = "window project-window";
    win.id = "project-" + id;
    win.style.zIndex = nextZ();
    win.style.left = window.innerWidth  / 2 - 240 + (Math.random() * 60 - 30) + "px";
    win.style.top  = window.innerHeight / 2 - 200 + (Math.random() * 60 - 30) + "px";

    const topBar = createTopBar({ title: project.title, closable: true });

    // ── body ─────────────────────────────────────────────────
    const body = document.createElement("div");
    body.className = "project-body";

    // tags
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

    // description
    const desc = document.createElement("p");
    desc.className = "project-description";
    desc.textContent = project.description;

    // media
    const media = makeMedia(project);

    body.append(meta, desc, media);

    // ── link bar ─────────────────────────────────────────────
    if (project.webLink || project.ghLink) {
        const bar = document.createElement("div");
        bar.className = "project-link-bar";

        if (project.webLink) {
            const a = document.createElement("a");
            a.className = "project-link-btn project-link-btn--web";
            a.href = project.webLink;
            a.target = "_blank";
            a.rel = "noopener";
            a.innerHTML = `${LINK_SVG} visit site`;
            bar.appendChild(a);
        }

        if (project.ghLink) {
            const a = document.createElement("a");
            a.className = "project-link-btn project-link-btn--gh";
            a.href = project.ghLink;
            a.target = "_blank";
            a.rel = "noopener";
            a.innerHTML = `${GH_SVG} github`;
            bar.appendChild(a);
        }

        body.appendChild(bar);
    }

    win.append(topBar, body);
    document.body.appendChild(win);
}

// ── media builder ─────────────────────────────────────────────
function makeMedia(project) {
    const media = document.createElement("div");
    media.className = "project-media";

    if (project.type === "iframe") {
        const frame = document.createElement("iframe");
        frame.src = project.src;
        frame.scrolling = "no";
        frame.style.border = "none";
        media.classList.add("project-media--iframe");

        // allow per-project natural size override
        // set iframeWidth / iframeHeight in projectData to match the page's real size
        const nw = project.iframeWidth  || 650;
        const nh = project.iframeHeight || 780;
        const displayH = project.iframeDisplayHeight || 340;

        media.style.height = displayH + "px";
        frame.style.position   = "absolute";
        frame.style.width      = nw + "px";
        frame.style.height     = nh + "px";
        frame.style.top        = "50%";
        frame.style.left       = "50%";

        // scale so the natural size fits inside displayH, centered
        const scale = displayH / nh;
        frame.style.transform  = `translate(-50%, -50%) scale(${scale})`;

        media.appendChild(frame);

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
            const ph = document.createElement("div");
            ph.className = "project-placeholder";
            ph.textContent = "[ screenshots coming soon ]";
            media.appendChild(ph);
        }
    }

    return media;
}