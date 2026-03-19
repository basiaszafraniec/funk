import { initDesktopPretty } from "./desktop-pretty.js";
import { initTitleScreen } from "./titleScreen.js";
import { initDesktop } from "./desktop.js";
import { manageWindows } from "./windowManager.js";

const seen = sessionStorage.getItem("visited");
 
if (!seen) {
    sessionStorage.setItem("visited", "1");
    initTitleScreen(() => {
        manageWindows();
        initDesktop();
        initDesktopPretty();
    });
} else {
    manageWindows();
    initDesktop();
    initDesktopPretty();
}