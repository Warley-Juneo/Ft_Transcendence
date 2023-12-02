import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import MiniPerfilUser from './MiniPerfilUser';
import Options from './options';
import ListFriends from './ListFriends';
import { Players } from './ListFriends';


export default function MiniProfile() {
	const [players, setPlayers] = useState<Players[]>([]);

	function getPlayers(route: string) {
		axios.get(route, {
			headers: {
				Authorization: Cookies.get('jwtToken'),
			}
		}).then((res) => {
			setPlayers(res.data.users);
			console.log("Users: ", res.data.users);
		}).catch((err) => {
			console.log(err);
		})
	}

	useEffect(() => {
		getPlayers('http://localhost:3000/users/friends');
	}, []);

	return (
		<div className='bg-custon-roxo d-flex flex-column h-100' style={{ minWidth: '15vw' }}>
			<MiniPerfilUser />
			<hr className='m-0 w-100 text-white'></hr>
			<Options getPlayers={getPlayers} />
			<ListFriends players={players} getPlayers={getPlayers} />
		</div>
	);
}

