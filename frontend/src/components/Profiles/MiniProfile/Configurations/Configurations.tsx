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

type propsConfigurationGame = {
	closed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfigurationGame(props: propsConfigurationGame): JSX.Element {
	const [handleOption, setHandleOption] = useState<boolean>(false);

	const dataUser = useContext(UserData);

	//TODO: "Adicionar um tipo para info"
	function sendInfosUserBack(info: any) {
		console.log(info);
		axios.post('http://localhost:3000/users/updateProfile', info, {
			headers: {
				Authorization: Cookies.get('jwtToken'),
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
		console.log(fileBase64);
		let info = {
			nick_name: nickname,
			avatar: fileBase64 ? fileBase64: '',
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

	//TODO: "Verificar se o usuario ja habilitou"
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
			<form onSubmit={editProfile} className='bg-white rounded p-5'>
				<div className='div-nickname'>
					{getCorrectDiv(handleOption)}
				</div>
				<div className="d-flex justify-content-center">
					{getCorrectButton(handleOption)}
				</div>
				<AudioRanger />
				<div className="d-flex form-check form-switch">
					<input className="form-check-input me-4" name='2fa' type="checkbox" role="switch" id="flexSwitchCheckDefault"></input>
					<label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
				</div>
			</form>
			<FolderSettingsGame />
		</div>
	)
}
