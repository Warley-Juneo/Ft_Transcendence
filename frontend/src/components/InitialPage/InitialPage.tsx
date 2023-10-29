import { useCallback, useEffect ,useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import MiniPerfil from '../perfilUser/MiniPerfil';
import ChatPrivate from '../chat/chatPrivate';
import BarOptions from '../barOptions/BarOptions';


export default function InicialPage() {
	const [info, setInfo] = useState(null);
	const [currentChat, setCurrentChat] = useState(false);

	// const data = Cookies.get('login');
	const email = Cookies.get('email');
	const jwtToken = Cookies.get('jwtToken')
	console.log("INITIAL PAGE JWT: ", jwtToken);
	
	const axios_connect = useCallback( async () => {
		// const res = await axios.post('http://localhost:3000/landing-page', {
		// 	jwt_auth: email},)
		// setInfo(res.data);
		// console.log("PAGE_INFO FUNCTION", info);
		const r = await axios.get('http://localhost:3000/landing-page',
			{headers: {
				Authorization: jwtToken,},
		});
		console.log("RESPONSE AXIOS GET TEST",r);
	},[])

	function showChat() {
		setCurrentChat(!currentChat);
	}

	useEffect(() => {
		axios_connect();
	}, []);

	console.log("INITIAL PAGE INFO: ", info);

	return (
		<div className='d-flex' id='home-screen'>
			<div className='d-flex flex-column tela-left' id='left-screen'>
				<BarOptions />
				<hr className='m-0 text-white'></hr>
				<div className='m-5' id='dinamicScreen'>
					<Outlet />
				</div>
			</div>
			<div className="d-flex justify-content-end" id='nav-perfil'>
				{currentChat === true ? <ChatPrivate /> : null}

				{info && <MiniPerfil data={info} showChat={showChat}/>}
			</div>
		</div>
	);
}
