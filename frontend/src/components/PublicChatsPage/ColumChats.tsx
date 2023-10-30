import { BiSolidLock } from 'react-icons/bi';
import { t_chat } from './MockResponseApi';
import { useNavigate } from 'react-router-dom';

type propsChatList = {
	listChats: t_chat[];
	openChatSelected: (chatName: string) => void;
}

export default function ChatList(props: propsChatList) {
	const navigate = useNavigate();

	return (
		<div className='row g-0 w-100'>
			{props.listChats.map((chat) => (
				<div className="col-md-4 border-bottom border-end hover" onClick={() => {navigate(`/game/chats/${chat.name}`)}}>
					<div className='d-flex p-2 justify-content-between' id='sala1'>
						<div>
							<p className='fs-5'>{chat.name}</p>
							<p className='fs-6 d-flex'>
								Onlines: {chat.onlines}
								<BiSolidLock style={{ marginLeft: '5px' }} />
							</p>
						</div>
						<div className='ms-3'>
							<p className='fs-5'>Dono do Grupo</p>
							<p className='fs-6'>{chat.adm}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}