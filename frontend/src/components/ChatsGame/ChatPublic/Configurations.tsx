import { useParams } from "react-router-dom";
import { BsFillPencilFill } from 'react-icons/bs';
import { useState } from "react";
import { MdOutlinePersonAddDisabled, MdDeleteSweep } from 'react-icons/md';
import { AiOutlineUserAdd, AiOutlineClose } from 'react-icons/ai';
import { GiBroadDagger } from 'react-icons/gi';
import ButtonConfiguration from "./configurations/buttons";
import axios from "axios";
import Cookies from "js-cookie";

const rules: string[] = [
	"2 anos de Free Fire",
	"5 anos de experiência",
	"Inglês, Português, Hebraico, Grego e Angolano...",
	"Assembly, C/C++, Java, Malbolge...",
	"MySQL, PostgreSQL, Oracle Database, Dynamo...",
]

export default function Configurations({ openOrClosedConf }: { openOrClosedConf: () => void }) {
	const id = useParams().id;
	const [showEditName, setShowEditName] = useState(false);

	const deleteChat = (): void => {
		console.log("delete chat", id);
		axios.delete('http://localhost:3000/chatroom/delete-chatroom', {
			data: {
				name: id,
			},
			headers: {
				Authorization: Cookies.get("jwtToken")
			},
		}).then((res) => {
			console.log("response delete: ", res.data);
		}).catch((err) => {
			console.log(err);
		})
	}

	const handleEditName = () => {
		setShowEditName(!showEditName);
	}

	return (
		<div className="position-absolute bg-dark text-center rounded h-100 w-50 overflow-auto top-0 end-0">
			<div className="d-flex align-items-center border-bottom" style={{ height: '55px' }}>
				<AiOutlineClose className="ms-5" role="button" size={30} onClick={openOrClosedConf} />
				<h5 className="m-0 ms-5">Dados do Grupo</h5>
			</div>
			<div className="p-3 border-bottom">
				<img
					src="https://i.etsystatic.com/37688069/r/il/d3e600/5143421340/il_600x600.5143421340_sm1f.jpg"
					alt="Foto do grupo em configuraçoes"
					className="foto-list-friends"
					style={{ width: '10rem', height: '10rem' }}
				/>
				<h3>
					{id}
					<BsFillPencilFill size={20} style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={handleEditName} />
				</h3>
				{showEditName === true ? <input type="text" className="remove-format-input text-center border-bottom mb-1" placeholder="Novo nome do grupo" /> : null}
				<h4>Grupo - 15 participantes</h4>
			</div>
			<div className="text-start p-3">
				<h4>Regras : </h4>
				<ul>
					{rules.map((rule, index) => (<li>{rule}</li>))}
				</ul>
			</div>
			<div className="p-3 text-start">
				<ButtonConfiguration Icon={AiOutlineUserAdd} content="Adicionar Pessoas" />
				<ButtonConfiguration Icon={MdOutlinePersonAddDisabled} content="Remover Militante" />
				<ButtonConfiguration Icon={GiBroadDagger} content="Adicionar ADM" />
				{/* <ButtonConfiguration Icon={MdDeleteSweep} content="Delete Chat" /> */}
				<h5 className="p-2 hover" onClick={deleteChat}>
					<MdDeleteSweep className="foto-list-friends bg-light text-black me-3 p-1" size={30} />
					Delete Chat
				</h5>
			</div>
		</div>
	);
}
