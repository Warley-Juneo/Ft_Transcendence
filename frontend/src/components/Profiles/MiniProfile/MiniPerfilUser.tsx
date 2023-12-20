import { IoMdArrowDropdown, IoMdExit } from 'react-icons/io';
import { UserData, socket } from '../../InitialPage/Contexts/Contexts';
import { StatusOnline } from "./PlayersStatus";
import { useContext, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import ConfigurationGame from './Configurations/Configurations';

export default function MiniPerfilUser() {
	const userData = useContext(UserData).user;
	const [optionsConf, setOptionsConf] = useState<boolean>(false);
	const [showConfigurations, setShowConfigurations] = useState<boolean>(false);

	const selectConfiuration = (): JSX.Element => {
		const cursoPointer: React.CSSProperties = {
			cursor: 'pointer',
		}
		return (
			<div className='bg-light text-black p-3 rounded'>
				<div className='border-bottom'
					style={cursoPointer}
					onClick={() => setShowConfigurations(!showConfigurations)}
				>
					<p><MdModeEdit className='m-1' />Editar Profile</p>
				</div>
				<div className='border-bottom'
					style={cursoPointer}
					onClick={() => disconnect()}
				>
					<p><IoMdExit className='m-1' />Lougot</p>
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
				{StatusOnline(userData.nickname)}
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
			{showConfigurations ? <ConfigurationGame /> : null}
		</div>
	)
}
