import MiniPerfilUser from './MiniPerfilUser';
import Options from './options';
import ListFriends from './ListFriends';

export default function MiniPerfil(props: any) {
	return (
		<div className=' perfil d-flex flex-column mh-25' style={{minWidth: '15vw', height: '100vh'}}>
			<MiniPerfilUser userdata={props.data} />
			<hr className='m-0 w-100 text-white'></hr>
			<Options />
			<ListFriends chat={props.showChat}/>
		</div>
	);
}
