import rank1 from '../../static/rankLevel/rank1.png';
import rank2 from '../../static/rankLevel/rank2.png';
import rank3 from '../../static/rankLevel/rank3.png';
import rank4 from '../../static/rankLevel/rank4.png';
import rank5 from '../../static/rankLevel/rank5.png';
import rank6 from '../../static/rankLevel/rank6.png';

type dataUserPerfil = {
	name: string;
	vt: number;
	ept: number;
	dr: number;
	img: string;
}

const dataUser: dataUserPerfil = {
	name: 'Luffy',
	vt: 36,
	dr: 1,
	ept: 3,
	img: 'https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg'
}

type formattingRankUser = {
	rank: string;
	borderImg: string;
	borderWrite: string;
}

export default function InformationsUser() {
    let itemsRank: formattingRankUser = {rank: '', borderImg: '', borderWrite: ''};

	const handleRank = (pointers: number) => {
		if (pointers <= 5) {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank1 d-flex',
				borderWrite: 'd-flex justify-content-center borderWriteRank1 p-4 w-75',
				rank: rank1
			}
		}
		else if (pointers < 10) {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank2 d-flex',
				borderWrite: 'd-flex justify-content-center borderWriteRank2 p-3 pb-5 w-75',
				rank: rank2
			}
		}
		else if (pointers < 15) {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank3 d-flex',
				borderWrite: 'd-flex justify-content-center borderWriteRank3 p-5 w-75',
				rank: rank3
			}
		}
		else if (pointers < 20) {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank4 d-flex',
				borderWrite: 'd-flex justify-content-center borderWriteRank4 p-5 w-75',
				rank: rank4
			}
		}
		else if (pointers < 25) {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank4 d-flex',
				borderWrite: 'd-flex justify-content-center borderWriteRank4 p-5 w-75',
				rank: rank4
			}
		}
		else if (pointers < 30) {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank4 d-flex',
				borderWrite: 'd-flex justify-content-center borderWriteRank4 p-5 w-75',
				rank: rank4
			}
		}
		else if (pointers < 35) {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank5 d-flex',
				borderWrite: 'd-flex justify-content-center borderWriteRank4 p-5 w-75',
				rank: rank5
			}
		}
		else {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank6 d-flex',
				borderWrite: 'd-flex justify-content-center borderWriteRank4 p-5 w-75',
				rank: rank6
			}
		}
	}

	handleRank((dataUser.vt - dataUser.dr));
	const { rank, borderImg, borderWrite } = itemsRank;
	return (
		<div className='p-2 text-center text-white'>
			<div className={borderImg}>
				<img className='img-fluid rounded-circle m-auto' src={dataUser.img} alt='foto' />
			</div>
			<h2	 className='mt-2 letter-pixel'>{dataUser.name}</h2>
			<div className='d-flex flex-column align-items-center'>
				<div className='p-2'>
					<img className='img-fluid' src={rank} alt='' />
				</div>
				<div className={borderWrite}>
					<p className='fw-bold me-2'>VT<br></br>{dataUser.vt}</p>
					<p className='fw-bold me-2'>DR<br></br>{dataUser.dr}</p>
					<p className='fw-bold me-2'>EPT<br></br>{dataUser.ept}</p>
					<p className='fw-bold me-2'>KDA<br></br>{dataUser.vt + dataUser.ept / dataUser.dr}</p>
				</div>
			</div>
		</div>
	);
}
