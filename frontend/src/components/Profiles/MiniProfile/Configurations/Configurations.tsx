import { UserData } from '../../../InitialPage/Contexts/Contexts';
import { FormEvent, useContext, useState } from 'react';
import IdentifyInputName from "./IdentifyInputName";
import InputEditName from "./InputEditName";
import FolderSettingsGame from "./Folder";
import AudioRanger from "./AudioRanger";
import ButtonsConf from "./ButtonsConf";
import './animationEditInputName.css';
import Cookies from "js-cookie";
import axios from "axios";
import ButtonEdit from './ButtonsEdit';
import { IoIosClose } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import { TIMEOUT } from 'dns';

type propsConfigurationGame = {
	closed: React.Dispatch<React.SetStateAction<boolean>>;
}

type infoUpdate = {
	nickname: string,
	avatar: string,
	twoFA: boolean,
}

export default function ConfigurationGame(props: propsConfigurationGame): JSX.Element {
	const [handleOption, setHandleOption] = useState<boolean>(false);
	const [QRCODE, setQRCODE] = useState<string>('');
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);

	const handleShow = () => {
		const checkbox = document.querySelector('#flexSwitchCheckDefault') as HTMLInputElement;
		if (!checkbox || !checkbox.checked) {
			console.log("Desabilitar 2FA")
			axios.post('https://21f6-2804-14c-1a8-a325-fbe4-507a-840b-f839.ngrok-free.app/2FA/clear', {}, {
				headers: {
					Authorization: Cookies.get('jwtToken'),
					"ngrok-skip-browser-warning": "69420"
				},
			}).then((res) => {
				console.log(res);
				setTfaEnabled(false);
			}).catch((err) => {
				console.log(err);
			})
			return;
		}
		getQRCODE();
		setShow(true);
	}

	useEffect(() => {
		  verifyEnabled();
	}, []);

	const dataUser = useContext(UserData);
	function sendInfosUserBack(info: infoUpdate) {
		if (dataUser.user.twoFA === false && info.twoFA === true) {
			getQRCODE();
		}

		console.log(info);
		axios.post('https://21f6-2804-14c-1a8-a325-fbe4-507a-840b-f839.ngrok-free.app/users/updateProfile', info, {
			headers: {
				Authorization: Cookies.get('jwtToken'),
				"ngrok-skip-browser-warning": "69420"
			}
		}).then((res) => {
			setHandleOption(!handleOption);
			dataUser.updateDataUser();
			console.log(res);
		}).catch((err) => {
			console.log(err);
		})
	}

	const editProfile = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);

		const avatarInput = event.currentTarget.querySelector('input[name="avatar"]') as HTMLInputElement;
		const avatarFile = avatarInput.files?.[0];

		const nickname = form.get('nickname');
		const twoFA = form.get('2fa') === 'on' ? true : false;
		let fileBase64 = null;

		if (avatarFile) {
			const reader = new FileReader();
			reader.onloadend = () => {
				fileBase64 = reader.result;
			}
			reader.readAsDataURL(avatarFile);
		}
		console.log(nickname);
		let info: infoUpdate = {
			nickname: nickname ? nickname.toString() : '',
			avatar: fileBase64 ? fileBase64 : '',
			twoFA: twoFA,
		}
		sendInfosUserBack(info);
	}

	const getCorrectDiv = (isEditing: boolean) => {
		if (isEditing) return <InputEditName />
		return (
			<IdentifyInputName
				_avatar={dataUser.user.avatar}
				_nickname={dataUser.user.nickname}
			/>
		)
	}

	const getCorrectButton = (isEditing: boolean) => {
		if (isEditing) {
			return <ButtonEdit setEditProfile={setHandleOption} />
		}
		return (
			<ButtonsConf addedInputNameDef180={() => { setHandleOption(!handleOption) }}
				content='Edit'
			/>
		)
	}

	const getQRCODE = () => {
		axios.get('https://21f6-2804-14c-1a8-a325-fbe4-507a-840b-f839.ngrok-free.app/2FA', {
			headers: {
				Authorization: Cookies.get('jwtToken'),
				"ngrok-skip-browser-warning": "69420"
			}
		}).then((res) => {
			setQRCODE(res.data);
		}).catch((err) => {
			console.log(err);
		})
	}

	const verifyTwoFA = () => {
		let token = document.getElementById('input-token') as HTMLInputElement;
		if (token.value === '') {
			return;
		}
		console.log("Verificando 2FA");
		axios.post('https://21f6-2804-14c-1a8-a325-fbe4-507a-840b-f839.ngrok-free.app/2FA/validate', {
			token: token.value,
		}, {
			headers: {
				Authorization: Cookies.get('jwtToken'),
				"ngrok-skip-browser-warning": "69420"
			},
			timeout: 10000,
		}).then((res) => {
			if (res.data === true) {
				setTfaEnabled(true);
				handleClose();
			}
		}).catch((err) => {
			console.log(err);
		});
	}

	const [tfaEnabled, setTfaEnabled] = useState<boolean>(dataUser.user.twoFA);
	const verifyEnabled = () => {
		axios.get('https://21f6-2804-14c-1a8-a325-fbe4-507a-840b-f839.ngrok-free.app/2FA/verifyStatus', {
			headers: {
				Authorization: Cookies.get('jwtToken'),
				"ngrok-skip-browser-warning": "69420"
			},
		}).then((res) => {
			console.log(res);
			setTfaEnabled(res.data);
		}).catch((err) => {
			console.log(err);
		})
	}

	return (
		<div className='position-absolute top-50 start-50 translate-middle p-2 rounded'
			style={{ backgroundColor: '#653b1e', width: '600px' }}
		>
			<IoIosClose
				size={30}
				onClick={() => props.closed(false)}
				className='position-absolute top-0 end-0 m-2 cursor-pointer'
				type='button'
			/>
			<h2 className='text-center text-white'>Game Settings</h2>
			<div className='bg-white rounded p-5'>
				<form onSubmit={editProfile}>
					<div className='div-nickname'>
						{getCorrectDiv(handleOption)}
					</div>
					<div className="d-flex justify-content-center">
						{getCorrectButton(handleOption)}
					</div>
					<AudioRanger />
					<div className="d-flex form-check form-switch">
					<input
						className="form-check-input"
						type="checkbox"
						id="flexSwitchCheckDefault"
						onClick={handleShow}
						checked={tfaEnabled}
					/>
						<label className="form-check-label" htmlFor="flexSwitchCheckDefault">Deseja habilitar a atutenticação de 2 fatores?</label>
					</div>
				</form>
			</div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Habilitar Two Factor Authenticator</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='d-flex justify-content-center'>
						<img src={QRCODE} alt="QRCODE para autenticação 2FA" />
					</div>
					<input id='input-token' type="text" className="form-control" placeholder="Digite o codigo de verificação" aria-label="Recipient's username" aria-describedby="basic-addon2" />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Fechar modal
					</Button>
					<Button variant="primary" onClick={verifyTwoFA}>
						Salvar alterações
					</Button>
				</Modal.Footer>
			</Modal>
			<FolderSettingsGame />
		</div>
	)
}
