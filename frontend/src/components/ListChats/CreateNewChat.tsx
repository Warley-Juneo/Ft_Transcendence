import { useState } from "react";

export default function CreateNewChat() {
	const [ShowInputPassword, setShowInputPassword] = useState(false);

	const handleShowInputPassword = () => {
		setShowInputPassword(!ShowInputPassword);
	}

	return (
		<div className='position-absolute rounded top-50 end-50 p-3 shadow-grounps text-black'>
			<label className='form-label' htmlFor='inputCreateGroup'>Criar grupo</label>
			<input type='text' className='form-control shadow-grounps mb-3' placeholder='Nome do grupo' />
			<div className="form-check">
				<input className="form-check-input shadow-grounps" type="checkbox" value="" id="flexCheckDefault" onClick={handleShowInputPassword}></input>
				<label className="form-check-label" htmlFor="flexCheckDefault">
					Adicionar Senha
				</label>
			</div>
			{ShowInputPassword ? <input type='text' className='form-control shadow-grounps' placeholder='Senha do grupo' /> : null}
			<button className='btn btn-primary d-flex ms-auto mt-4'>Criar Grupo</button>
		</div>
	);
}
