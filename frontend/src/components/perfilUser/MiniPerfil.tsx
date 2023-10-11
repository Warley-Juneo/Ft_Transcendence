import './perfil.css';
import MiniPerfilUser from './MiniPerfilUser';
import Options from './options';
import ListFriends from './listFriends';

export default function MiniPerfil(props: any) {
	console.log("MiniPerfil ", props);
	return (
		<div className='perfil text-white'>
			<MiniPerfilUser userdata={props.data} />
			<hr className='m-0 w-100'></hr>
			<Options />
			<ListFriends chat={props.showChat}/>
		</div>
	);
}
