import { useNavigate } from 'react-router';
import './buttonRedFormatted.css';

function BarOptions(props: any) {
	const navigate = useNavigate();

	// Função para gerar uma classe aleatória entre "animated-button1" e "animated-button12"
	function randomButtonClass(): string {
		return 'animated-button' + (Math.floor(Math.random() * 12) + 1);
	}

	return (
		<header>
			<nav className='d-flex bg-custon-roxo' style={{ minHeight: '15vh' }}>
				<div className='d-flex w-100 my-auto'>
					<div className='div-bottom-animation'>
						<span className={randomButtonClass()} onClick={() => navigate("/game/game")}>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							Home
						</span>
					</div>
					<div className='div-bottom-animation'>
						<span className={randomButtonClass()} onClick={() => navigate("/game/profile")}>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							Perfil
						</span>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default BarOptions;
