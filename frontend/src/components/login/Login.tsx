import { useEffect } from 'react';
import './style.css';
import { AuthLogin } from './authLogin';
import axios from 'axios';

export function Login(props: any) {

	//ACCESS BACKEND AFTER GET THE CODE AT API42
	async function axios_connect(props: any): Promise<any> {
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
						props.initialPage(response.data);
					}
					else {
						console.log("RENDERIZAR PAGINA LOGIN INFORMANDO O ERRO");
					}
				})
		}
		return response;
	}

	//THIS FUNCTION IS EXECUTED EVERY TIME THE PAGE IS LOADED
	useEffect(() => {
		axios_connect(props);
	}, [props]);

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
