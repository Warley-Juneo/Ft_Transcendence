import { createContext } from "react";
import { io } from "socket.io-client";

export type t_dataUser = {
	id: string;
	nickname: string;
	avatar: string;
	coins: number;
	twoFA: boolean;
};

export const UserData = createContext<{
	user: t_dataUser;
	updateDataUser: () => void;
}>({
	user: {
		nickname: '',
		avatar: '',
		id: '',
		coins: 0,
		twoFA: false,
	},
	updateDataUser: () => { },
})

export const socket = io('https://990d-187-62-198-223.ngrok-free.app');
socket.on('connect', () => {
	console.log('Conectado ao socket game');
})
