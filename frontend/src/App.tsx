import './index.css';
import React, { useState } from 'react';
import { Login } from './components/login/Login';
import InicialPage from './components/InitialPage/InitialPage';

function App() {
	const [page, setPage] = useState('login');

	function handleInitialPage(response: any) {
		setPage('initialPage');
	}

	return (
		<div className="App">
			{ page === 'login' ? <Login initialPage={handleInitialPage} /> : <InicialPage />}
			{ page === 'initialPage' ? <InicialPage /> : <Login />}

			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
		</div>
	);
}

export default App;
