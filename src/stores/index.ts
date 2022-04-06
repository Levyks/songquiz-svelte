import { get_store_value } from "svelte/internal";
import { writable, derived } from "svelte/store";

import type { Room } from "@/typings/state";

export const width = writable(window.innerWidth);

window.addEventListener("resize", () => {
    width.set(window.innerWidth);
});

// Theme

const defaultDarkMode = 
    localStorage.getItem("dark-mode") === '1' ??
    window.matchMedia("(prefers-color-scheme: dark)").matches;

export const darkMode = writable(defaultDarkMode);

darkMode.subscribe(dm => {
    localStorage.setItem("dark-mode", dm ? '1' : '0');

    const dark = document.getElementById('dark-css');
    const light = document.getElementById('light-css');

    if (dm) {
        dark?.setAttribute("media", "all");
        light?.setAttribute("media", "none");
    } else {
        dark?.setAttribute("media", "none");
        light?.setAttribute("media", "all");
    }
});

export const room = writable<Room>();

room.subscribe((r) => console.log(r));

export const isSelfLeader = derived(room, r => r.players[r.leader].isSelf);
export const isUpdatingOptions = writable(false);
export const player = writable<string>();

export const connected = writable(false);