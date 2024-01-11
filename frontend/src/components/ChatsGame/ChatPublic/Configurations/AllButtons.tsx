import Button from "./Button";
import { MdOutlinePersonAddDisabled, MdDeleteSweep } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { GiBroadDagger } from 'react-icons/gi';
import { MdBlock } from "react-icons/md";
import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ChatContext } from "../ChatPublic";
import AlterPassword from "./AlterPassword";
import GetUsersGame from "./GetUsersGame";
import { useNavigate } from "react-router-dom";

type UsersGame = {
	id: string;
	nickname: string;
	avatar: string;
	is_active: boolean;
}

export default function AllButtons(): JSX.Element {
	const { chatData: { name }, setDataChat } = useContext(ChatContext);
	const [playersGame, setPlayersGame] = useState<UsersGame[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		GetUsersGame().then((res) => {
			setPlayersGame(res);
		})
	}, [])

	const getUserId = (nickname: string): string => {
		if (!playersGame) return ''
		const getDataNickname = playersGame.find((user) => user.nickname === nickname) || '';
		return getDataNickname ? getDataNickname.id : ''
	}

	const addedNewMember = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key !== 'Enter') return;
		const userId = getUserId(event.currentTarget.value);
		if (userId) {
			axios.post('http://localhost:3000/chatroom/add-member-group', {
				add_id: userId,
				chat_name: name,
			}, {
				headers: {
					Authorization: Cookies.get("jwtToken")
				},
			}).then((res) => {
				setDataChat(res.data);
			}).catch((err) => {
				console.log(err);
			})
		}
	}

	const addedAdm = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key !== 'Enter') return;
		const userId = getUserId(event.currentTarget.value);
		if (userId) {
			axios.post('http://localhost:3000/chatroom/add-adm-group', {
				add_id: userId,
				chat_name: name,
			}, {
				headers: {
					Authorization: Cookies.get("jwtToken")
				},
			}).then((res) => {
				setDataChat(res.data);
			}).catch((err) => {
				console.log(err);
			})
		}
	}

	const removedAdm = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key !== 'Enter') return;
		const userId = getUserId(event.currentTarget.value);
		if (userId) {
			axios.post('http://localhost:3000/chatroom/remove-adm-group', {
				add_id: userId,
				chat_name: name,
			}, {
				headers: {
					Authorization: Cookies.get("jwtToken")
				},
			}).then((res) => {
				setDataChat(res.data);
			}).catch((err) => {
				console.log(err);
			})
		}
	}

	const banMember = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		
		console.log("\n\nOOOOOOOOOOOOOOOO\n\n");
		if (event.key !== 'Enter') return;
		const userId = getUserId(event.currentTarget.value);
		if (userId) {
			axios.post('http://localhost:3000/chatroom/ban-member-group', {
				add_id: userId,
				chat_name: name,
			}, {
				headers: {
					Authorization: Cookies.get("jwtToken")
				},timeout: 5000
			}).then((res) => {
				setDataChat(res.data);
			}).catch((err) => {
				console.log(err);
			})
		}
	}

	const kickMember = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		
		console.log("\n\nOOOOOOOOOOOOOOOO\n\n");
		if (event.key !== 'Enter') return;
		const userId = getUserId(event.currentTarget.value);
		if (userId) {
			axios.post('http://localhost:3000/chatroom/kick-member-group', {
				add_id: userId,
				chat_name: name,
			}, {
				headers: {
					Authorization: Cookies.get("jwtToken")
				},timeout: 5000
			}).then((res) => {
				setDataChat(res.data);
				console.log("\n\nRESPOSTA...\n\n", res.data);
			}).catch((err) => {
				console.log(err);
			})
		}
	}

	const deleteChat = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key !== 'Enter') return;
		if (event.currentTarget.value !== name) return;
		axios.delete('http://localhost:3000/chatroom/delete-group', {
			data: {
				chat_name: name,
			},
			headers: {
				Authorization: Cookies.get("jwtToken")
			},
		}).then((res) => {
			navigate("/game/");
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
	return (
		<div className="p-3 text-start">
			<Button
				Icon={AiOutlineUserAdd}
				content="Adicionar Pessoas"
				function={addedNewMember}
			/>
			<Button
				Icon={GiBroadDagger}
				content="Adicionar Administrador"
				function={addedAdm}
			/>
			<Button
				Icon={GiBroadDagger}
				content="Remover Administrador"
				function={removedAdm}
			/>
			<Button
				Icon={MdOutlinePersonAddDisabled}
				content="Banir Tripulante"
				function={banMember}
			/>
			<Button
				Icon={MdBlock}
				content="Chutar Tripulante"
				function={() => {kickMember}}
			/>
			<AlterPassword funcChange={changePassword} />
			<Button
				Icon={MdDeleteSweep}
				content="Apagar Grupo"
				function={deleteChat}
			/>
		</div>
	)
}
