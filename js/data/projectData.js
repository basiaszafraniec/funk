// ============================================================
//  PROJECT DATA
//  Add/edit projects here. Nothing else needs to change.
// ============================================================

export const PROJECT_DATA = {

    // ── JAVASCRIPT ───────────────────────────────────────────
    suwmania: {
        title: "Suwmania",
        stack: ["JavaScript", "HTML", "CSS"],
        learned: ["DOM manipulation", "game loops", "keyboard input"],
        description: "A browser-based sliding puzzle game.",
        type: "iframe",
        src: "https://host914956.xce.pl/basia/suwmania/B/"
    },

    weather: {
        title: "Weather App",
        stack: ["JavaScript", "HTML", "CSS", "API"],
        learned: ["fetch & async/await", "working with public APIs", "dynamic UI updates"],
        description: "Fetches live weather data for any city.",
        type: "image",
        images: [] // add screenshot paths e.g. "assets/projects/weather1.png"
    },

    strom: {
        title: "Strøm Website",
        stack: ["JavaScript", "HTML", "CSS"],
        learned: ["responsive layout", "scroll animations", "CSS variables"],
        description: "A website built for Strøm.",
        type: "image",
        images: []
    },

    raccoony: {
        title: "Raccoony",
        stack: ["JavaScript", "HTML", "CSS"],
        learned: ["character animation", "canvas basics", "event-driven design"],
        description: "An interactive raccoon character.",
        type: "image",
        images: []
    },

    pixelCanvas: {
        title: "Pixel Animation",
        stack: ["JavaScript", "Canvas API"],
        learned: ["canvas rendering", "requestAnimationFrame", "pixel manipulation"],
        description: "Generative pixel animations using the Canvas API.",
        type: "image",
        images: []
    },

    // ── PYTHON ───────────────────────────────────────────────
    starsGame: {
        title: "Stars Game",
        stack: ["Python", "Pygame"],
        learned: ["game loop", "collision detection", "sprite management"],
        description: "A small stars-collecting arcade game.",
        type: "image",
        images: []
    },

    machineLearning: {
        title: "Machine Learning",
        stack: ["Python", "scikit-learn", "pandas"],
        learned: ["data preprocessing", "model training", "evaluation metrics"],
        description: "Experiments with supervised learning models.",
        type: "image",
        images: []
    },

    cube: {
        title: "Cube",
        stack: ["Python"],
        learned: ["3D math", "rotation matrices", "terminal rendering"],
        description: "A spinning 3D cube rendered in the terminal.",
        type: "image",
        images: []
    },

    // ── BLENDER ──────────────────────────────────────────────
    donut: {
        title: "Donut",
        stack: ["Blender"],
        learned: ["modelling basics", "materials", "lighting"],
        description: "The classic Blender beginner donut.",
        type: "image",
        images: []
    },

    chair: {
        title: "Chair",
        stack: ["Blender"],
        learned: ["hard-surface modelling", "UV unwrapping"],
        description: "A modelled and rendered chair.",
        type: "image",
        images: []
    },

    head: {
        title: "Head",
        stack: ["Blender"],
        learned: ["organic sculpting", "subsurface scattering"],
        description: "A sculpted human head study.",
        type: "image",
        images: []
    },

    rooms: {
        title: "Rooms",
        stack: ["Blender"],
        learned: ["interior lighting", "scene composition", "HDRI"],
        description: "A series of interior room renders.",
        type: "image",
        images: []
    },

    // ── FIGMA ────────────────────────────────────────────────
    inkly: {
        title: "Inkly",
        stack: ["Figma"],
        learned: ["UI design", "component systems", "prototyping"],
        description: "A journalling app concept designed in Figma.",
        type: "image",
        images: []
    }
};


// ── FILE SYSTEM TREE ─────────────────────────────────────────
//  Mirrors the folder/file structure shown in the projects window.
//  type "folder" → navigates into it
//  type "file"   → opens a project window using the id

export const FILE_SYSTEM = {
    root: [
        { name: "javascript", type: "folder", target: "javascript" },
        { name: "python",     type: "folder", target: "python"     },
        { name: "blender",    type: "folder", target: "blender"    },
        { name: "figma",      type: "folder", target: "figma"      }
    ],
    javascript: [
        { name: "suwmania",      type: "file", id: "suwmania"    },
        { name: "weather app",   type: "file", id: "weather"     },
        { name: "strøm website", type: "file", id: "strom"       },
        { name: "raccoony",      type: "file", id: "raccoony"    },
        { name: "pixel canvas",  type: "file", id: "pixelCanvas" }
    ],
    python: [
        { name: "stars game",        type: "file", id: "starsGame"       },
        { name: "machine learning",  type: "file", id: "machineLearning" },
        { name: "cube",              type: "file", id: "cube"            }
    ],
    blender: [
        { name: "donut", type: "file", id: "donut" },
        { name: "chair", type: "file", id: "chair" },
        { name: "head",  type: "file", id: "head"  },
        { name: "rooms", type: "file", id: "rooms" }
    ],
    figma: [
        { name: "inkly", type: "file", id: "inkly" }
    ]
};