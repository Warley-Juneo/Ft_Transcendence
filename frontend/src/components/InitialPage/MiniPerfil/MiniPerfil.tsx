import MiniPerfilUser from './MiniPerfilUser';
import Options from './options';
import ListFriends from './ListFriends';

export default function MiniPerfil(props: any) {
	if (!props.data) {
		return (
			<div className='d-flex bg-custon-roxo h-100' style={{ minWidth: '15vw' }}>
				<div className="spinner-border text-primary m-auto h-25" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		)
	}
	return (

		<div className='bg-custon-roxo d-flex flex-column h-100' style={{ minWidth: '15vw' }}>
			<MiniPerfilUser userdata={props.data} />
			<hr className='m-0 w-100 text-white'></hr>
			<Options />
			<ListFriends chat={props.showChat} />
		</div>
	);
}
