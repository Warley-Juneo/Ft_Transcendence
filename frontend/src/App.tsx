import './index.css';
import { Login } from './components/LoginPage/Login';
import InicialPage from './components/InitialPage/InitialPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListChats from './components/PublicChatsPage/PublicChats';
import ChatPublic from './components/ChatsGame/ChatPublic/ChatPublic';
import Ranking from './components/Rankingpage/Ranking';
import LoginFake from './components/LoginPage/LoginFake';
import ProfileScreen from './components/Profiles/ProfilePage/ProfilePage';
import Game from './components/GamePage/Game/Game';

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={< Login /> } />
					<Route path='/fake' element={< LoginFake /> } />
					<Route path='/game/' element={< InicialPage /> } >
						<Route path='game' element={<Game />} />
						<Route path='profile' element={<ProfileScreen />} />
						<Route path='chats/:chatName' element={<ChatPublic />} />
						{/* <Route path='chats' element={<ListChats />} /> */}
						{/* <Route path='ranking' element={<Ranking />} /> */}
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}
