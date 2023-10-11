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

			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
		</div>
	);
}
