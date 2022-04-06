import type { RoundType } from "@/enums";
import type { Color } from "./misc";

export type RoundEventComponent = {
    number: number,
    choices: string[],
    type: RoundType,
    remainingTime: number,
    audioUrl: string,
    acceptingAnswers: boolean,
    hasAnswered: boolean,
    isLastRound: boolean,
    guesses: GuessEventComponent[],
    correctAnswer?: number,
    results?: ResultsEventComponent,
}

export type GuessEventComponent = {
    nickname: string,
    answer: number
};

export type ResultsEventComponent = {
    nickname: string,
    score: number
}[];

export type PlayerEventComponent = {
    nickname: string,
    color: Color,
    connected: boolean,
    score: number,
}