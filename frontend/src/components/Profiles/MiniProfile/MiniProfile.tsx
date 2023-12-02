import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import MiniPerfilUser from './MiniPerfilUser';
import Options from './options';
import ListFriends from './ListFriends';
import { Players } from './ListFriends';
import { socket } from '../../InitialPage/Contexts/Contexts';
import { IoSettingsOutline } from 'react-icons/io5';
import ConfigurationGame from '../../InitialPage/Configurations/Configurations';


export default function MiniProfile() {
	const [players, setPlayers] = useState<Players[]>([]);
	const [showConfigurations, setShowConfigurations] = useState<boolean>(false);

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

	const disconnect = () => {
		let aux = {
			user_id: "1ed367e7-5e7e-432e-a7fd-603dc91223dc",
			is_active: false,
		}
		socket.emit('check-status', aux);
	}

	useEffect(() => {
		getPlayers('http://localhost:3000/users/friends');
	}, []);

	useEffect(() => {
		socket.on('checkStatus', (data: any) => {
			getPlayers('http://localhost:3000/users/friends');
		})
	}, [socket])

	return (
		<div className='bg-custon-roxo d-flex flex-column h-100' style={{ minWidth: '15vw' }}>
						<IoSettingsOutline
				className="position-absolute top-0 end-0 m-3 text-white"
				type='button'
				size={30}
				onClick={() => setShowConfigurations(!showConfigurations)}
			/>
			{showConfigurations ? <ConfigurationGame /> : null}

			<MiniPerfilUser />
			<hr className='m-0 w-100 text-white'></hr>
			<Options getPlayers={getPlayers} />
			<ListFriends players={players} getPlayers={getPlayers} />
			<div>
				{/* botão de desconect */}
				<button className='btn btn-danger w-100' onClick={disconnect}>
					Disconnect
				</button>
			</div>
		</div>
	);
}

