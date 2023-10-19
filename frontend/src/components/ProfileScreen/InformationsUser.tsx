import rankBonze from '../../static/BRONZE.png';

export default function InformationsUser() {
	return (
		<div className='col-2 d-flex flex-column text-center text-white'>
			<div className='mb-auto h-25' id='profile-foto-name'>
				<img className='img-fluid rounded-circle h-100' src='https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg' alt='foto' />
				<h1 className='mt-2'>Luffy</h1>
			</div>
			<div className='m-auto'>
				<div className='m-auto' id='profile-liga'>
					<img className='img-fluid' src={rankBonze} alt='' />
				</div>
				<div className='d-flex justify-content-center' id='profile-pontuation'>
					<p className='me-2'>VT<br></br>5</p>
					<p className='me-2'>DR<br></br>5</p>
					<p className='me-2'>KDA<br></br>0</p>
				</div>
			</div>
		</div>
	);
}
