import { openProjectsWindow } from "./components/projects.js";
import { openAudioPlayerWindow } from "./components/audioPlayer.js";
import { openDocumentsWindow } from "./components/documents.js";

export function initDesktop() {
    const files = [
        {
            id: "projects",
            name: "Projects",
            type: "window",
            icon: "./assets/folder2.png",
            component: openProjectsWindow
        }
        , {
            id: "about-me",
            name: "About Me",
            type: "window",
            icon: "./assets/prof2.png",
            component: openAudioPlayerWindow
        },
        {
            id: "audio-player",
            name: "Audio Player",
            type: "window",
            icon: "./assets/record1.png",
            component: openAudioPlayerWindow
        },
        // {
        //     id: "memes",
        //     name: "memes",
        //     type: "window",
        //     icon: "./assets/folder2.png",
        //     component: openAudioPlayerWindow
        // },
        {
            id: "documents",
            name: "Documents",
            type: "window",
            icon: "./assets/doc1.png",
            component: openDocumentsWindow
        }];
    const desktop = document.querySelector(".desktop");

    files.forEach(file => {
        const icon = document.createElement("div");
        icon.className = "desktop-icon";
        icon.id = file.id + "-icon";

        icon.innerHTML = `
            <img src="${file.icon}" draggable="false" />
            <p>${file.name}</p>
        `;

        icon.addEventListener("click", () => {
            if (!document.getElementById(file.id)) {
                file.component();
            }
        });
        desktop.appendChild(icon);
    });
}