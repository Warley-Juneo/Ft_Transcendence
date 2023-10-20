import { BiSolidLock } from 'react-icons/bi';
import { Chat } from './MockResponseApi';

export default function ColumChats(InfosChats: Chat[]) {
	return (
		<div className='row g-0 w-100'>
			{InfosChats.map((chat) => (
				<div className="col-md-4 hover">
					<div className='d-flex border-bottom border-end p-2 justify-content-between' id='sala1'>
						<div className='me-3'>
							<p className='fs-5'>{chat.name}</p>
							<p className='fs-6 d-flex'>
								Onlines: {chat.onlines}
								<BiSolidLock style={{ marginLeft: '5px' }} />
							</p>
						</div>
						<div className='me-3'>
							<p className='fs-5'>Dono do Grupo</p>
							<p className='fs-6'>{chat.adm}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
