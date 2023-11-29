import { t_dataUser } from "../InitialPage/InitialPage";
import { Messages } from "./ChatPublic/ChatPublic";

type propsFormatMessages = {
	messagens: Messages[],
	user: t_dataUser,
}

export default function FormatMessages(props: propsFormatMessages): JSX.Element {
	return (
		<div className="h-100 text-black p-3 overflow-auto">
			{props.messagens.map((message : Messages) => {
				{
					const data = new Date(message.date)
					const dataFormating: string = `${data.getHours()}:${data.getMinutes()}`;
					console.log(dataFormating);
					if (message.user.nickname === props.user.nickname) {
						return (
							<div className='d-flex justify-content-end mb-2'>
								<div className='bg-light rounded me-2 p-2' style={{ whiteSpace: 'pre-line' }}>
									<p>{message.content}</p>
									<p className="d-flex justify-content-end" style={{ fontSize: '12px' }}>{dataFormating}</p>
								</div>
								<img style={{ height: '40px', width: '40px', borderRadius: '50%' }} src={message.user.avatar} alt='foto' />
							</div>
						);
					} else {
						return (
							<div className='d-flex mb-2'>
								<img style={{ height: '40px', width: '40px', borderRadius: '50%' }} src={message.user.avatar} alt='foto' />
								<div className='bg-light rounded ms-2 p-2' style={{ whiteSpace: 'pre-line' }}>
									<p>{message.content}</p>
									<p className="d-flex justify-content-end" style={{ fontSize: '12px' }}>{dataFormating}</p>
								</div>
							</div>
						);
					};
				}
			})};
		</div>
	)
}
