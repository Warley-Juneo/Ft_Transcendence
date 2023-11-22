import { BiSearchAlt, BiMessageAltAdd } from 'react-icons/bi';
import React, { ChangeEvent } from 'react';

type BarOptionsProps = {
	handleSearchChats: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setShowCreateChat: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function chat_getBarOptions( props: BarOptionsProps ) {
	return (
		<div className='d-flex shadow-grounps rounded p-2' id='BarChats'>
			<div className='d-flex align-items-center shadow-grounps w-25'>
				<BiSearchAlt size={30} style={{ padding: '5px', color: '#0e0036', transform: 'scaleX(-1)' }} />
				<input
					onChange={props.handleSearchChats}
					type='text'
					placeholder='Procurar grupo'
					id = 'inputFindChat'
				/>
			</div>
			<button className='d-flex shadow-grounps ms-auto' onClick={() => props.setShowCreateChat(true)}>
				<BiMessageAltAdd size={30} color='black' />
				<p className='mx-2 fw-bold'>Criar Grupo</p>
			</button>
		</div>
	)
}

