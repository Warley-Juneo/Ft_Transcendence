import { useState } from "react";
import { IconType } from "react-icons";
import InputButton from "./InputButton";
import axios from "axios";
import Cookies from "js-cookie";

type KickMemberProps = {
	Icon: IconType;
	content: string;
}

export default function KickMember(props: KickMemberProps): JSX.Element {
	const [showInput, setShowInput] = useState<boolean>(false);

	const kickedMember = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key !== 'Enter') return;
		console.log("\nkickedMember\n\n");
		const userId = getUserId(event.currentTarget.value);
		if (userId) {
			axios.post('http://localhost:3000/chatroom/kick-member-group', {
				add_id: userId,
				chat_name: name,
			}, {
				headers: {
					Authorization: Cookies.get("jwtToken")
				}, timeout: 5000
			}).then((res) => {
				setDataChat(res.data);
			}).catch((err) => {
				console.log(err);
			})
		}
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
						<input className="form-check-input" type="radio" name="flexRadioDefault" value={1} id="flexRadioDefault1">
						</input>
					</div>
					<div className="form-check">
						<label className="form-check-label" htmlFor="flexRadioDefault2">
							1 Dia
						</label>
						<input className="form-check-input" type="radio" name="flexRadioDefault" value={24} id="flexRadioDefault2" checked>
						</input>
					</div>
					<input className="remove-format-input" type="text" name="user" placeholder="Digite o nome do usuario" />
				</div>
			}

		</>

	)
}
