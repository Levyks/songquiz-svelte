import type { Color } from "@/typings/misc";

export function delay(ms: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export function getTextColor(bg: Color): Color {
    return (bg[0] * 0.299 + bg[1] * 0.587 + bg[2] * 0.114) > 186 ? 
        [0, 0, 0] : 
        [255, 255, 255];
}

export function getHtmlColor(color: Color) {
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

export function addPlaySilenceTrap() {
    
    function listener() {
        document.body.removeEventListener("click", listener);
        
        const audio = new Audio();
        audio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
        audio.play();
    }

    document.body.addEventListener("click", listener);
}