import type { RoomStatus, RoomGuessMode, PlaylistType, RoundType } from "@/enums";
import type { Color } from "./misc";

export type Room = {
    code: string,
    options: RoomOptions,
    leader: string,
    players: PlayersIndexed,
    status: RoomStatus,
    playlist?: Playlist,
    currentRound?: Round,
    nextRoundStartsIn?: number,
}

export type RoomOptions = {
    numberOfRounds: number,
    secondsPerRound: number,
    guessMode: RoomGuessMode,
    showGuessesPreview: boolean,
}

export type PlayersIndexed = {
    [nickname: string]: Player
}

export type Player = {
    nickname: string,
    color: Color,
    connected: boolean,
    score: number,
    isSelf: boolean,
}

export type Playlist = {
    name: string,
    creator: string,
    type: PlaylistType,
    total_tracks_count: number,
    playable_tracks_count: number,
    remaining_playable_tracks_count: number,
    cover: string,
    url: string
}

export type Round = {
    number: number,
    choices: string[],
    type: RoundType,
    remainingTime: number,
    audioUrl: string,
    acceptingAnswers: boolean,
    hasAnswered: boolean,
    isLastRound: boolean,
    guesses: Guesses,
    correctAnswer?: number,
    results?: Results,
}

export type Guesses = {
    player: Player,
    answer: number,
}[];

export type Results = {
    player: Player,
    score: number
}[];