import './ChatPrivate.css'
import { AiOutlineSend } from 'react-icons/ai';

export default function ChatPrivate() {
	return (
		<div className='d-flex align-items-end'>
			<div className='chat d-flex flex-column'>
				<div className='title'>
					<h1>ChatPrivate</h1>
				</div>
				<div className='maessagens-chat p-2'>
					<div className='message-infos d-flex justify-content-end'>
						<div className='message'>
							<p>Iae Fausto, Já termino o front end do projeto?</p>
							<p>O joão ta enchendo o saco aqui pedindo logo</p>
						</div>
						<div className='div-foto-chat'>
							<img src='https://i.pinimg.com/originals/30/5f/68/305f68b547c8b43ae7f1dc8fed76af22.jpg' alt='foto' />
						</div>
					</div>

					<div className='message-infos d-flex'>
						<div className='div-foto-chat'>
							<img src='https://i.pinimg.com/originals/ab/86/b1/ab86b13309ad04f8b500b8f5f8330c06.jpg' alt='foto'/>
						</div>
						<div className='message'>
							<p>Terminei não, to nem na metade do curso ainda kk</p>
						</div>
					</div>

					<div className='message-infos d-flex justify-content-end'>
						<div className='message'>
							<p>Já te falei que isso aí e mooh suco de pera</p>
							<p>Vem na call aqui bora cola do GPT</p>
							<p>Tem o copilote no próprio vscode agr</p>
						</div>
						<div className='div-foto-chat'>
							<img src='https://i.pinimg.com/originals/30/5f/68/305f68b547c8b43ae7f1dc8fed76af22.jpg' alt='foto' />
						</div>
					</div>

					<div className='message-infos d-flex'>
						<div className='div-foto-chat'>
							<img src='https://i.pinimg.com/originals/ab/86/b1/ab86b13309ad04f8b500b8f5f8330c06.jpg' alt='foto'/>
						</div>
						<div className='message'>
							<p>Daqui a pouco eu entro deixa eu termina o video aqui.</p>
						</div>
					</div>

					<div className='message-infos d-flex justify-content-end'>
						<div className='message'>
							<p>Dmr, demora não se não vou fz solo.</p>
							<p>Dmr, demora não se não vou fz solo.</p>
							<p>Dmr, demora não se não vou fz solo.</p>
							<p>Dmr, demora não se não vou fz solo.</p>
							<p>Dmr, demora não se não vou fz solo.</p>
							<p>Dmr, demora não se não vou fz solo.</p>
						</div>
						<div className='div-foto-chat'>
							<img src='https://i.pinimg.com/originals/30/5f/68/305f68b547c8b43ae7f1dc8fed76af22.jpg' alt='foto' />
						</div>
					</div>
				</div>
				<div className='input-chat d-flex align-items-center'>
					<input type='text' placeholder='Digite sua mensagem' />
					<button><AiOutlineSend size={30}/></button>
				</div>
			</div>
		</div>
	);
}
