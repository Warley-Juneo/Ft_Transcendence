import { useParams } from "react-router-dom";
import { BsFillPencilFill } from 'react-icons/bs';
import { useState } from "react";
import { MdOutlinePersonAddDisabled } from 'react-icons/md';
import { AiOutlineUserAdd, AiOutlineClose } from 'react-icons/ai';
import { GiBroadDagger } from 'react-icons/gi';

export default function Configurations({openOrClosedConf}: {openOrClosedConf : () => void}) {
	const id = useParams().id;
	const [showEditName, setShowEditName] = useState(false);

	const handleEditName = () => {
		setShowEditName(!showEditName);
	}

	return (
		<div className="position-absolute bg-dark text-center rounded h-100 w-50 overflow-auto top-0 end-0">
			<div className="d-flex align-items-center border-bottom" style={{height: '55px'}}>
				<AiOutlineClose className="ms-5" role="button" size={30} onClick={openOrClosedConf}/>
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
					<BsFillPencilFill size={20} style={{cursor: 'pointer', marginLeft: '5px'}} onClick={handleEditName}/>
				</h3>
				{ showEditName === true ? <input type="text" className="remove-format-input text-center border-bottom mb-1" placeholder="Novo nome do grupo" /> : null}
				<h4>Grupo - 15 participantes</h4>
			</div>
			<div className="text-start p-3">
				<h4>Regras : </h4>
				<ul>
					<li>
						<h5>2 anos de Free Fire</h5>
					</li>
					<li>
						<h5>5 anos de experiência</h5>
					</li>
					<li>
						<h5>Inglês, Português, Hebraico, Grego e Angolano...</h5>
					</li>
					<li>
						<h5>Assembly, C/C++, Java, Malbolge...</h5>
					</li>
					<li>
						<h5>MySQL, PostgreSQL, Oracle Database, Dynamo...</h5>
					</li>
				</ul>
			</div>
			<div className="p-3 text-start">
				<h5 className="p-2 hover">
					<AiOutlineUserAdd className="foto-list-friends bg-light text-black me-3 p-1" size={30} />
					Adicionar Pessoas
				</h5>
				<h5
					className="p-2 hover">
					<MdOutlinePersonAddDisabled className="foto-list-friends bg-light text-black me-3 p-1" size={30} />
					Remover Militante
				</h5>
				<h5
					className="p-2 hover">
					<GiBroadDagger className="foto-list-friends bg-light text-black me-3 p-1" size={30} />
					Adicionar ADM
				</h5>
			</div>
		</div>
	);
}
