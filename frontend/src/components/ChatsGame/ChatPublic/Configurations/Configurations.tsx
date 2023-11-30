import { MdOutlinePersonAddDisabled, MdDeleteSweep } from 'react-icons/md';
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonConfiguration from "./ButtonConfiguration";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUserAdd } from 'react-icons/ai';
import { GiBroadDagger } from 'react-icons/gi';
import { ChatContext } from "../ChatPublic";
import GetUsersGame from "./GetUsersGame";
import InputButton from "./InputButton";
import Cookies from "js-cookie";
import Perfil from "./Perfil";
import Rules from "./Rules";
import axios from "axios";
import Bar from "./Bar";

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

export default function Configurations(props: propsConfigurations) {
	const { dataChat: { members, name }, setDataChat } = useContext(ChatContext);
	const [usersGame, setUsersGame] = useState<UsersGame[]>([]);
	const chatName: string = useParams().chatName as string;
	const navigate = useNavigate();

	const deleteChat = (e: any): void => {
		if (e.key !== 'Enter') return;
		if (refInputs.current?.value !== chatName) return;
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
					setDataChat(res.data);
				}).catch((err) => {
					console.log(err);
				})
			}
		}
	}

	const changePassword = (e: any): void => {
		axios.post('http://localhost:3000/chatroom/change-password-group', {
			chat_name: name,
			old_password: '123',
			new_password: '321',
			confirm_password: '321',
		}, {
			headers: {
				Authorization: Cookies.get("jwtToken")
			}
		}).then((res) => {
			console.log(res.data);
		}).catch((err) => {
			console.log(err);
		})
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
	const [inputChangePassword, setInputChangePassword] = useState(false);
	const refInputs = useRef<HTMLInputElement>(null);

	return (
		<div className="position-absolute bg-dark text-center rounded h-100 w-50 overflow-auto top-0 end-0">
			<Bar openOrClosedConf={props.openOrClosedConf} />
			<Perfil chatName={chatName}
				chatPhoto="https://i.etsystatic.com/37688069/r/il/d3e600/5143421340/il_600x600.5143421340_sm1f.jpg"
				numberMembers={members.length}
			/>
			<Rules rules={rules} />
			<div className="p-3 text-start">
				<ButtonConfiguration Icon={AiOutlineUserAdd}
					content="Adicionar Pessoas"
					function={() => { setInputAddMember(!inputAddMember) }}
				/>
				{!inputAddMember ? null :
					<InputButton newMember={refInputs}
						function={addedNewMember}
					/>
				}
				<ButtonConfiguration Icon={MdOutlinePersonAddDisabled}
					content="Remover Militante"
					function={() => { setInputRemoveMember(!inputRemoveMember) }}
				/>
				{!inputRemoveMember ? null :
					<InputButton newMember={refInputs}
						function={() => { }}
					/>
				}
				<ButtonConfiguration Icon={GiBroadDagger}
					content="Adicionar ADM"
					function={() => { setInputAddADM(!inputAddADM) }}
				/>
				{!inputAddADM ? null :
					<InputButton newMember={refInputs}
						function={() => { }}
					/>
				}
				<ButtonConfiguration Icon={MdDeleteSweep}
					content="Delete Chat"
					function={() => { setInputRemoverChat(!inputRemoverChat) }}
				/>
				{!inputRemoverChat ? null :
					<InputButton newMember={refInputs}
						function={deleteChat}
					/>
				}
				<ButtonConfiguration Icon={RiLockPasswordLine}
					content="Mudar Password"
					function={() => { setInputChangePassword(!inputChangePassword) }}
				/>
				{!inputChangePassword ? null :
					<InputButton newMember={refInputs}
						function={changePassword}
						placeholder='Digite a nova senha'
					/>
				}
			</div>
		</div>
	);
}
