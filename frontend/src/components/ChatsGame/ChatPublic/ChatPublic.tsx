import { useState } from "react";
import BarConfigurations from "./barConfigurations";
import Configurations from "./Configurations/Configurations";
import { useLocation } from "react-router-dom";
import MessagensArea from "./MessagensArea";
import ListFriends, { Players } from "../../Profiles/MiniProfile/ListFriends";
import DinamicProfile from "../../Profiles/DinamicProfile/DinamicProfile";

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

export default function ChatPublic() {
	const [dataChat, setDataChat] = useState<DataChat>(useLocation().state?.data);
	const [showConfigurations, setShowConfigurations] = useState(false);
	const [dinamicProfile, setDinamicProfile] = useState<{
		show: boolean,
		nickName: string,
		id: string,
	}
	>({ show: false, nickName: '', id: ''});

	return (
		<div className="bg-custon-roxo rounded text-white h-100">
			<div className="row g-0 h-100 p-2">

				{/* Lado esquerdo do chat que contem os amigos*/}
				<div className="col-3 border-end h-100">
					<ListFriends players={dataChat.members}
						getPlayers={() => { }}
					/>
				</div>

				{/* Lado direto do chat que cotem as mensagens*/}
				<div className="col-9 d-flex flex-column h-100 position-relative">
					<BarConfigurations openOrClosedConf={() => setShowConfigurations(!showConfigurations)} />
					{!showConfigurations === true ? null :
						<Configurations openOrClosedConf={() => setShowConfigurations(!showConfigurations)}
							numberMembers={dataChat.members.length}
							setDataChat={setDataChat}
						/>
					}
					<MessagensArea messagens={dataChat.message}
						chatId={dataChat.id}
						dinamicChat={setDinamicProfile}
					/>
				</div>
			</div>
			{!dinamicProfile.show ? null :
				<DinamicProfile nickName={dinamicProfile.nickName}
					dinamicProfile={setDinamicProfile}
					id={dinamicProfile.id}
				/>}
		</div>
	)
}
