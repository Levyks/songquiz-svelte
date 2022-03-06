import type { RoomState } from "@/typings/room";
import { writable } from "svelte/store";
import { createStore } from "tepkijs-client";  
import { get_store_value } from 'svelte/internal'

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
        dark.setAttribute("media", "all");
        light.setAttribute("media", "none");
    } else {
        dark.setAttribute("media", "none");
        light.setAttribute("media", "all");
    }
});

export const room = {
    ...createStore<RoomState>()
};

export const player = writable<string>();

room.subscribe((value) => {
    console.log('room', value);
})

export const isLeader = writable(false);

player.subscribe(nickname => {
    isLeader.set(nickname === get_store_value(room).leader);
});

room.subscribe(room => {
    isLeader.set(room.leader === get_store_value(player));
});
