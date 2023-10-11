import './index.css';
import { useState } from 'react';
import Perfil from './components/perfilUser/perfil.js';
import ChatPrivate from './components/chat/chatPrivate';
import BarOptions from './components/barOptions/BarOptions';
import ListGroups from './components/listGroups/listGroups';
import ProfileScreen from './components/profileScreen/ProfileScreen';

function App() {
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
		<div className="App">
			<head>
				<meta charSet="utf-8"></meta>
				<meta name="viewport" content="width=device-width, initial-scale=1"></meta>
				<title>Bootstrap demo</title>
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
			</head>
			<body>
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
				<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
			</body>
		</div>
	);
}

export default App;
