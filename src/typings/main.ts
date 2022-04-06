import type { PlaylistType } from "@/enums";

export type PlaylistSource = {
    type: PlaylistType,
    id: string,
}

export type Artist = {
    name: string
    url: string
}

export type Track = {
    name: string,
    cover: string,
    url: string,
    artists: Artist[]
}

export type Platform = {
    label: string;
    logo: string;
}

