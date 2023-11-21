import { GrFormClose } from 'react-icons/gr';
import { FormEvent, useState, useRef } from "react";

type functionsChats = {
	showScreeToCreateChat: () => void;
	createNewChat: (form: FormData) => void;
}

export default function CreateNewChat(props: functionsChats) {
	const [ShowInputPassword, setShowInputPassword] = useState(false);
	const inputPhotoChat = useRef<HTMLInputElement>(null);
	const boxPassword = useRef<HTMLInputElement>(null);

	const handleShowInputPassword = () => {
		setShowInputPassword(!ShowInputPassword);
		if (ShowInputPassword) {
		}
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		props.createNewChat(formData);
	}

	return (
		<div className='position-absolute rounded top-50 end-50 p-3 shadow-grounps text-black'>
			<form onSubmit={handleSubmit}>
				<div className='d-flex justify-content-center'>
					<img className='rounded-circle hover'
						src='https://www.ferramentastenace.com.br/wp-content/uploads/2017/11/sem-foto.jpg'
						style={{ width: '100px', height: '100px', padding: '5px' }}
						alt='foto para mostra que esta sem foto de perfil'
						onClick={() => inputPhotoChat.current ? inputPhotoChat.current.click() : null}
					/>
				</div>
				<input type='file' name='photoChat' className='d-none' ref={inputPhotoChat}/>
				<GrFormClose className='position-absolute top-0 end-0 m-1' size={25} onClick={props.showScreeToCreateChat} />
				<input
					type='text'
					name='nameChat'
					className='form-control shadow-grounps mb-3'
					placeholder='Nome do grupo'
				/>
				<div className="form-check">
					<input
						id="flexCheckDefault"
						name="type"
						type="checkbox"
						ref={boxPassword}
						value="protect"
						className="form-check-input shadow-grounps"
						onClick={handleShowInputPassword}>
					</input>
					<label className="form-check-label" htmlFor="flexCheckDefault">Adicionar Senha </label>
				</div>
				{ShowInputPassword ? (
					<input
						type='text'
						name='passwordChat'
						className='form-control shadow-grounps'
						placeholder='Senha do grupo'
					/>
				) : null}
				<button className='btn btn-primary d-flex ms-auto mt-4' type='submit'>Criar Grupo</button>
			</form>
		</div>
	);
}
