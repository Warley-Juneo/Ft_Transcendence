import './index.css';
import React, { useState } from 'react';
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


	// 	const [page, setPage] = useState('login');
//   	const [backRes, setBackRes] = useState({});

// 	function handleInitialPage(loginRes: object) {
// 		setPage('initialPage');
//     setBackRes(loginRes);
//   }

// 	return (
// 		<div className="App">
// 			{ page === 'login' ? <Login initialPage={handleInitialPage} /> : <InicialPage  data={backRes} />}
// 		</div>
// 	);
}
