import rankBonze from '../../static/BRONZE.png';
import './rank.css'

function ProfileScreen() {
	console.log("SCREEN PROFILE!!!!!");
	return (
		<div className="perfil-rank m-5 row">
			<div className='d-flex flex-column col-lg-3 col-md-4 m-5'>
				<div className='d-flex flex-column align-items-center'>
					<div className='perfil-rank-foto '>
						<img src='https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg' alt='foto' />
					</div>
					<h1>Luffy</h1>
				</div>
				<div className='d-flex flex-column align-items-center justify-content-center m-auto'>
					<img src={rankBonze} alt='' ></img>
					<h1>BRONZE</h1>
				</div>
				<div className='d-flex justify-content- align-items-end m-auto'>
					<div className='p-1 text-center'>
						<h4>VTR</h4>
						<h2>3</h2>
					</div>
					<div className='p-1 text-center'>
						<h4>DRT</h4>
						<h2>3</h2>
					</div>
					<div className='p-1 text-center'>
						<h4>KDA</h4>
						<h2>0</h2>
					</div>
				</div>
			</div>

			<div className='col m-5'>
				<h2 className='fst-italic mb-3'>PARTIDAS RECENTES</h2>

				<div className='d-flex align-items-center infos-history-rank p-2'>
					<div className='foto-history-rank col-lg-1 col-md-2'>
						<img src='https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg' alt='foto' />
					</div>
					<div className='fs-5 col-3'>
						<p className='fs-4'>Oponente</p>
						<p>xXMalMalvadoXx</p>
					</div>
					<div className='fs-5 fw-bold col-2'>
						<p>HISTORY</p>
						<p>8x10</p>
					</div>
					<p className='status-pat fs-1 derrota'>DERROTA</p>
				</div>

				<div className='d-flex align-items-center infos-history-rank p-2'>
					<div className='foto-history-rank col-1'>
						<img src='https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg' alt='foto' />
					</div>
					<div className='fs-5 col-3'>
						<p className='fs-4'>Oponente</p>
						<p>XLucasGabi</p>
					</div>
					<div className='fs-5 fw-bold col-2'>
						<p>HISTORY</p>
						<p>10x8</p>
					</div>
					<p className='status-pat fs-1 vitoria'>VITORIA</p>
				</div>
				<div className='d-flex align-items-center infos-history-rank p-2'>
					<div className='foto-history-rank col-1'>
						<img src='https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg' alt='foto' />
					</div>
					<div className='fs-5 col-3'>
						<p className='fs-4'>Oponente</p>
						<p>Akira</p>
					</div>
					<div className='fs-5 fw-bold col-2'>
						<p>HISTORY</p>
						<p>5x2</p>
					</div>
					<p className='status-pat fs-1 vitoria'>VITORIA</p>
				</div>
				<div className='d-flex align-items-center infos-history-rank p-2'>
					<div className='foto-history-rank col-1'>
						<img src='https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg' alt='foto' />
					</div>
					<div className='fs-5 col-3'>
						<p className='fs-4'>Oponente</p>
						<p>SogeKing</p>
					</div>
					<div className='fs-5 fw-bold col-2'>
						<p>HISTORY</p>
						<p>15x1</p>
					</div>
					<p className='status-pat fs-1 derrota'>DERROTA</p>
				</div>
			</div>
		</div>
	);
}

export default ProfileScreen;
