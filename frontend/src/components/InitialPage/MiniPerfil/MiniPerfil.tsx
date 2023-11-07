import MiniPerfilUser from './MiniPerfilUser';
import Options from './options';
import ListFriends from './ListFriends';
import { useEffect, useState } from 'react';

export default function MiniPerfil() {
	const [optionSelected, setOptionSelected] = useState<string>('');

	useEffect(() => {
		if (optionSelected === '') {
			return;
		}
		console.log(optionSelected);
		console.log('oi');
		alert('UrlFake: ' + optionSelected);
	}, [optionSelected]);

	return (
		<aside className='bg-custon-roxo d-flex flex-column h-100' style={{ minWidth: '15vw' }}>
			<MiniPerfilUser />
			<hr className='m-0 w-100 text-white'></hr>
			<Options options={setOptionSelected} />
			<ListFriends/>
		</aside>
	);
}
