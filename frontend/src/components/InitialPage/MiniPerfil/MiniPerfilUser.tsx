import StatusOnline from "./StatusOnline";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

type respostaAPI = {
	avatar: string,
	_nickname: string,
}

export default function MiniPerfilUser() {
	const [info, setInfo] = useState<respostaAPI>({ avatar: '', _nickname: '' });
	let timeout: number = 0;
	let timeForNewRequestAxios: number = 10000;

	const axios_connect = () => {
		axios.get('http://localhost:3000/landing-page', {
			headers: {
				Authorization: Cookies.get('jwtToken'),
			}, timeout: 5000
		})
			.then((res) => {
				if (!res.data.avatar) {
					res.data.avatar = "https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg";
				}
				setInfo(res.data);
			})
			.catch((err) => {
				timeout++
				if (timeout === 5) {
					alert("O servidor esta indisponivel no momento, tente novamente mais tarde.");
					timeForNewRequestAxios = 60000;
				}
				setTimeout(axios_connect, timeForNewRequestAxios);
			});
	}

	useEffect(() => {
		axios_connect();
	}, []);

	if (info._nickname === '' || info.avatar === '') {
		return (
			<div className='d-flex p-3' style={{ height: '15vh' }}>
				<div className="spinner-border text-primary m-auto h-75" role="status">
					<span className="visually-hidden m-auto">Loading...</span>
				</div>
			</div>
		);
	}
	return (
		<div className='d-flex p-3' style={{ height: '15vh' }}>
			<div className='h-100 d-flex text-white align-items-center'>
				<img className="rounded-circle h-100 w-100 me-3" src={info.avatar} alt='foto' />
				{StatusOnline(info._nickname)}
			</div>
		</div>
	)
}
