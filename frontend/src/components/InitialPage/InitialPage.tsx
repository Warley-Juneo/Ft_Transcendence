import { Outlet } from 'react-router-dom';
import MiniPerfil from './MiniPerfil/MiniPerfil';
import BarOptions from './BarOptions/BarOptions';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ConfigurationGame from './Configurations/Configurations';
import { IoSettingsOutline } from 'react-icons/io5';

export type t_dataUser = {
	_nickname: string;
	_avatar: string;
};

export const DataUser = createContext<{
	user: t_dataUser;
	updateDataUser: () => void;
}>({
	user: {
		_nickname: '',
		_avatar: '',
	},
	updateDataUser: () => { },
})

export default function InicialPage() {
	let timeout: number = 0;
	let timeForNewRequestAxios: number = 10000;
	const [showConfigurations, setShowConfigurations] = useState<boolean>(false);
	const [InfoUser, setGetInfoUser] = useState<t_dataUser>({
		_nickname: '',
		_avatar: '',
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
		<DataUser.Provider value={{ user: InfoUser, updateDataUser: getInfoUser }}>
			<IoSettingsOutline
				className="position-absolute top-0 end-0 m-3 text-white"
				type='button'
				size={30}
				onClick={() => setShowConfigurations(!showConfigurations)}
			/>
			{showConfigurations ? <ConfigurationGame /> : null}
			<div className='row g-0' id='home-screen' style={{ height: '100vh', width: '100vw' }}>
				<main className='col-9 h-100' id='left-screen'>
					<BarOptions />
					<hr className='m-0 text-white'></hr>
					<div className='p-3 rounded' id='dinamicScreen' style={{ height: 'calc(100vh - 15vh)' }}>
						<Outlet />
					</div>
				</main>
				<aside className='col-3' id='right-screen'>
					{<MiniPerfil />}
				</aside>
			</div>
		</DataUser.Provider>
	);
}
