import { useCallback, useEffect ,useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import MiniPerfil from '../MiniPerfil/MiniPerfil';
import ChatPrivate from '../chat/chatPrivate';
import BarOptions from '../barOptions/BarOptions';


export default function InicialPage() {
	const [info, setInfo] = useState(null);
	const [currentChat, setCurrentChat] = useState(false);

	// const data = Cookies.get('login');
	const email = Cookies.get('email');

	const axios_connect = useCallback( async () => {
		const res = await axios.post('http://localhost:3000/landing-page', {
			jwt_auth: email})
		setInfo(res.data);
		console.log("PAGE_INFO FUNCTION", info);
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
			<div className='bg-custon-roxo '>
				{currentChat === true ? <ChatPrivate /> : null}
				{info && <MiniPerfil data={info} showChat={showChat}/>}
			</div>
		</div>
	);
}
