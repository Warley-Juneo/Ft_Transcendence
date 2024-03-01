import axios from "axios";
import Cookies from "js-cookie";
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

function get_socket() {
	axios.get(`${process.env.REACT_APP_HOST_URL}/landing-page`, {
		headers: {
			Authorization: Cookies.get('jwtToken'),
			"ngrok-skip-browser-warning": "69420"
		}, timeout: 5000
	}).then((res) => {
		return (
			io(`${process.env.REACT_APP_HOST_URL}/`, {
				extraHeaders: {
					'ngrok-skip-browser-warning': 'true'
				},
				auth: {
					user_id: res.data.id,
					user: res.data.nickname,
				},
			})
		)
	})
	return (
		io(`${process.env.REACT_APP_HOST_URL}/`, {
			extraHeaders: {
				'ngrok-skip-browser-warning': 'true'
			},
			auth: {
				user_id: ""
			},
		})
	)
}

export const socket = get_socket();
