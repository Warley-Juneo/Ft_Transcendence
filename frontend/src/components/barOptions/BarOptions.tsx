import { useNavigate } from 'react-router';
import './BarOptions.css';
import './buttonRedFormatted.css';

function BarOptions(props: any) {

	const navigate = useNavigate();
	return (
		<div className='d-flex align-items-center BarOptions bg-custon-roxo'>
			<div className='d-flex col-md-12 col-lg-8'>
				<div className='div-bottom-animation'>
					<span className="animated-button1">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						Jogar
					</span>
				</div>
				<div className='d-flex justify-content-end w-100'>
					<div className='div-bottom-animation'>
						<span className="animated-button1" onClick={() => navigate("/game/chats")}>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							Chats
						</span>
					</div>
					<div className='div-bottom-animation'>
						<span className="animated-button1">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							Raking
						</span>
					</div>
					<div className='div-bottom-animation'>
						<span className="animated-button1">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							Histórico
						</span>
					</div>
					<div className='div-bottom-animation'>
						<span className="animated-button1" onClick={() => navigate("/game/profile")}>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							Perfil
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BarOptions;
