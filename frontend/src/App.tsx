import './index.css';
import { Login } from './components/login/Login';
import InicialPage from './components/InitialPage/InitialPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={< Login /> } />
					<Route path='/game' element={< InicialPage />  } />
				</Routes>
			</BrowserRouter>
		</div>
	)
}
