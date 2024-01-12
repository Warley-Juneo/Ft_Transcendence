import ListFriends, { Players } from "../../Profiles/MiniProfile/ListFriends";
import DinamicProfile from "../../Profiles/DinamicProfile/DinamicProfile";

import { createContext, useContext, useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { UserData, socket } from "../../InitialPage/Contexts/Contexts";
import bgChatPublic from "../../../assets/game/bgChatPublic.png";
import RightSide from "./RightSide";

export type Messages = {
	id: string,
	content: string,
	date: Date,
	user: {
		nickname: string,
		avatar: string,
		id: string,
	}
}

export type ChatData = {
	id: string,
	name: string,
	photo: string,
	members: Players[],
	admin: Players[],
	message: Messages[],
}

type DinamicProfile = {
	nickName: string,
	id: string,
}

export const ChatContext = createContext<{
	chatData: ChatData;
	setDataChat: React.Dispatch<React.SetStateAction<ChatData>>;
	setDinamicProfile: React.Dispatch<React.SetStateAction<DinamicProfile>>;
}>({
	chatData: {} as ChatData,
	setDataChat: () => { },
	setDinamicProfile: () => { }
});


type propsPageChats = {
	openPageChats: React.Dispatch<React.SetStateAction<string>>;
	chatName: string;
}

export default function ChatPublic(props: propsPageChats) {
	const [chatData, setDataChat] = useState<ChatData>({} as ChatData);
	const [dinamicProfile, setDinamicProfile] = useState<DinamicProfile>({} as DinamicProfile);
	const [showDinamicProfile, setShowDinamicProfile] = useState<string>('');
	const {nickname, id} = useContext(UserData).user;

	function addUserChat(members: Players[]) {
		if (members.map((member) => member.nickname).includes(nickname)) {
			return
		}
		axios.post('http://localhost:3000/chatroom/add-member-group', {
			add_id: id,
			chat_name: props.chatName,
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

	const getDataChat = () => {
		const ENV = `chat_name=${props.chatName}&password=''`
		axios.get(`http://localhost:3000/chatroom/find-public/?${ENV}`, {
			headers: {
				Authorization: Cookies.get("jwtToken")
			}
		}).then((response) => {
			setDataChat(response.data)
			addUserChat(response.data.members)
			socket.emit("open-group", {chatId: response.data.id});
		}).catch((error) => {
			console.log(error)
		})
	}

	useEffect(() => {
		getDataChat()
	}, [])

	useEffect(() => {
		if (dinamicProfile.nickName) {
			setShowDinamicProfile('show');
		}
	}, [dinamicProfile])

	useEffect(() => {
		socket.on('checkStatus', (data: any) => {
			getDataChat();
		})
		return () => {
			socket.off('checkStatus')
		}
	}, [socket])

	if (!chatData.name) return <div>Carregando...</div>

	return (
		<div className="rounded text-white
			position-absolute top-50 start-50 translate-middle h-75 w-75"
			style={{ backgroundImage: `url(${bgChatPublic})`, backgroundSize: 'cover' }}
		>
			<div className="row g-0 h-100 p-2">
				<ChatContext.Provider value={{ chatData: chatData, setDataChat, setDinamicProfile }}>
					<div className="col-3 border-end h-100">
						<ListFriends
							players={chatData.members}
							getPlayers={() => { }}
							admin={chatData.admin}
						/>
					</div>

					<div className="col-9 d-flex flex-column h-100 position-relative">
						<RightSide
							chatName={props.chatName}
							openPageChats={props.openPageChats}
						/>
					</div>
				</ChatContext.Provider>
			</div>


			{!showDinamicProfile ? null :
				<DinamicProfile
					openDinamicProfile={setShowDinamicProfile}
					nickName={dinamicProfile.nickName}
					id={dinamicProfile.id}
				/>
			}
		</div>
	)
}
