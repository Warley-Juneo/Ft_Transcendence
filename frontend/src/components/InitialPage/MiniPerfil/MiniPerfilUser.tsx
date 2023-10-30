import StatusOnline from "./StatusOnline";
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

type respostaAPI = {
	avatar: string,
	_nickname: string,
}

export default function MiniPerfilUser() {
	const [info, setInfo] = useState<respostaAPI>({ avatar: '', _nickname: '' });
	const jwtToken = Cookies.get('jwtToken')

	const axios_connect = useCallback(async () => {
		const res = await axios.get('http://localhost:3000/landing-page',
			{
				headers: {
					Authorization: jwtToken,
				},
			});
		console.log("RESPONSE AXIOS GET TEST", res);
		setInfo(res.data);
	}, [])

	useEffect(() => {
	  axios_connect();
	}, []);

	info.avatar = 'https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg'
	return (
		<div className='d-flex p-3' style={{ height: '15vh'}}>
			{(info._nickname === '' || info.avatar === '') ? (
				<div className="spinner-border text-primary m-auto h-75" role="status">
					<span className="visually-hidden m-auto">Loading...</span>
				</div>
			) : (
				<div className='h-100 d-flex text-white align-items-center'>
					<img className="rounded-circle h-100 w-100 me-3" src={info.avatar} alt='foto' />
					{StatusOnline(info._nickname)}
				</div>
			)}
		</div>
	);
}
