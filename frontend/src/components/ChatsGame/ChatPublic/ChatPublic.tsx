import ListFriends, { Players } from "../../Profiles/MiniProfile/ListFriends";
import DinamicProfile from "../../Profiles/DinamicProfile/DinamicProfile";

import { createContext, useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { socket } from "../../InitialPage/Contexts/Contexts";
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

export type DataChat = {
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
	dataChat: DataChat;
	setDataChat: React.Dispatch<React.SetStateAction<DataChat>>;
	setDinamicProfile: React.Dispatch<React.SetStateAction<DinamicProfile>>;
}>({
	dataChat: {} as DataChat,
	setDataChat: () => { },
	setDinamicProfile: () => { }
});


type propsPageChats = {
	openPageChats: React.Dispatch<React.SetStateAction<string>>;
	chatName: string;
}
export default function ChatPublic(props: propsPageChats) {
	const [dataChat, setDataChat] = useState<DataChat>({} as DataChat);
	const [dinamicProfile, setDinamicProfile] = useState<DinamicProfile>({} as DinamicProfile);
	const [showDinamicProfile, setShowDinamicProfile] = useState<string>('');

	useEffect(() => {
		if (dinamicProfile.nickName) {
			setShowDinamicProfile('show');
		}
	}, [dinamicProfile])
	const getDataChat = () => {
		const ENV = `chat_name=${props.chatName}&password=''`
		axios.get(`http://localhost:3000/chatroom/find-public/?${ENV}`, {
			headers: {
				Authorization: Cookies.get("jwtToken")
			}
		}).then((response) => {
			setDataChat(response.data)
		}).catch((error) => {
			console.log(error)
		})
	}

	useEffect(() => {
		getDataChat()
	}, [])

	useEffect(() => {
		socket.on('checkStatus', (data: any) => {
			getDataChat();
		})
		return () => {
			socket.off('checkStatus')
		}
	}, [socket])

	if (!dataChat.name) return <div>Carregando...</div>

	return (
		<div className="rounded text-white
			position-absolute top-50 start-50 translate-middle h-75 w-75"
			style={{ backgroundImage: `url(${bgChatPublic})`, backgroundSize: 'cover' }}
		>
			<div className="row g-0 h-100 p-2">
				<ChatContext.Provider value={{ dataChat, setDataChat, setDinamicProfile }}>
					<div className="col-3 border-end h-100">
						<ListFriends
							players={dataChat.members}
							getPlayers={() => { }}
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
