
import React, { useState } from 'react';
import Perfil from '../perfilUser/perfil.js';
import ChatPrivate from '../chat/chatPrivate';
import BarOptions from '../barOptions/BarOptions';
import ListGroups from '../listGroups/listGroups';
import ProfileScreen from '../profileScreen/ProfileScreen';

function InicialPage() {
	const [currentScreen, setCurrentScreen] = useState('');
	const [currentChat, setCurrentChat] = useState(false);

	function showProfileScreen() {
		setCurrentScreen('profileScreen');
	}

	function showListChats() {
		setCurrentScreen('listChats');
	}

	function showChat() {
		setCurrentChat(currentChat === false ? true : false );
	}

	return (
		<div className='d-flex' id='home-screen'>
			<div className='d-flex flex-column tela-left'>
				<BarOptions
					showListChats={showListChats}
					showProfileScreen={showProfileScreen}
				/>
				<hr className='m-0 text-white'></hr>
				{currentScreen === 'listChats' ? <ListGroups /> : null}
				{currentScreen === 'profileScreen' ? <ProfileScreen /> : null}
			</div>
			<div className="d-flex justify-content-end col">
				{currentChat === true ? <ChatPrivate /> : null}
				<Perfil showChat={showChat} />
			</div>
		</div>
	);
}

export default InicialPage;
