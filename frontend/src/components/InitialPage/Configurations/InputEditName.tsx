import { CiEdit } from "react-icons/ci";
import { MdOutlineAddAPhoto } from "react-icons/md";

export default function InputEditName() : JSX.Element {
	return (
		<div className={'d-flex justify-content-between w-100 animation-div-nickname'}>
			<div className="d-flex">
				<input
					className="remove-format-input p-0"
					type="text"
					id="editNameInput"
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
					placeholder='Photo'
				/>
				<MdOutlineAddAPhoto size={35} type="button" />
			</div>
		</div>

	)
}
