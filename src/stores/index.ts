import { writable } from "svelte/store";

export const width = writable(window.innerWidth);

window.addEventListener("resize", () => {
    width.set(window.innerWidth);
});

// Theme

const defaultDarkMode = 
    localStorage.getItem("dark-mode") === '1' ??
    window.matchMedia("(prefers-color-scheme: dark)").matches;

console.log(localStorage.getItem("dark-mode"));

export const darkMode = writable(defaultDarkMode);

darkMode.subscribe(dm => {
    localStorage.setItem("dark-mode", dm ? '1' : '0');

    const dark = document.getElementById('dark-css');
    const light = document.getElementById('light-css');

    if (dm) {
        dark.setAttribute("media", "all");
        light.setAttribute("media", "none");
    } else {
        dark.setAttribute("media", "none");
        light.setAttribute("media", "all");
    }
});