import { createTopBar } from "./topBar.js";

export function openAboutMeWindow() {

    if (document.getElementById("about-me-window")) return;

    const win = document.createElement("div");
    win.className = "window about-window";
    win.id = "about-me-window";

    // same random positioning as other popup windows
    win.style.left = window.innerWidth  / 2 - 280 + (Math.random() * 80 - 40) + "px";
    win.style.top  = window.innerHeight / 2 - 220 + (Math.random() * 80 - 40) + "px";
    win.style.zIndex = 20;

    const topBar = createTopBar({ closable: true });
    win.appendChild(topBar);

    const ticker = document.createElement("div");
    ticker.className = "about-ticker";
    ticker.innerHTML = `
        <ul class="about-ticker-inner">
            <li>basia szafraniec</li><li>developer</li><li>designer</li>
            <li>bouldering</li><li>pixel art</li><li>open to work</li>
            <li>basia szafraniec</li><li>developer</li><li>designer</li>
            <li>bouldering</li><li>pixel art</li><li>open to work</li>
        </ul>`;

    const body = document.createElement("div");
    body.className = "about-body";

    const row1 = document.createElement("div");
    row1.className = "about-row1";
    row1.appendChild(makeAvatarBox());
    row1.appendChild(makeBioBox());
    row1.appendChild(makeSkillsBox());

    const row2 = document.createElement("div");
    row2.className = "about-row2";
    row2.appendChild(makeInterestsBox());
    row2.appendChild(makeSoftSkillsBox());
    row2.appendChild(makeEducationBox());

    body.appendChild(row1);
    body.appendChild(row2);

    win.appendChild(ticker);
    win.appendChild(body);
    document.body.appendChild(win);
}

function makeAvatarBox() {
    const box = document.createElement("div");
    box.className = "about-section av-col";

    const stripe = document.createElement("div");
    stripe.className = "about-av-stripe";
    for (let i = 0; i < 8; i++) stripe.appendChild(document.createElement("div"));

    const inner = document.createElement("div");
    inner.className = "about-av-inner";

    const portrait = document.createElement("div");
    portrait.className = "about-av-portrait";
    portrait.innerHTML = `<img src="assets/avatar.png" alt="pixel portrait" onerror="this.style.display='none'">`;

    const name = document.createElement("div");
    name.className = "about-av-name";
    name.textContent = "basia";

    const tag = document.createElement("div");
    tag.className = "about-av-tag";
    tag.textContent = "dev + designer";

    inner.append(portrait, name, tag);
    box.append(stripe, inner);
    return box;
}

function makeBioBox() {
    const box = document.createElement("div");
    box.className = "about-section";
    box.appendChild(makeLabel("about me"));

    const text = document.createElement("div");
    text.className = "about-bio-text";
    text.innerHTML = `Hi! I make things that live on screens — mixing playful design with clean code. I love finding ways to make the web feel more alive and human.<span class="about-cursor"></span>`;

    box.appendChild(text);
    return box;
}

function makeSkillsBox() {
    const SKILLS = [
        { name: "javascript", level: 14 },
        { name: "html / css",  level: 16 },
        { name: "python",      level: 8 },
        { name: "blender",     level: 10 },
        { name: "figma",       level: 12 },
        { name: "adobe",       level: 8 },
    ];

    const box = document.createElement("div");
    box.className = "about-section";
    box.appendChild(makeLabel("hard skills"));

    const skillsBody = document.createElement("div");
    skillsBody.className = "about-skills-body";

    SKILLS.forEach(({ name, level }) => {
        const row = document.createElement("div");
        row.className = "about-stat-row";

        const label = document.createElement("div");
        label.className = "about-stat-label";
        label.textContent = name;

        const track = document.createElement("div");
        track.className = "about-stat-track";
        for (let i = 0; i < 20; i++) {
            const block = document.createElement("div");
            block.className = "about-sb" + (i < level ? " on" : "");
            track.appendChild(block);
        }

        row.append(label, track);
        skillsBody.appendChild(row);
    });

    box.appendChild(skillsBody);
    return box;
}

function makeInterestsBox() {
    const INTERESTS = [
        "storytelling", "immersive design", "bouldering",
        "language learning", "jigsaw puzzles", "guitar", "productivity"
    ];

    const box = document.createElement("div");
    box.className = "about-section";
    box.appendChild(makeLabel("interests"));

    const flow = document.createElement("div");
    flow.className = "about-panel-body";

    const text = document.createElement("div");
    text.className = "about-int-flow";
    text.innerHTML = INTERESTS.map((w, i) =>
        `<span class="about-int-word">${w}</span>` +
        (i < INTERESTS.length - 1 ? `<span class="about-int-sep">·</span>` : "")
    ).join("");

    flow.appendChild(text);
    box.appendChild(flow);
    return box;
}

function makeSoftSkillsBox() {
    const SKILLS = [
        "communication", "fast learner", "problem solving",
        "creativity", "open to new ideas", "positive outlook"
    ];

    const box = document.createElement("div");
    box.className = "about-section";
    box.appendChild(makeLabel("soft skills"));

    const body = document.createElement("div");
    body.className = "about-panel-body";

    SKILLS.forEach((skill, i) => {
        const row = document.createElement("div");
        row.className = "about-soft-row";

        const accent = document.createElement("div");
        accent.className = "about-soft-accent" + (i % 2 === 0 ? "" : " alt");

        const label = document.createElement("span");
        label.textContent = skill;

        row.append(accent, label);
        body.appendChild(row);
    });

    box.appendChild(body);
    return box;
}

function makeEducationBox() {
    const box = document.createElement("div");
    box.className = "about-section";
    box.appendChild(makeLabel("education"));

    const body = document.createElement("div");
    body.className = "about-edu-body";
    body.innerHTML = `
        <div class="about-edu-school">your school</div>
        <div class="about-edu-deg">your degree</div>
        <div class="about-edu-year">2022–2025</div>`;

    const stripe = document.createElement("div");
    stripe.className = "about-edu-stripe";
    for (let i = 0; i < 8; i++) stripe.appendChild(document.createElement("div"));

    box.append(body, stripe);
    return box;
}

function makeLabel(text) {
    const el = document.createElement("div");
    el.className = "about-cell-label";
    el.textContent = text;
    return el;
}