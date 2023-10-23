import MiniPerfilUser from './MiniPerfilUser';
import Options from './options';
import ListFriends from './ListFriends';
import './MiniPerfil.css'

export default function MiniPerfil(props: any) {
	return (
		<div className='perfil bg-custon-roxo d-flex flex-column h-100' style={{minWidth: '15vw'}}>
			<MiniPerfilUser userdata={props.data} />
			<hr className='m-0 w-100 text-white'></hr>
			<Options />
			<ListFriends chat={props.showChat}/>
		</div>
	);
}
