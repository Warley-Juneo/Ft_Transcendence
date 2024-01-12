import { IoMdArrowDropdown, IoMdExit } from 'react-icons/io';
import { UserData, socket } from '../../InitialPage/Contexts/Contexts';
import React, { useContext, useState } from 'react';
import Status from './PlayersStatus';
import { MdModeEdit } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type propsMiniProfile = {
	showMiniPerfil: React.Dispatch<React.SetStateAction<string>>;
	showConfigurations: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MiniPerfilUser(props: propsMiniProfile) {
	const userData = useContext(UserData).user;
	const [optionsConf, setOptionsConf] = useState<boolean>(false);
	const navitaion = useNavigate();

	const selectConfiuration = (): JSX.Element => {
		const cursoPointer: React.CSSProperties = {
			cursor: 'pointer',
		}
		return (
			<div className='bg-light text-black p-3 rounded z-2 position-relative'>
				<div className='border-bottom'
					style={cursoPointer}
					onClick={() => props.showConfigurations(true)}
				>
					<p><MdModeEdit className='m-1' />Editar Profile</p>
				</div>
				<div className='border-bottom'
					style={cursoPointer}
					onClick={() => disconnect()}
				>
					<p><IoMdExit className='m-1' />Lougot</p>
				</div>
				<div className='border-bottom'
					style={cursoPointer}
					onClick={() => props.showMiniPerfil('')}
				>
					<p><AiOutlineClose className='m-1' />Close</p>
				</div>
			</div>
		)
	}

	const disconnect = () => {
		let aux = {
			user_id: userData.id,
			is_active: false,
		}
		socket.emit('check-status', aux);
		Cookies.remove('jwtToken');
		navitaion('/');
	}

	if (userData.nickname === '' || userData.avatar === '') {
		return (
			<div className='d-flex p-3' style={{ height: '15vh' }}>
				<div className="spinner-border text-primary m-auto h-75" role="status">
					<span className="visually-hidden m-auto">Loading...</span>
				</div>
			</div>
		);
	}
	return (
		<div className='d-flex p-3 text-white' style={{ height: '15vh' }}>
			<div className='h-100 d-flex align-items-center'>
				<img className="rounded-circle h-100 w-100 me-3" src={userData.avatar} alt='foto' />
				<Status is_active={true} name={userData.nickname} id={userData.id} admin={[]} />
			</div>
			<div className='ms-auto'>
				<IoMdArrowDropdown
					className="d-flex m-auto"
					type='button'
					size={30}
					onClick={() => setOptionsConf(!optionsConf)}
				/>
				{optionsConf ? selectConfiuration() : null}
			</div>
		</div>
	)
}
