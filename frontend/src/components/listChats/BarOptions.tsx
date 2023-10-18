import { BiSearchAlt, BiMessageAltAdd } from 'react-icons/bi';

export default function BarOptions() {
	return (

		<div className='d-flex shadow-grounps rounded p-2' id='bar-options-chat'>
			<div className='d-flex align-items-center shadow-grounps  w-25'>
				<BiSearchAlt size={30} style={{ padding: '5px', color: '#0e0036', transform: 'scaleX(-1)' }} />
				<input
					type='text'
					placeholder='Procurar grupo'
				/>
			</div>
			<button className='d-flex align-items-center shadow-grounps ms-auto'>
				<BiMessageAltAdd size={30} color='black' />
				<p className='mx-2 fw-bold'>Criar Grupo</p>
			</button>
		</div>
	)
}

