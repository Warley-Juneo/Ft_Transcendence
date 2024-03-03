import { Modal } from "react-bootstrap";
import { UserData, socket } from "../../InitialPage/Contexts/Contexts";
import { useContext } from "react";

type propsModalConvite = {
	setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ModalConvite(props: propsModalConvite): JSX.Element {
	const cssBackgroundModal: React.CSSProperties = {
		backgroundImage: "url('https://i.pinimg.com/736x/81/60/74/816074bad774e6731e6d9d0d09ce30a6.jpg')",
		backgroundSize: "cover",
		backgroundPosition: "center",
		color: "white"
	}
	const myId = useContext(UserData).user.id;
	const sendResponse = () => {
		let obj = {
			myId: myId,
			idOther: "idOther",
			msg: "response"
		}
		socket.emit("sendInvite", obj)
		props.setOpenChat(false);
	}

	console.log('modal convite')
	return (
		<Modal show={true} onHide={() => props.setOpenChat(false)}>
			<Modal.Header closeButton style={cssBackgroundModal}>
				<p>Convite para partida</p>
			</Modal.Header>
			<Modal.Body>
				<p className="fs-5 text-center">fausto vs wallas</p>
				<p className="fs-5 text-center">Vem x1 lixo</p>
				<div className='w-100 d-flex pe-3 justify-content-between'>
					<button className="btn btn-primary" onClick={sendResponse}> Aceitar </button>
					<button className="btn btn-danger" onClick={() => props.setOpenChat(false)}> Cancelar </button>
				</div>
			</Modal.Body>
		</Modal>
	)
}
