import './index.css';
import { Login } from './components/LoginPage/Login';
import InicialPage from './components/InitialPage/InitialPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPublic from './components/ChatsGame/ChatPublic/ChatPublic';
import LoginFake from './components/LoginPage/LoginFake';
import Game from './components/GamePage/Game/Game';
import GamePong from './components/GamePage/GamePong/GamePong';

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/fake" element={<LoginFake />} />
					<Route path="/game/" element={<InicialPage />}>
						<Route path="gameLobby/" element={<Game />} />
						<Route path="pong/" element={<GamePong />} />
						{/* <Route path="chats/:chatName" element={<ChatPublic />} /> */}
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
