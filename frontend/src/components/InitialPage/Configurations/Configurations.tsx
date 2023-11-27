import { AiOutlineSound } from "react-icons/ai";
import { BsSoundwave } from "react-icons/bs";
import { useContext, useRef, useState } from 'react';
import IdentifyInputName from "./IdentifyInputName";
import InputEditName from "./InputEditName";
import ButtonEdit from "./ButtonEdit";
import AudioRanger from "./AudioRanger";
import FolderSettingsGame from "./Folder";
import Cookies from "js-cookie";
import './animationEditInputName.css';
import axios from "axios";
import { DataUser } from "../InitialPage";

export default function ConfigurationGame(): JSX.Element {
	const [handleOption, setHandleOption] = useState<boolean>(false);
	const dataUser = useContext(DataUser);
	const newNickname = useRef<HTMLInputElement>(null);
	const newAvatar = useRef<HTMLInputElement>(null);

	const EditProfile = () => {
		const nickName = newNickname.current?.value ? newNickname.current?.value : dataUser.user._nickname;
		const avatar = newAvatar.current?.value ? newAvatar.current?.value : dataUser.user._avatar;

		axios.post('http://localhost:3000/users/update', {
			nick_name: nickName,
			avatar: avatar,
		}, {
			headers: {
				Authorization: Cookies.get('jwtToken'),
			}
		}).then((res) => {
				setHandleOption(!handleOption);
				dataUser.updateDataUser();
			})
	}

	const addedInputNameDef180 = () => {
		setHandleOption(!handleOption);
	};

	return (
		<div className='position-absolute top-50 start-50 translate-middle p-2 rounded' style={{ backgroundColor: '#653b1e', width: '600px' }}>
			<h2 className='text-center text-white'>Game Settings</h2>
			<div className='bg-white rounded p-5'>
				<div>
					<div className='div-nickname'>
						{!handleOption ?
							<IdentifyInputName
								_avatar={dataUser.user._avatar}
								_nickname={dataUser.user._nickname}
							/> :
							<InputEditName
								newAvatar={newAvatar}
								newNickname={newNickname}
							/>
						}
					</div>
					<div className="d-flex justify-content-center">
						{!handleOption ? (
							<ButtonEdit addedInputNameDef180={addedInputNameDef180}
								content='Edit'
							/>
						) : (
							<>
								<ButtonEdit addedInputNameDef180={addedInputNameDef180}
									content='Cancel'
								/>
								<ButtonEdit addedInputNameDef180={EditProfile}
									content='Save'
								/>
							</>
						)}
					</div>
				</div>
				<AudioRanger Icone={AiOutlineSound} />
				<AudioRanger Icone={BsSoundwave} />
			</div>
			<FolderSettingsGame />
		</div>
	)
}
