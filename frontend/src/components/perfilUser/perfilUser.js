import './styles/perfilUser.css'

function PerfilUser() {
	return (
		<div className='perfil-user d-flex align-items-end pb-2'>
			<div className='div-foto-perfil'>
				<img src='https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg' alt='foto' />
			</div>
			<div className='m-2'>
				<p>LUFFY RD</p>
				<div className='d-flex align-items-center'>
					<div className='online-border d-flex justify-content-center align-items-center'>
						<div className='online'></div>
					</div>
					<p className='fst-italic'>Eu serei o rei dos</p>
				</div>
			</div>
		</div>
	);
}

export default PerfilUser;
