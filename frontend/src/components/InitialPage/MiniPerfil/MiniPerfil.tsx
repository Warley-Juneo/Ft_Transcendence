import MiniPerfilUser from './MiniPerfilUser';
import Options from './options';
import ListFriends from './ListFriends';

export default function MiniPerfil() {
	return (

		<aside className='bg-custon-roxo d-flex flex-column h-100' style={{ minWidth: '15vw' }}>
			<MiniPerfilUser />
			<hr className='m-0 w-100 text-white'></hr>
			<Options />
			<ListFriends/>
		</aside>
	);
}
