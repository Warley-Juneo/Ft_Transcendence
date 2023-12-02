import { MdOutlinePersonAddDisabled, MdDeleteSweep } from 'react-icons/md';
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonConfiguration from "./ButtonConfiguration";
import { AiOutlineUserAdd } from 'react-icons/ai';
import { GiBroadDagger } from 'react-icons/gi';
import { ChatContext } from "../ChatPublic";
import GetUsersGame from "./GetUsersGame";
import { MdBlock } from "react-icons/md";

import Cookies from "js-cookie";
import Perfil from "./Perfil";
import Rules from "./Rules";
import axios from "axios";
import Bar from "./Bar";
import AlterPassword from './AlterPassword';

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
}

export default function Configurations(props: propsConfigurations): JSX.Element {
	const { dataChat: { members, name }, setDataChat } = useContext(ChatContext);
	const [playersGame, setPlayersGame] = useState<UsersGame[]>([]);
	const chatName: string = useParams().chatName as string;
	const navigate = useNavigate();

	const getUserId = (nickname: string): string => {
		const getDataNickname = playersGame.find((user) => user.nickname === nickname);
		if (getDataNickname) return getDataNickname.id;
		return '';
	}

	const addedNewMember = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key !== 'Enter') return;
		const userId = getUserId(event.currentTarget.value);
		if (userId) {
			console.log("entrou")
			axios.post('http://localhost:3000/chatroom/add-member-group', {
				add_id: userId,
				chat_name: chatName,
			}, {
				headers: {
					Authorization: Cookies.get("jwtToken")
				},
			}).then((res) => {
				setDataChat(res.data);
				console.log("resData: ", res.data);
			}).catch((err) => {
				console.log(err);
			})
		}
	}

	const addedAdm = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key !== 'Enter') return;
		const userId = getUserId(event.currentTarget.value);
		if (userId) {
			console.log("entrou")
			axios.post('http://localhost:3000/chatroom/add-adm-group', {
				add_id: userId,
				chat_name: chatName,
			}, {
				headers: {
					Authorization: Cookies.get("jwtToken")
				},
			}).then((res) => {
				setDataChat(res.data);
				console.log("resData: ", res.data);
			}).catch((err) => {
				console.log(err);
			})
		}
	}

	const excludeMember = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key !== 'Enter') return;
		const userId = getUserId(event.currentTarget.value);
		if (userId) {
			console.log("entrou")
			axios.post('http://localhost:3000/chatroom/exclude-member-group', {
				add_id: userId,
				chat_name: chatName,
			}, {
				headers: {
					Authorization: Cookies.get("jwtToken")
				},
			}).then((res) => {
				setDataChat(res.data);
				console.log("resData: ", res.data);
			}).catch((err) => {
				console.log(err);
			})
		}
	}

	const deleteChat = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key !== 'Enter') return;
		if (event.currentTarget.value !== chatName) return;
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

	const changePassword = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		axios.post('http://localhost:3000/chatroom/change-password-group', {
			chat_name: name,
			old_password: form.get('password'),
			new_password: form.get('newPassword'),
			confirm_password: form.get('confirmNewPassword'),
		}, {
			headers: {
				Authorization: Cookies.get("jwtToken")
			}
		}).then((res) => {
			console.log("Resposta alter senha: ", res.data);
		}).catch((err) => {
			console.log("Resposta alter Error: ", err);
		})
	}

	useEffect(() => {
		GetUsersGame().then((res) => {
			setPlayersGame(res);
		})
	}, [])

	return (
		<div className="position-absolute bg-dark text-center rounded h-100 w-50 overflow-auto top-0 end-0">
			<Bar openOrClosedConf={props.openOrClosedConf} />
			<Perfil chatName={chatName}
				chatPhoto="https://i.etsystatic.com/37688069/r/il/d3e600/5143421340/il_600x600.5143421340_sm1f.jpg"
				numberMembers={members.length}
			/>
			<Rules rules={rules} />
			<div className="p-3 text-start">
				<ButtonConfiguration
					Icon={AiOutlineUserAdd}
					content="Adicionar Pessoas"
					function={addedNewMember}
				/>
				<ButtonConfiguration
					Icon={GiBroadDagger}
					content="Adicionar Administrador"
					function={addedAdm}
				/>
				<ButtonConfiguration
					Icon={MdOutlinePersonAddDisabled}
					content="Remover Militante"
					function={excludeMember}
				/>
				<ButtonConfiguration
					Icon={MdBlock}
					content="Bloquear Militante"
					function={() => { }}
				/>
				<AlterPassword funcChange={changePassword} />
				<ButtonConfiguration
					Icon={MdDeleteSweep}
					content="Apagar Grupo"
					function={deleteChat}
				/>
			</div>
		</div>
	);
}
