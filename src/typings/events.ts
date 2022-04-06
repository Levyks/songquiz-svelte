import type { RoomStatus, RoundType } from "@/enums";
import type { GuessEventComponent, PlayerEventComponent, ResultsEventComponent, RoundEventComponent, TrackEventComponent } from "./eventsComponents";
import type { PlaylistSource } from "./main";
import type { Color } from "./misc";
import type { Playlist, RoomOptions } from "./state";

// <ServerToClientEvents>

export type GameStartingEvent = {
    startsIn: number;
}

export type RoundStartedEvent = {
    number: number,
    type: RoundType,
    choices: string[],
    remainingTime: number,
    audioUrl: string,
    isLastRound: boolean
}

export type RoundGuessEvent = GuessEventComponent;
export type RoundGuessesEvent = GuessEventComponent[];

export type RoundClosedEvent = {
    correctAnswer: number,
}

export type RoundEndedEvent = {
    results: ResultsEventComponent,
    nextRoundStartsIn: number,
    wasPlayed: TrackEventComponent,
}

export type RoomSyncEvent = {
    code: string,
    options: RoomOptions,
    leader: string,
    players: PlayerEventComponent[],
    status: RoomStatus,
    history: TrackEventComponent[],
    playlist?: Playlist,
    currentRound?: RoundEventComponent,
    nextRoundStartsIn?: number,
}

export type PlayerJoinedEvent = {
    nickname: string,
    color: Color,
    connected: boolean,
    score: number,
}

export type OptionsUpdatedEvent = RoomOptions;
export type PlaylistUpdatedEvent = Playlist;

// </ServerToClientEvents>

// <ClientToServerEvents>

export type SetPlaylistEvent = PlaylistSource;
export type SetOptionsEvent = RoomOptions;

// </ClientToServerEvents>