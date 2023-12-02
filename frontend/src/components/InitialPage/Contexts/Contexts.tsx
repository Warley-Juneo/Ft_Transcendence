import { createContext } from "react";
import { Socket, io } from "socket.io-client";

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

export const socketGame = createContext<Socket>(io('http://localhost:4000/game'));
