import { io } from "socket.io-client";
import { get_store_value } from "svelte/internal";

import { room, connected, player } from "@/stores";

import type { Socket } from "@/typings/socket";
import { RoomStatus } from "@/enums";
import type { GameStartingEvent, OptionsUpdatedEvent, PlayerJoinedEvent, RoomSyncEvent, RoundClosedEvent, RoundEndedEvent, RoundGuessEvent, RoundStartedEvent } from "@/typings/events";
import type { Guesses, Player, PlayersIndexed, Playlist, Results, RoomOptions } from "@/typings/state";
import type { GuessEventComponent, ResultsEventComponent } from "@/typings/eventsComponents";

export let socket: Socket;

export function connect(roomCode: string, nickname: string, token: string): Promise<void> {

    if(socket) {
        socket.removeAllListeners();
        socket.disconnect();
    }

    return new Promise((resolve, reject) => {
        socket = io(`http://localhost:5000`, {
            auth: {
                roomCode, nickname, token
            }
        });

        socket.on('connect_error', reject);
        
        setHandlers(socket);

        const unsubscribe = room.subscribe(r => {
            if(!r) return;
            unsubscribe();
            resolve();
        });
    });

}

export function setOptions(options: RoomOptions): Promise<void> {
    return new Promise((resolve, reject) => {
        socket.emit('options:set', options, (err) => {
            if(err) return reject(err);
            resolve();
        });
    });
}

function setHandlers(socket: Socket) {

    socket.on('room:sync', handleRoomSync);

    socket.on('game:starting', handleGameStarting);
    socket.on('round:started', handleRoundStarted);
    socket.on('round:guess', handleRoundGuess);

    socket.on('round:closed', handleRoundClosed);
    socket.on('round:ended', handleRoundEnded);
    socket.on('game:ended', handleGameEnded);

    socket.on('options:updated', handleOptionsUpdated);
    socket.on('playlist:updated', handlePlaylistUpdated);

    socket.on('room:leaderChanged', handleRoomLeaderChanged);

    socket.on('player:joined', handlePlayerJoined);
    socket.on('player:connected', handlePlayerConnected);
    socket.on('player:disconnected', handlePlayerDisconnected);
    socket.on('player:left', handlePlayerLeft);

    socket.on('connect', () => connected.set(true));
    socket.on('connect_error', () => connected.set(false));
    socket.on('disconnect', () => connected.set(false));
}

function formatResults(results: ResultsEventComponent, players: { [nickname: string]: Player }): Results {

    return results.map(({nickname, score}) => ({
        player: players[nickname],
        score,
    }));

}

function formatGuesses(guesses: GuessEventComponent[], players: { [nickname: string]: Player }): Guesses {
    
    return guesses.map(({nickname, answer}) => ({
        player: players[nickname],
        answer,
    }));
    
}


function handleRoomSync(data: RoomSyncEvent) {

    const playersIndexed = data.players.reduce<PlayersIndexed>((acc, p) => {
        acc[p.nickname] = {
            ...p, isSelf: p.nickname === get_store_value(player),
        };
        return acc;
    }, {});

    const resultsFormatted = data.currentRound?.results && formatResults(data.currentRound.results, playersIndexed);

    room.set({
        ...data,
        currentRound: data.currentRound && {
            ...data.currentRound,
            results: resultsFormatted,
            guesses: formatGuesses(data.currentRound.guesses, playersIndexed),
        },
        players: playersIndexed,
    });

}

function handleGameStarting(data: GameStartingEvent) {
    room.update(r => {
        r.status = RoomStatus.Starting;
        r.nextRoundStartsIn = data.startsIn;
        return r;
    });
}

function handleRoundStarted(data: RoundStartedEvent) {
    room.update(r => {
        r.status = RoomStatus.Playing;
        r.currentRound = {
            number: data.number,
            type: data.type,
            choices: data.choices,
            remainingTime: data.remainingTime,
            audioUrl: data.audioUrl,
            isLastRound: data.isLastRound,
            acceptingAnswers: true,
            hasAnswered: false,
            guesses: [],
        };
        return r;
    });
}

function handleRoundGuess(data: RoundGuessEvent) {
    room.update(r => {
        r.currentRound!.guesses.push({
            player: r.players[data.nickname],
            answer: data.answer,
        });
        return r;
    });
}

function handleRoundClosed(data: RoundClosedEvent) {
    room.update(r => {
        r.currentRound!.acceptingAnswers = false;
        r.currentRound!.correctAnswer = data.correctAnswer;
        return r;
    });
}

function handleRoundEnded(data: RoundEndedEvent) {
    room.update(r => {

        r.currentRound!.results = formatResults(data.results, r.players);   
        r.nextRoundStartsIn = data.nextRoundStartsIn;

        data.results.forEach(({nickname, score}) => {
            r.players[nickname].score += score;
        });

        return r;
    });
}

function handleGameEnded() {
    room.update(r => {
        r.status = RoomStatus.Finished;
        r.currentRound = undefined;
        r.nextRoundStartsIn = undefined;
        return r;
    });
}

function handleOptionsUpdated(data: OptionsUpdatedEvent) {
    room.update(r => {
        r.options = data;
        return r;
    });
}   

function handlePlaylistUpdated(data: Playlist) {
    room.update(r => {
        r.playlist = data;
        return r;
    });
}

function handleRoomLeaderChanged(nickname: string) {
    room.update(r => {
        r.leader = nickname;
        return r;
    });
}

function handlePlayerJoined(data: PlayerJoinedEvent) {
    room.update(r => {
        r.players[data.nickname] = {
            ...data,
            isSelf: data.nickname === get_store_value(player),
        };
        return r;
    });
}

function handlePlayerConnected(nickname: string) {
    room.update(r => {
        r.players[nickname].connected = true;
        return r;
    });
}

function handlePlayerDisconnected(nickname: string) {
    room.update(r => {
        r.players[nickname].connected = false;
        return r;
    });
}

function handlePlayerLeft(nickname: string) {
    room.update(r => {
        delete r.players[nickname];
        return r;
    });
}