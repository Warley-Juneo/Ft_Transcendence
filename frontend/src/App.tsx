import './index.css';
import React, { useState } from 'react';
import { Login } from './components/login/Login';
import InicialPage from './components/InitialPage/InitialPage';

export default function App() {
	const [page, setPage] = useState('login');
  	const [backRes, setBackRes] = useState({});

	function handleInitialPage(loginRes: object) {
		setPage('initialPage');
    setBackRes(loginRes);
  }

	return (
		<div className="App">
			{ page === 'login' ? <Login initialPage={handleInitialPage} /> : <InicialPage  data={backRes} />}
		</div>
	);
}
