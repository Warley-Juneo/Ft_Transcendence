import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import React from 'react';

type propsBannedWarningModal = {
	showWarningBan: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BannedWarningModal({ showWarningBan }: propsBannedWarningModal) {

	return (<Modal show={true}>
		<Modal.Header closeButton>
			<Modal.Title>Parado !!! Você foi banido deste chat 👮</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<div className='d-flex justify-content-center'>
				<img className='h-100 w-100' src="https://ae01.alicdn.com/kf/HTB1pr2tSXXXXXabXXXXq6xXFXXXH.jpg_640x640Q90.jpg_.webp" alt="Foto de cachorro vestido de policial" />
			</div>
		</Modal.Body>
		<Modal.Footer>
			<Button variant="secondary" onClick={() => showWarningBan(false)}>
				Ok
			</Button>
		</Modal.Footer>
	</Modal>)
}
