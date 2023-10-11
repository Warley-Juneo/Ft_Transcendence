import './perfil.css';
import PerfilUser from './perfilUser';
import Options from './options';
import ListFriends from './listFriends';

function Perfil(propos) {
	return (
		<div className='perfil text-white'>
			<PerfilUser />
			<hr className='m-0 w-100'></hr>
			<Options />
			<ListFriends chat={propos.showChat}/>
		</div>
	);
}

export default Perfil;
