import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserData, t_dataUser } from './Contexts/Contexts';
import Game from '../GamePage/Game/Game';

export default function InicialPage() {
	let timeout: number = 0;
	let timeForNewRequestAxios: number = 10000;
	const [InfoUser, setGetInfoUser] = useState<t_dataUser>({
		nickname: '',
		coins: 0,
		avatar: '',
		id: '',
	});

	function getInfoUser() {
		axios.get('http://localhost:3000/landing-page', {
			headers: {
				Authorization: Cookies.get('jwtToken'),
			}, timeout: 5000
		})
			.then((res) => {
				if (!res.data.avatar) {
					res.data.avatar = "https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg";
				}
				setGetInfoUser(res.data);
				console.log(res.data);
			})
			.catch((err) => {
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
	}, []);

	return (
		<UserData.Provider value={{ user: InfoUser, updateDataUser: getInfoUser }}>
			<Game />
			{/* <aside className='col-3' id='right-screen'>
					{<MiniProfile />}
				</aside> */}
		</UserData.Provider>
	);
}
