import './index.css';
import { Login } from './components/login/Login';
import InicialPage from './components/InitialPage/InitialPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileScreen from './components/profileScreen/ProfileScreen';
import ListChats from './components/listChats/ListChats';

export default function App() {

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={< Login /> } />
					<Route path='/game/' element={< InicialPage /> } >
						<Route path='profile' element={<ProfileScreen />} />
						<Route path='chats' element={<ListChats />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}
