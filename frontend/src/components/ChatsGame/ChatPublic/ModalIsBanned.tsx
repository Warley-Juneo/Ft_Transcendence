import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";

export default function ModalIsBanned({openPageChats} : {openPageChats: React.Dispatch<React.SetStateAction<string>>}) {
	return (<Modal show={true} onHide={() => openPageChats("")}>
		<Modal.Header closeButton>
			<Modal.Title>Parabens você esta sendo convidado a se retirar 🎉🎉</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<div className='d-flex justify-content-center'>
				<img src="https://i.pinimg.com/474x/9c/23/e6/9c23e604d41b0e217c65b258c086768a.jpg" alt="Foto de um gato rindo da sua cara" />
			</div>
		</Modal.Body>
		<Modal.Footer>
			<Button variant="secondary" onClick={() => openPageChats("")}>
				Eu aceito
			</Button>
			<Button variant="primary" onClick={() => openPageChats("")}>
				Eu não aceito
			</Button>
		</Modal.Footer>
	</Modal>)
}
