import StatusOnline from "./StatusOnline";
import { useContext, useEffect, useState } from 'react';
import {DataUser} from '../InitialPage';


export default function MiniPerfilUser() {
	const info = useContext(DataUser);

	if (info._nickname === '' || info._avatar === '') {
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
				<img className="rounded-circle h-100 w-100 me-3" src={info._avatar} alt='foto' />
				{StatusOnline(info._nickname)}
			</div>
		</div>
	)
}
