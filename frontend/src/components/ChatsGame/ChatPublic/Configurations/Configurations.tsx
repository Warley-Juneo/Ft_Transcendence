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
import InputButton from "./InputButton";

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
	numberMembers: number,
}

export default function Configurations(props: propsConfigurations) {
	const [usersGame, setUsersGame] = useState<UsersGame[]>([]);
	const chatName: string = useParams().chatName as string;
	const navigate = useNavigate();

	const deleteChat = (e: any): void => {
		if (e.key !== 'Enter') return ;
		if (refInputs.current?.value !== chatName) return ;
		axios.delete('http://localhost:3000/chatroom/delete-group', {
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
			const user = usersGame.find((user) => user.nickname === refInputs.current?.value);
			if (user) {

				axios.post('http://localhost:3000/chatroom/add-member-group', {
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

	const [inputAddMember, setInputAddMember] = useState(false);
	const [inputRemoveMember, setInputRemoveMember] = useState(false);
	const [inputRemoverChat, setInputRemoverChat] = useState(false);
	const [inputAddADM, setInputAddADM] = useState(false);
	const refInputs = useRef<HTMLInputElement>(null);

	return (
		<div className="position-absolute bg-dark text-center rounded h-100 w-50 overflow-auto top-0 end-0">
			<Bar openOrClosedConf={props.openOrClosedConf} />
			<Perfil chatName={chatName}
				chatPhoto="https://i.etsystatic.com/37688069/r/il/d3e600/5143421340/il_600x600.5143421340_sm1f.jpg"
				numberMembers={props.numberMembers}
			/>
			<Rules rules={rules} />
			<div className="p-3 text-start">
				<ButtonConfiguration Icon={AiOutlineUserAdd}
					content="Adicionar Pessoas"
					function={() => { setInputAddMember(!inputAddMember) }}
				/>
				{!inputAddMember === true ? null :
					<InputButton newMember={refInputs}
						function={addedNewMember}
					/>
				}
				<ButtonConfiguration Icon={MdOutlinePersonAddDisabled}
					content="Remover Militante"
					function={() => { setInputRemoveMember(!inputRemoveMember) }}
				/>
				{!inputRemoveMember === true ? null :
					<InputButton newMember={refInputs}
						function={() => { }}
					/>
				}
				<ButtonConfiguration Icon={GiBroadDagger}
					content="Adicionar ADM"
					function={() => { setInputAddADM(!inputAddADM) }}
				/>
				{!inputAddADM === true ? null :
					<InputButton newMember={refInputs}
						function={() => { }}
					/>
				}
				<ButtonConfiguration Icon={MdDeleteSweep}
					content="Delete Chat"
					function={() => { setInputRemoverChat(!inputRemoverChat) }}
				/>
				{!inputRemoverChat === true ? null :
					<InputButton newMember={refInputs}
						function={deleteChat}
					/>
				}
			</div>
		</div>
	);
}
