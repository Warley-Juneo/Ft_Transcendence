import './styles/perfilUser.css'

function MiniPerfilUser(data: any) {
	console.log("AAAAAAAAAAAAAHHHHHHHHHHHHH", data);
	return (
		<div className='perfil-user d-flex align-items-end pb-2'>
			<div className='div-foto-perfil'>
				<img src='https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg' alt='foto' />
			</div>
			<div className='m-2'>
				<p>{data.userdata._first_name}</p>
				<div className='d-flex align-items-center'>
					<div className='online-border d-flex justify-content-center align-items-center'>
						<div className='online'></div>
					</div>
					<p className='fst-italic'>Eu serei</p>
				</div>
			</div>
		</div>
	);
}

export default MiniPerfilUser;
