import { player, room } from "@/stores";
import axios from "axios";

export function join(code: string, nickname: string) {

    return axios.post(`/room/${code}`, {
        nickname
    }).then(async response => {

        localStorage.setItem("nickname", response.data.nickname);
        localStorage.setItem("token", response.data.token);

        return connect(code);

    });

}

export function create(nickname: string) {

    return axios.put(`/room`, {
        nickname
    }).then(async response => {

        localStorage.setItem("nickname", response.data.nickname);
        localStorage.setItem("token", response.data.token);

        return connect(response.data.code);

    });

}

export async function connect(code: string) {

    const nickname = localStorage.getItem("nickname");
    const token = localStorage.getItem("token");

    player.set(nickname);

    if(!nickname || !token) return false

    const result = await room.connect(code, 'http://localhost:5000', {
        auth: {
            nickname,
            token
        }
    });

    return result;

}