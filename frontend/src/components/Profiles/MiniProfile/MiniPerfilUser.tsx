import { DataUser } from "../../InitialPage/InitialPage";
import { StatusOnline } from "./PlayersStatus";
import { useContext } from 'react';


export default function MiniPerfilUser() {
	const dataUser = useContext(DataUser);

	if (dataUser.user.nickname === '' || dataUser.user.avatar === '') {
		return (
			<div className='d-flex p-3' style={{ height: '15vh' }}>
				<div className="spinner-border text-primary m-auto h-75" role="status">
					<span className="visually-hidden m-auto">Loading...</span>
				</div>
			</div>
		);
	}
	return (
		<div className='d-flex p-3' style={{ height: '15vh' }}>
			<div className='h-100 d-flex text-white align-items-center'>
				<img className="rounded-circle h-100 w-100 me-3" src={dataUser.user.avatar} alt='foto' />
				{StatusOnline(dataUser.user.nickname)}
			</div>
		</div>
	)
}
