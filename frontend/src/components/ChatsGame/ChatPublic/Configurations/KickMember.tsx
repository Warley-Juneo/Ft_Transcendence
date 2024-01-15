import { useRef, useState } from "react";
import { IconType } from "react-icons";
import InputButton from "./InputButton";
import { socket } from "../../../InitialPage/Contexts/Contexts";

type KickMemberProps = {
	Icon: IconType;
	content: string;
	getUserId: (nickname: string) => string;
	my_id: string;
	chat_name: string;
	chat_id: string;
}

export default function KickMember(props: KickMemberProps): JSX.Element {
	const [showInput, setShowInput] = useState<boolean>(false);
	const kickHour = useRef<HTMLInputElement>(null);
	const kickDay = useRef<HTMLInputElement>(null);

	const kickedMember = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key !== 'Enter') return;
		const userId = props.getUserId(event.currentTarget.value);

		let obj = {
			my_id: props.my_id,
			other_id: userId,
			chat_name: props.chat_name,
			chat_id: props.chat_id,
			time: kickHour.current?.checked ? 1 : 24,
		}
		socket.emit('kick-member-group', obj);
	}

	return (
		<>
			<h5 className="p-2 hover" onClick={() => setShowInput(!showInput)}>
				<props.Icon className="foto-list-friends bg-light text-black me-3 p-1" size={30} />
				{props.content}
			</h5>

			{!showInput ? null :
				<div className="ps-5">
					<div className="form-check">
						<label className="form-check-label" htmlFor="flexRadioDefault1">
							1 Hora
						</label>
						<input className="form-check-input"
							type="radio"
							name="flexRadioDefault"
							id="flexRadioDefault1"
							ref={kickHour}>
						</input>
					</div>
					<div className="form-check">
						<label className="form-check-label" htmlFor="flexRadioDefault2">
							1 Dia
						</label>
						<input
							className="form-check-input"
							type="radio"
							name="flexRadioDefault"
							id="flexRadioDefault2"
							ref={kickDay}
							checked>
						</input>
					</div>
					<InputButton function={kickedMember} />
				</div>
			}

		</>

	)
}
