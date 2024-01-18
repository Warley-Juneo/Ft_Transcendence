import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import { UserData, socket, t_dataUser } from './Contexts/Contexts';

export default function InicialPage() {
	let timeForNewRequestAxios: number = 10000;
	let timeout: number = 0;
	const [infoUser, setGetInfoUser] = useState<t_dataUser>({
		nickname: '',
		coins: 0,
		avatar: '',
		id: '',
		twoFA: false,
	});

	function setStatusOnline(id: string) {
		let aux = {
			user_id: id,
			is_active: true,
		}
		socket.emit('check-status', aux);
	}

	function getInfoUser() {
		axios.get('https://21f6-2804-14c-1a8-a325-fbe4-507a-840b-f839.ngrok-free.app/landing-page', {
			headers: {
				Authorization: Cookies.get('jwtToken'),
				"ngrok-skip-browser-warning": "69420"
			}, timeout: 5000
		}).then((res) => {
			if (!res.data.avatar) {
				res.data.avatar = "https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg";
			}
			setGetInfoUser(res.data);
			setStatusOnline(res.data.id);
		}).catch(() => {
			timeout++
			if (timeout === 5) {
				alert("O servidor esta indisponivel no momento, tente novamente mais tarde.");
				timeForNewRequestAxios = 60000;
			}
			setTimeout(getInfoUser, timeForNewRequestAxios);
		});
	}

	useEffect(() => {
		getInfoUser();
	}, [])
	return (
		<UserData.Provider value={{ user: infoUser, updateDataUser: getInfoUser }}>
			<Outlet />
		</UserData.Provider>

	);
}
