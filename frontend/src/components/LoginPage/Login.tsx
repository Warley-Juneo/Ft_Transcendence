import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthLogin } from './authLogin';
import { useNavigate } from 'react-router';
import './style.css';

export function Login() {
	const navigate = useNavigate();

	//ACCESS BACKEND AFTER GET THE CODE AT
	async function axios_connect(): Promise<void> {
		let paramters = new URLSearchParams(window.location.search);
		let code = paramters.get('code');
		if (code) {
			await axios.post(`${process.env.REACT_APP_HOST_URL}/auth`, {
				authCode: code,
			}, {
				timeout: 5000,
			}).then((response) => {
				if (response.status === 201) {
					console.log("RENDERIZAR PAGINA DE LOGIN")
					Cookies.set('jwtToken', response.data._access_token);// set expires time
					Cookies.set('email', response.data._email);
					navigate('/game')
				}
				else {
					console.log("RENDERIZAR PAGINA LOGIN INFORMANDO O ERRO");
				}
			}).catch((err) => {
				console.log(err);
			})
		}
	}

	//THIS FUNCTION IS EXECUTED EVERY TIME THE PAGE IS LOADED
	useEffect(() => {
		if (Cookies.get('jwtToken')) {
			console.log("entrei")
			navigate('/game')
		}
		else {
			axios_connect();
		}
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
		</div>
	);
}
