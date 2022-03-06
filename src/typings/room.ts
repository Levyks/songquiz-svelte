
export type RoomStatus = 'lobby' | 'starting' | 'round' | 'finished';

export interface RoomState {
    code: string;    
    status: RoomStatus;
    leader: string;
    playlist?: Playlist;
    players: {
        [nickname: string]: Player
    }
}

export interface Player {
    nickname: string;
    score: number;
    color: Color;
}

export type Color = [number, number, number];

export interface Artist {
    name: string,
    url: string,
}

export interface Track {
    name: string,
    artists: Artist[],
    cover: string,
    url: string,
    _preview: string
}

export interface Playlist {
    name: string,
    tracks_count: number,
    valid_tracks_count: number,
    _tracks: Track[],
    cover: string,
    url: string
}
