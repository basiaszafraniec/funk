import { openProjectsWindow } from "./components/projects.js";
import { openAudioPlayerWindow } from "./components/audioPlayer.js";
import { openDocumentsWindow } from "./components/documents.js";
import { openAboutMeWindow } from "./components/aboutMe.js";

export function initDesktop() {
    const files = [
        {
            id: "projects",
            name: "Projects",
            type: "window",
            icon: "./assets/folder2.png",
            component: openProjectsWindow,
            x: 30, y: 20
        }
        , {
            id: "about-me",
            name: "About Me",
            type: "window",
            icon: "./assets/prof4.png",
            component: openAboutMeWindow,
            x: 60, y: 12

        },
        {
            id: "audio-player",
            name: "Audio Player",
            type: "window",
            icon: "./assets/record1.png",
            component: openAudioPlayerWindow,
            x: 72, y: 38
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
            component: openDocumentsWindow,
            x: 50, y: 55
        }];
    const desktop = document.querySelector(".desktop");

    files.forEach(file => {
        const icon = document.createElement("div");
        icon.className = "desktop-icon";
        icon.id = file.id + "-icon";

        icon.style.left = file.x + "%";
        icon.style.top = file.y + "%";

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