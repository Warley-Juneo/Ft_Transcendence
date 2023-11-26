import { useEffect, useState } from "react";
import BarConfigurations from "./barConfigurations";
import Configurations from "./Configurations/Configurations";
import InputChats from "../InputChats";
import FormatMessagensList from "../ChatPrivate/FormatMessagensList";
import MembersChat from "./MembersChat";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

type DataChat = {
	id: string
	name: string
	photo: string
	users: {
		id: string
		nickname: string
		photo: string
	}[]
}

export default function ChatPublic() {
	const [showConfigurations, setShowConfigurations] = useState(false);
	const { chatName } = useParams();

	const getDataChat = () => {
		axios.get(`http://localhost:3000/chatroom/open/?name=${chatName}`, {
			headers: {
				Authorization: Cookies.get("jwtToken"),
			}
		}).then((res) => {
			console.log("Response GetDataChat", res.data)
		}).catch((err) => {
			console.log("Error GetDataChat", err)
			console.log(err)
		})
	}

	useEffect(() => {
		getDataChat()
	}, [])

	return (
		<div className="bg-custon-roxo rounded text-white h-100">
			<div className="row g-0 h-100 p-2">
				{/* Lado esquerdo do chat*/}
				<div className="col-3 d-flex flex-column align-items-center justify-content-center border-end h-100">
					<MembersChat />
				</div>

				{/* Lado direto do chat*/}
				<div className="col-9 d-flex flex-column h-100 position-relative">
					<BarConfigurations openOrClosedConf={() => setShowConfigurations(!showConfigurations)} />
					{showConfigurations === true ? <Configurations openOrClosedConf={() => setShowConfigurations(!showConfigurations)} /> : null}
					<div className="h-100 text-black p-3 overflow-auto">
						<FormatMessagensList />
					</div>
					<InputChats />
				</div>
			</div>
		</div>
	)
}
