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

export default function ConfigurationGame(): JSX.Element {
	const [handleOption, setHandleOption] = useState<boolean>(false);

	const dataUser = useContext(UserData);

	const editProfile = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);

		const avatarInput = event.currentTarget.querySelector('input[name="avatar"]') as HTMLInputElement;
		const avatarFile = avatarInput.files?.[0];
		const nickname = form.get('nickname');

		if (avatarFile) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64 = reader.result;
					axios.post('http://localhost:3000/users/updateProfile', {
						nick_name: nickname,
						avatar: base64,
					}, {
						headers: {
							Authorization: Cookies.get('jwtToken'),
						}
					}).then((res) => {
						setHandleOption(!handleOption);
						dataUser.updateDataUser();
					})
			}
			reader.readAsDataURL(avatarFile);
		}

	}

	const getCorrectDiv = (isEditing: boolean) => {
		if (isEditing) return <InputEditName/>
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

	return (
		<div className='position-absolute top-50 start-50 translate-middle p-2 rounded'
			style={{ backgroundColor: '#653b1e', width: '600px' }}
		>
			<h2 className='text-center text-white'>Game Settings</h2>
			<form onSubmit={editProfile} className='bg-white rounded p-5'>
				<div className='div-nickname'>
					{getCorrectDiv(handleOption)}
				</div>
				<div className="d-flex justify-content-center">
					{getCorrectButton(handleOption)}
				</div>
				<AudioRanger />
			</form>
			<FolderSettingsGame />
		</div>
	)
}
