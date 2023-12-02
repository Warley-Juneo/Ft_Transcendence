import { createContext } from "react";
import { io } from "socket.io-client";

export type t_dataUser = {
	id: string;
	nickname: string;
	avatar: string;
};

export const UserData = createContext<{
	user: t_dataUser;
	updateDataUser: () => void;
}>({
	user: {
		nickname: '',
		avatar: '',
		id: '',
	},
	updateDataUser: () => { },
})

export const socket = io('http://localhost:3000');
socket.on('connect', () => {
	console.log('Conectado ao socket game');
})
