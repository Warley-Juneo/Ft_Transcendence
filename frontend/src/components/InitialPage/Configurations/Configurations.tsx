import { AiOutlineSound } from "react-icons/ai";
import { BsSoundwave } from "react-icons/bs";
import { useContext, useRef, useState } from 'react';
import IdentifyInputName from "./IdentifyInputName";
import InputEditName from "./InputEditName";
import { DataUser } from "../InitialPage";
import ButtonEdit from "./ButtonEdit";
import AudioRanger from "./AudioRanger";
import FolderSettingsGame from "./Folder";
import './animationEditInputName.css';

export default function ConfigurationGame() {
	const [handleOption, setHandleOption] = useState<boolean>(false);

	const user = useContext(DataUser);

	const EditProfile = () => {
	}

	const addedInputNameDef180 = () => {
		setHandleOption(!handleOption);
	};

	return (
		<div className='position-absolute top-50 start-50 p-2 rounded' style={{ backgroundColor: '#653b1e', width: '600px' }}>
			<h2 className='text-center text-white'>Game Settings</h2>
			<div className='bg-white rounded p-5'>
				<div>
					<div className='div-nickname'>
						{!handleOption ?
							<IdentifyInputName
								_avatar={user._avatar}
								_nickname={user._nickname}
							/> :
							<InputEditName />
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
