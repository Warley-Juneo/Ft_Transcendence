import './index.css';
import { Login } from './components/LoginPage/Login';
import InicialPage from './components/InitialPage/InitialPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileScreen from './components/ProfilePage/ProfilePage';
import ListChats from './components/PublicChatsPage/ListPublicChats';
import ChatPublic from './components/ChatsGame/ChatPublic/ChatPublic';
import Ranking from './components/pageRanking/Ranking';

export default function App() {

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={< Login /> } />
					<Route path='/game/' element={< InicialPage /> } >
						<Route path='profile' element={<ProfileScreen />} />
						<Route path='chats' element={<ListChats />} />
						<Route path='chats/:id' element={<ChatPublic />} />
						<Route path='ranking' element={<Ranking />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}
