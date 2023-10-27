import rank1 from '../../static/rank1.png';
import rank2 from '../../static/rank2.png';

type dataUserPerfil = {
	name: string;
	vt: number;
	ept: number;
	dr: number;
	img: string;
}

const dataUser: dataUserPerfil = {
	name: 'Luffy',
	vt: 6,
	dr: 5,
	ept: 3,
	img: 'https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg'
}

export default function InformationsUser() {
	return (
		<div className='p-2 text-center text-white'>
			<div className={dataUser.vt <= 5 ? `mt-5 borderDivFotoRank1 d-flex` : 'mt-5 borderDivFotoRank2 d-flex'}>
				<img className='img-fluid rounded-circle m-auto' src={dataUser.img} alt='foto' />
			</div>
			<h2	 className='mt-2 letter-pixel'>{dataUser.name}</h2>
			<div className='d-flex flex-column align-items-center'>
				<div className='p-2'>
					<img className='img-fluid' src={dataUser.vt <= 5 ? rank1 : rank2} alt='' />
				</div>
				<div className={dataUser.vt <= 5 ? 'd-flex justify-content-center borderWriteRank1 p-4 w-75' : 'd-flex justify-content-center borderWriteRank2 p-3 pb-5 w-75'}>
					<p className='fw-bold me-2'>VT<br></br>{dataUser.vt}</p>
					<p className='fw-bold me-2'>DR<br></br>{dataUser.dr}</p>
					<p className='fw-bold me-2'>EPT<br></br>{dataUser.ept}</p>
					<p className='fw-bold me-2'>KDA<br></br>{dataUser.vt + dataUser.ept / dataUser.dr}</p>
				</div>
			</div>
		</div>
	);
}
