
import axios from "axios";
import { player, room } from "@/stores"; 
import { connect as connectSocket } from "@/services/socket.service";

export function join(code: string, nickname: string) {

    return axios.post(`/room/${code}`, {
        nickname
    }).then(async response => {

        localStorage.setItem("code", response.data.code);
        localStorage.setItem("nickname", response.data.nickname);
        localStorage.setItem("token", response.data.token);

        return connect(code);

    });

}

export function create(nickname: string): Promise<string> {

    return axios.put(`/room`, {
        nickname
    }).then(async response => {

        localStorage.setItem("code", response.data.code);
        localStorage.setItem("nickname", response.data.nickname);
        localStorage.setItem("token", response.data.token);

        return connect(response.data.code).then(() => {
            return response.data.code;
        });

    });

}

export async function connect(code: string): Promise<void> {

    const storedCode = localStorage.getItem("code");

    if (storedCode !== code) {
        return Promise.reject("Stored credentials are not for this room");
    }

    const nickname = localStorage.getItem("nickname");
    const token = localStorage.getItem("token");

    if(!nickname || !token) {
        return Promise.reject("No nickname or token");
    }
    
    player.set(nickname);

    return connectSocket(code, nickname, token);

}