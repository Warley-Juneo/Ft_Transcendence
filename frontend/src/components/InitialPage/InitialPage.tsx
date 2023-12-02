import { Outlet } from 'react-router-dom';
import BarOptions from './BarOptions/BarOptions';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MiniProfile from '../Profiles/MiniProfile/MiniProfile';
import { UserData, t_dataUser } from './Contexts/Contexts';

export default function InicialPage() {
	let timeout: number = 0;
	let timeForNewRequestAxios: number = 10000;
	const [InfoUser, setGetInfoUser] = useState<t_dataUser>({
		nickname: '',
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

			{/* Profile Dinamico que vai ser printado em cima de toda a tela */}

			{/* Tela principal */}
			<div className='row g-0' id='home-screen' style={{ height: '100vh', width: '100vw' }}>
				<main className='col-9 h-100' id='left-screen'>
					<BarOptions />
					<hr className='m-0 text-white'></hr>
					<div className='p-3 rounded' id='dinamicScreen' style={{ height: 'calc(100vh - 15vh)' }}>
						<Outlet />
					</div>
				</main>
				<aside className='col-3' id='right-screen'>
					{<MiniProfile />}
				</aside>
			</div>
		</UserData.Provider>
	);
}
