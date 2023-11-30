import ListFriends, { Players } from "../../Profiles/MiniProfile/ListFriends";
import DinamicProfile from "../../Profiles/DinamicProfile/DinamicProfile";
import Configurations from "./Configurations/Configurations";
import BarConfigurations from "./barConfigurations";
import { useLocation } from "react-router-dom";
import MessagensArea from "./MessagensArea";
import { createContext } from "react";
import React, { useState } from "react";

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
	show: boolean,
	nickName: string,
	id: string,
}

export const ChatContext = createContext<{
	dataChat: DataChat;
	setDataChat: React.Dispatch<React.SetStateAction<DataChat>>;
	setDinamicProfile: React.Dispatch<React.SetStateAction<DinamicProfile>>;
}>({ dataChat: {} as DataChat, setDataChat: () => { }, setDinamicProfile: () => { } });

export default function ChatPublic() {
	const [dataChat, setDataChat] = useState<DataChat>(useLocation().state?.data);
	const [showConfigurations, setShowConfigurations] = useState(false);
	const [dinamicProfile, setDinamicProfile] = useState<DinamicProfile>({} as DinamicProfile);

	return (
		<div className="bg-custon-roxo rounded text-white h-100">
			<div className="row g-0 h-100 p-2">
				<ChatContext.Provider value={{ dataChat, setDataChat, setDinamicProfile }}>
					{/* Lado esquerdo do chat que contem os amigos*/}
					<div className="col-3 border-end h-100">
						<ListFriends
							players={dataChat.members}
							getPlayers={() => { }}
						/>
					</div>

					{/* Lado direto do chat que cotem as mensagens*/}
					<div className="col-9 d-flex flex-column h-100 position-relative">
						<BarConfigurations openOrClosedConf={
							() => setShowConfigurations(!showConfigurations)
						}
						/>
						{!showConfigurations === true ? null :
							<Configurations openOrClosedConf={
								() => setShowConfigurations(!showConfigurations)
							}
							/>
						}
						<MessagensArea />
					</div>
				</ChatContext.Provider>
			</div>
			{!dinamicProfile.show ? null :
				<DinamicProfile nickName={dinamicProfile.nickName}
					dinamicProfile={setDinamicProfile}
					id={dinamicProfile.id}
				/>
			}
		</div>
	)
}
