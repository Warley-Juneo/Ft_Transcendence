import { useNavigate, useParams } from "react-router-dom";
import { MdOutlinePersonAddDisabled, MdDeleteSweep } from 'react-icons/md';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { GiBroadDagger } from 'react-icons/gi';
import ButtonConfiguration from "./configurations/ButtonConfiguration";
import axios from "axios";
import Cookies from "js-cookie";
import Bar from "./configurations/Bar";
import Perfil from "./configurations/Perfil";
import Rules from "./configurations/Rules";

const rules: string[] = [
	"2 anos de Free Fire",
	"5 anos de experiência",
	"Inglês, Português, Hebraico, Grego e Angolano...",
	"Assembly, C/C++, Java, Malbolge...",
	"MySQL, PostgreSQL, Oracle Database, Dynamo...",
]

export default function Configurations({ openOrClosedConf }: { openOrClosedConf: () => void }) {
	const navigate = useNavigate();
	const chatName: string = useParams().id as string;

	const deleteChat = (): void => {
		axios.delete('http://localhost:3000/chatroom/delete-chatroom', {
			data: {
				name: chatName,
			},
			headers: {
				Authorization: Cookies.get("jwtToken")
			},
		}).then((res) => {
			console.log("response delete: ", res.data);
			navigate("/game/chats");
		}).catch((err) => {
			console.log(err);
		})
	}


	return (
		<div className="position-absolute bg-dark text-center rounded h-100 w-50 overflow-auto top-0 end-0">
			<Bar openOrClosedConf={openOrClosedConf} />
			<Perfil	chatName={chatName}
					chatPhoto="https://i.etsystatic.com/37688069/r/il/d3e600/5143421340/il_600x600.5143421340_sm1f.jpg"
			/>
			<Rules rules={rules} />
			<div className="p-3 text-start">
				<ButtonConfiguration	Icon={AiOutlineUserAdd}
										content="Adicionar Pessoas"
										function={() => {}}
				/>
				<ButtonConfiguration	Icon={MdOutlinePersonAddDisabled}
										content="Remover Militante"
										function={() => {}}
				/>
				<ButtonConfiguration	Icon={GiBroadDagger}
										content="Adicionar ADM"
										function={() => {}}
				/>
				<ButtonConfiguration	Icon={MdDeleteSweep}
										content="Delete Chat"
										function={deleteChat}

				/>
			</div>
		</div>
	);
}
