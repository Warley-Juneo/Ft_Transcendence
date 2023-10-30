import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MiniPerfil from './MiniPerfil/MiniPerfil';
import ChatPrivate from '../ChatsGame/ChatPrivate/ChatPrivate';
import BarOptions from './barOptions/BarOptions';


export default function InicialPage() {
	const [currentChat, setCurrentChat] = useState(false);

	const showChat = () => {
		setCurrentChat(!currentChat);
	}

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
				{<MiniPerfil showChat={showChat}/>}
			</div>
		</div>
	);
}
