import { useEffect, useState } from 'react';
import './style.css';
import { AuthLogin } from './authLogin';
import axios from 'axios';
import { Navigate } from 'react-router';

export function Login() {

	const [auth, setAuth] = useState(false);
	const [data, setData] = useState(null);

	//ACCESS BACKEND AFTER GET THE CODE AT 
	async function axios_connect(): Promise<void> {
		let paramters = new URLSearchParams(window.location.search);
		let code = paramters.get('code');
		if (code) {
			var response = await axios.post('http://localhost:3000/auth', {
				authCode: code,
			})
				.then((response) => {
					console.log(response);
					if (response.status === 201) {
						console.log('RENDERIZAR A PÀGINA DO GAME');
						setData(response.data);
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
			{auth && <Navigate to='/game' state={data} replace={true} />}
		</div>
	);
}
