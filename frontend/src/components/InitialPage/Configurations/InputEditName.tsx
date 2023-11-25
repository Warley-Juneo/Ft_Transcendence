import { RefObject } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineAddAPhoto } from "react-icons/md";

type InputEditNameProps = {
	newNickname: RefObject<HTMLInputElement>;
	newAvatar: RefObject<HTMLInputElement>;
}
export default function InputEditName(props: InputEditNameProps): JSX.Element {
	return (
		<div className={'d-flex justify-content-between w-100 animation-div-nickname'}>
			<div className="d-flex">
				<input
					className="remove-format-input p-0"
					type="text"
					id="editNameInput"
					placeholder='nickName'
					ref={props.newNickname}
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
					placeholder='Photo'
				/>
				<MdOutlineAddAPhoto size={35} type="button" />
			</div>
		</div>

	)
}
