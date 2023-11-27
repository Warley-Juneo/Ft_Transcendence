import { useNavigate, useParams } from "react-router-dom";
import { MdOutlinePersonAddDisabled, MdDeleteSweep } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { GiBroadDagger } from 'react-icons/gi';
import ButtonConfiguration from "./ButtonConfiguration";
import axios from "axios";
import Cookies from "js-cookie";
import Bar from "./Bar";
import Perfil from "./Perfil";
import Rules from "./Rules";
import GetUsersGame from "./GetUsersGame";
import React, { useEffect, useRef, useState } from "react";
import { DataChat } from "../ChatPublic";

const rules: string[] = [
	"2 anos de Free Fire",
	"5 anos de experiência",
	"Inglês, Português, Hebraico, Grego e Angolano...",
	"Assembly, C/C++, Java, Malbolge...",
	"MySQL, PostgreSQL, Oracle Database, Dynamo...",
]

type UsersGame = {
	id: string;
	nickname: string;
	avatar: string;
	is_active: boolean;
}

type propsConfigurations = {
	openOrClosedConf: () => void,
	setDataChat: React.Dispatch<React.SetStateAction<DataChat>>,
}

export default function Configurations(props: propsConfigurations) {
	const [showInputAddMember, setShowInputAddMember] = useState(false);
	const chatName: string = useParams().chatName as string;
	const newMember = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const [usersGame, setUsersGame] = useState<UsersGame[]>([]);

	const deleteChat = (): void => {
		axios.delete('http://localhost:3000/chatroom/delete-chatroom', {
			data: {
				chat_name: chatName,
			},
			headers: {
				Authorization: Cookies.get("jwtToken")
			},
		}).then((res) => {
			navigate("/game/chats");
		})
	}

	const addedNewMember = (e: any): void => {
		if (e.key === 'Enter') {
			const user = usersGame.find((user) => user.nickname === newMember.current?.value);

			if (user) {
				console.log("user: ", user.id);
				console.log("chatName: ", chatName);

				axios.post('http://localhost:3000/chatroom/add-member', {
					add_id: user.id,
					chat_name: chatName,
				}, {
					headers: {
						Authorization: Cookies.get("jwtToken")
					},
				}).then((res) => {
					props.setDataChat(res.data);
				}).catch((err) => {
					console.log(err);
				})
			}
		}
	}

	useEffect(() => {
		GetUsersGame().then((res) => {
			setUsersGame(res);
		})
	}, [])

	return (
		<div className="position-absolute bg-dark text-center rounded h-100 w-50 overflow-auto top-0 end-0">
			<Bar openOrClosedConf={props.openOrClosedConf} />
			<Perfil chatName={chatName}
				chatPhoto="https://i.etsystatic.com/37688069/r/il/d3e600/5143421340/il_600x600.5143421340_sm1f.jpg"
			/>
			<Rules rules={rules} />
			<div className="p-3 text-start">
				<ButtonConfiguration Icon={AiOutlineUserAdd}
					content="Adicionar Pessoas"
					function={() => { setShowInputAddMember(!showInputAddMember) }}
				/>
				{!showInputAddMember === true ? null :
					<input
						type="text"
						className="remove-format-input"
						placeholder="Nome da pessoa"
						ref={newMember}
						onKeyDown={addedNewMember}
					/>
				}

				<ButtonConfiguration Icon={MdOutlinePersonAddDisabled}
					content="Remover Militante"
					function={() => { }}
				/>
				<ButtonConfiguration Icon={GiBroadDagger}
					content="Adicionar ADM"
					function={() => { }}
				/>
				<ButtonConfiguration Icon={MdDeleteSweep}
					content="Delete Chat"
					function={deleteChat}

				/>
			</div>
		</div>
	);
}
