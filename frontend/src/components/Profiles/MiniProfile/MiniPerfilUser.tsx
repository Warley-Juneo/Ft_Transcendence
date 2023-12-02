import { IoMdArrowDropdown, IoMdExit } from 'react-icons/io';
import { UserData, socket } from '../../InitialPage/Contexts/Contexts';
import { StatusOnline } from "./PlayersStatus";
import { useContext, useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import ConfigurationGame from './Configurations/Configurations';

const cssSelect: React.CSSProperties = {
	backgroundColor: 'transparent',
	border: 'none',
	color: 'white',
	fontSize: '1.5rem',
	outline: 'none !important',
};

export default function MiniPerfilUser() {
	const dataUser = useContext(UserData);
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
			user_id: "1ed367e7-5e7e-432e-a7fd-603dc91223dc",
			is_active: true,
		}
		socket.emit('check-status', aux);
	}

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
		<div className='d-flex p-3 text-white' style={{ height: '15vh' }}>
			<div className='h-100 d-flex align-items-center'>
				<img className="rounded-circle h-100 w-100 me-3" src={dataUser.user.avatar} alt='foto' />
				{StatusOnline(dataUser.user.nickname)}
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
