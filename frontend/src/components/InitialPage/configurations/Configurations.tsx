import { MdOutlineAddAPhoto } from "react-icons/md";
import { AiOutlineSound } from "react-icons/ai";
import { BsSoundwave } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { useContext, useRef, useState } from 'react';
import { DataUser } from "../InitialPage";
import ButtonEdit from "./ButtonEdit";
import AudioRanger from "./AudioRanger";
import FolderSettingsGame from "./Folder";
import './animationConfigurationGame.css';


export default function ConfigurationGame() {
	const [handleOption, setHandleOption] = useState<boolean>(false);
	const newInputName = useRef<HTMLInputElement>(null);
	const newAvatar = useRef<HTMLInputElement>(null);

	const user = useContext(DataUser);

	const EditProfile = () => {
		user._nickname = 'teste'
		console.log(newInputName.current?.value);
		user._nickname = newInputName.current?.value || user._nickname;
		user._avatar = newAvatar.current?.value || user._avatar;
	}

	const addedInputNameDef180 = () => {
		setHandleOption(!handleOption);
	};

	const renderNameSection = () => {
		const containerClasses = `d-flex justify-content-between w-100`;
		if (handleOption) {
			return (
				<div className={`${containerClasses} animation-div-nickname`}>
					<div className="d-flex">
						<input
							className="remove-format-input p-0"
							type="text"
							id="editNameInput"
							ref={newInputName}
							placeholder='nickName'
						/>
						<label htmlFor="editNameInput">
							<CiEdit size={35} type="button" />
						</label>
					</div>
					<div className="d-flex">
						<input
							className="remove-format-input p-0"
							type="text"
							id="editPhotoInput"
							ref={newAvatar}
							placeholder='Photo'
						/>
						<MdOutlineAddAPhoto size={35} type="button" />
					</div>
				</div>

			);
		}
		else {
			return (
				<div className={containerClasses}>
					<p className="d-flex align-items-center">{user._nickname}</p>
					<img src={user._avatar} alt={`avatar do ${user._nickname}`} />
				</div>
			);
		}
	};

	return (
		<div className='position-absolute top-50 start-50  p-2 rounded' style={{ backgroundColor: '#653b1e', width: '600px' }}>
			<h2 className='text-center text-white'>Game Settings</h2>
			<div className='bg-white rounded p-5'>
				<div>
					<div className='div-nickname'>
						{renderNameSection()}
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
