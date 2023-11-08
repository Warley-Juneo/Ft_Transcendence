import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import MiniPerfilUser from './MiniPerfilUser';
import Options from './options';
import ListFriends from './ListFriends';
import { Players } from './ListFriends';


export default function MiniPerfil() {
	const [requerimentUrl, setRequerimentUrl] = useState<string>('http://localhost:3000/users/friends');
	const [players, setPlayers] = useState<Players[]>([]);

	useEffect(() => {
		console.log("requerimentUrl: ", requerimentUrl)
		if (requerimentUrl === '') {
			return;
		}
		axios.get(requerimentUrl, {
			headers: {
				Authorization: Cookies.get('jwtToken'),
			}
		})
		.then((res) => {
			setPlayers(res.data);
		})
		.catch((err) => {
			console.log(err);
		})
	}, [requerimentUrl]);

	return (
		<div className='bg-custon-roxo d-flex flex-column h-100' style={{ minWidth: '15vw' }}>
			<MiniPerfilUser />
			<hr className='m-0 w-100 text-white'></hr>
			<Options requerimentUrl={setRequerimentUrl} />
			<ListFriends players={players}/>
		</div>
	);
}
