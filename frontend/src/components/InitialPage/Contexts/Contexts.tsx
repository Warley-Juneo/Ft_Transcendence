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

export const socket = io('https://21f6-2804-14c-1a8-a325-fbe4-507a-840b-f839.ngrok-free.app', {
	extraHeaders: {
		'ngrok-skip-browser-warning': 'true'
	}
});
socket.on('connect', () => {
	console.log('Conectado ao socket game');
})
