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

export const socket = io(`${process.env.REACT_APP_HOST_URL}/`, {
	extraHeaders: {
		'ngrok-skip-browser-warning': 'true'
	},
	auth: {
		user_id: "Coloque aqui o id do usuário!!",
	},
});
socket.on('connect', () => {
	console.log('Conectado ao socket game');
})

let sending: boolean = false;
export function sendSocketBackend(userId: string) {
	if (sending == true) {
		return;
	}
	else {
		socket.emit('save-socket', userId);
		sending = true;
	}
}
