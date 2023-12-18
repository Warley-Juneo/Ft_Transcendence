import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthLogin } from './authLogin';
import { Navigate } from 'react-router';
import './style.css';

export function Login() {

	const [auth, setAuth] = useState(false);

	//ACCESS BACKEND AFTER GET THE CODE AT
	async function axios_connect(): Promise<void> {
		let paramters = new URLSearchParams(window.location.search);
		let code = paramters.get('code');
		if (code) {
			await axios.post('http://localhost:3000/auth', {
				authCode: code,
			})
				.then((response) => {
					if (response.status === 201) {
						Cookies.set('jwtToken', response.data._access_token);// set expires time
						Cookies.set('email', response.data._email);
						setAuth(true);
					}
					else {
						console.log("RENDERIZAR PAGINA LOGIN INFORMANDO O ERRO");
					}
				})
		}
	}

	//THIS FUNCTION IS EXECUTED EVERY TIME THE PAGE IS LOADED
	useEffect(() => {
		axios_connect();
	}, []);

	return (
		<div className="login  ">
			<div className="form_container">
				<form>
					<h3 className="text-center">Sign in</h3>
					<div className="d-grid">
						<button onClick={AuthLogin}>Sign in</button>
					</div>
				</form>
			</div>
			{auth && <Navigate to='/game/' replace={true} />}
		</div>
	);
}
