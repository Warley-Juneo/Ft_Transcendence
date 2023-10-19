import { BiSolidLock } from 'react-icons/bi';
import { Chat } from './ListChats';

export default function ColumChats(InfosChats: Chat[]) {
	return (
		<div className='row g-0 w-100'>
			{InfosChats.map((chat) => (
				<div className="col-md-4 hover">
					<div className='p-2 d-flex border-bottom border-end' id='sala1'>
						<div className='d-flex flex-column m-auto'>
							<p className='fs-5'>{chat.name}</p>
							<p className='fs-6 d-flex m-auto'>
								Onlines: {chat.onlines}
								<BiSolidLock style={{ marginLeft: '5px' }} />
							</p>
						</div>
						<div className='d-flex flex-column m-auto'>
							<p className='fs-5'>Dono do Grupo</p>
							<p className='fs-6 m-auto'>{chat.adm}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
