import './index.css';
import { Login } from './components/LoginPage/Login';
import InicialPage from './components/InitialPage/InitialPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileScreen from './components/ProfilePage/ProfilePage';
import ListChats from './components/PublicChatsPage/PublicChats';
import ChatPublic from './components/ChatsGame/ChatPublic/ChatPublic';
import Ranking from './components/Rankingpage/Ranking';
import Game from './components/GamePage/Game';

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={< Login /> } />
					<Route path='/game/' element={< InicialPage /> } >
						<Route path='start-game' element={<Game />} />
						<Route path='profile' element={<ProfileScreen />} />
						<Route path='chats' element={<ListChats />} />
						<Route path='chats/:chatName' element={<ChatPublic />} />
						<Route path='ranking' element={<Ranking />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}
