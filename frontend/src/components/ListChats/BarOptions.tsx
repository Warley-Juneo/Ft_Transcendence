import { BiSearchAlt, BiMessageAltAdd } from 'react-icons/bi';


export default function BarOptions({handleSearchChats}: any) {

	return (
		<div className='d-flex shadow-grounps rounded p-2'>
			<div className='d-flex align-items-center shadow-grounps w-25'>
				<BiSearchAlt size={30} style={{ padding: '5px', color: '#0e0036', transform: 'scaleX(-1)' }} />
				<input
					onChange={handleSearchChats}
					type='text'
					placeholder='Procurar grupo'
					id = 'inputFindChat'
				/>
			</div>
			<button className='d-flex align-items-center shadow-grounps ms-auto'>
				<BiMessageAltAdd size={30} color='black' />
				<p className='mx-2 fw-bold'>Criar Grupo</p>
			</button>
		</div>
	)
}

