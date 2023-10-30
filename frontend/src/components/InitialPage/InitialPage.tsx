import { useCallback, useEffect ,useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import MiniPerfil from './MiniPerfil/MiniPerfil';
import ChatPrivate from '../ChatsGame/ChatPrivate/ChatPrivate';
import BarOptions from './barOptions/BarOptions';


export default function InicialPage() {
	const [info, setInfo] = useState(null);
	const [currentChat, setCurrentChat] = useState(false);

	const email = Cookies.get('email');
	const jwtToken = Cookies.get('jwtToken')
	console.log("INITIAL PAGE JWT: ", jwtToken);
	
	const axios_connect = useCallback(async () => {
		// const res = await axios.post('http://localhost:3000/landing-page', {
		// 	jwt_auth: email},)
		// setInfo(res.data);
		// console.log("PAGE_INFO FUNCTION", info);
		const res = await axios.get('http://localhost:3000/landing-page',
			{headers: {
				Authorization: jwtToken,},
		});
		console.log("RESPONSE AXIOS GET TEST",res);
		setInfo(res.data);
	},[])

	function showChat() {
		//TODO: Request api
		setCurrentChat(!currentChat);
	}

	useEffect(() => {
		axios_connect();
	}, []);

	return (
		<div className='d-flex' id='home-screen' style={{maxHeight: '100vh'}}>
			<div className='w-100' id='left-screen'>
				<BarOptions />
				<hr className='m-0 text-white'></hr>
				<div className='p-3 rounded' id='dinamicScreen' style={{height: '85vh'}}>
					<Outlet />
				</div>
			</div>
			<div style={{height: '100vh'}}>
				{currentChat === true ? <ChatPrivate /> : null}
				{<MiniPerfil data={info} showChat={showChat}/>}
			</div>
		</div>
	);
}
