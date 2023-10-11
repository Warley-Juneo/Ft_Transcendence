
import './BarOptions.css';
import './buttonRedFormatted.css';

function BarOptions(props) {
	return (
		<div className='d-flex align-items-center BarOptions'>
			<div className='d-flex col-md-12 col-lg-8'>
				<div className=''>
					<span class="animated-button1">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						Jogar
					</span>
				</div>
				<div className='d-flex justify-content-end w-100'>
					<div className=''>
						<span class="animated-button1" onClick={props.showListChats}>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							Chats
						</span>
					</div>
					<div className=''>
						<span class="animated-button1">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							Raking
						</span>
					</div>
					<div>
						<span class="animated-button1">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							Histórico
						</span>
					</div>
					<div>
						<span class="animated-button1" onClick={props.showProfileScreen}>
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
