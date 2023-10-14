import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import MiniPerfil from '../perfilUser/MiniPerfil';
import ChatPrivate from '../chat/chatPrivate';
import BarOptions from '../barOptions/BarOptions';
import ListGroups from '../listGroups/listGroups';
import ProfileScreen from '../profileScreen/ProfileScreen';

export default function InicialPage() {
	const [currentScreen, setCurrentScreen] = useState('');
	const [currentChat, setCurrentChat] = useState(false);
	const [info, setInfo] = useState(null);

	const data = Cookies.get('login');
	console.log("INTIAL PAGE data: ", data);

	function showProfileScreen() {
		setCurrentScreen('profileScreen');
	}

	function showListChats() {
		setCurrentScreen('listChats');
	}

	function showChat() {
		setCurrentChat(currentChat === false ? true : false );
	}

	async function axios_connect(): Promise<void> {
		console.log("InitialPage Axios:", data);
		let paramters = new URLSearchParams(window.location.search);
		let code = paramters.get('code');
		if (code) {
			var response = await axios.post('http://localhost:3000/landing-page', {
				jwt_auth: data,
			})
				.then((response) => {
					console.log(response);
					if (response.status === 201) {
						console.log('RENDERIZAR A PÀGINA DO GAME...');
						setInfo(response.data);
					}
					else {
						console.log("RENDERIZAR PAGINA LOGIN INFORMANDO O ERRO");
					}
				})
		}
	}

	//THIS FUNCTION IS EXECUTED EVERY TIME THE PAGE IS LOADED
	axios_connect();



	return (
		<div className='d-flex' id='home-screen'>
			<div className='d-flex flex-column tela-left' id='left-screen'>
				<div id='main-nav-screen'>
					<BarOptions
						showListChats={showListChats}
						showProfileScreen={showProfileScreen}
					/>
				</div>
				<hr className='m-0 text-white'></hr>
				
				<div id='dynamic-screen'>
					{currentScreen === 'listChats' ? <ListGroups /> : null}
					{currentScreen === 'profileScreen' ? <ProfileScreen /> : null}
				</div>

			</div>
			<div className="d-flex justify-content-end col" id='nav-perfil'>
				{currentChat === true ? <ChatPrivate /> : null}
				<MiniPerfil showChat={showChat} data={data} />
			</div>
		</div>
	);
}
