import axios from 'axios';
import rank1 from '../../static/rankLevel/rank1.png';
import rank2 from '../../static/rankLevel/rank2.png';
import rank3 from '../../static/rankLevel/rank3.png';
import rank4 from '../../static/rankLevel/rank4.png';
import rank5 from '../../static/rankLevel/rank5.png';
import rank6 from '../../static/rankLevel/rank6.png';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type infosUserPerfil = {
	_nickname: string;
	_wins: number;
	_draws: number;
	_loses: number;
	_avatar: string;
}

type formattingRankUser = {
	rank: string;
	borderImg: string;
	borderWrite: string;
}

export default function InformationsUser() {
	let itemsRank: formattingRankUser = {rank: '', borderImg: '', borderWrite: ''};
	const [infosUser, setInfosUser] = useState<infosUserPerfil>({} as infosUserPerfil);

	useEffect(() => {
		axios.get('http://localhost:3000/users/profile ', {
			headers: {
				Authorization: Cookies.get('jwtToken'),
			}
		})
		.then((response) => {
			setInfosUser(response.data);
		}
		).catch((error) => {
			console.log("Error: ", error.response.data);
		})
	}, []);

	const handleRank = (pointers: number) => {
		if (pointers <= 5) {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank1 d-flex',
				borderWrite: 'd-flex borderWriteRank1 w-100 justify-content-center align-items-center',
				rank: rank1
			}
		}
		else if (pointers <= 10) {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank2 d-flex',
				borderWrite: 'd-flex borderWriteRank2 w-100 justify-content-center align-items-center pb-5',
				rank: rank2
			}
		}
		else if (pointers <= 15) {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank3 d-flex',
				borderWrite: 'd-flex borderWriteRank3 w-100 justify-content-center align-items-center w-100',
				rank: rank3
			}
		}
		else if (pointers <= 20) {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank4 d-flex',
				borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100',
				rank: rank4
			}
		}
		else if (pointers <= 25) {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank4 d-flex',
				borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100',
				rank: rank4
			}
		}
		else if (pointers <= 30) {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank4 d-flex',
				borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100',
				rank: rank4
			}
		}
		else if (pointers <= 35) {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank5 d-flex',
				borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100',
				rank: rank5
			}
		}
		else {
			itemsRank = {
				borderImg: 'mt-5 borderDivFotoRank6 d-flex',
				borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100',
				rank: rank6
			}
		}
	}

	let pointers : number = infosUser._wins - infosUser._loses;
	handleRank(pointers);
	const { rank, borderImg, borderWrite } = itemsRank;
	return (
		<div className='text-center text-white'>
			<div className={borderImg}>
				<img className='img-fluid rounded-circle m-auto' src={infosUser._avatar} alt='foto' />
			</div>
			<h2	 className='mt-2 letter-pixel'>{infosUser._nickname}</h2>
			<div className='d-flex flex-column align-items-center'>
				<div className='p-2'>
					<img className='img-fluid' src={rank} alt='' />
				</div>
				<div className={borderWrite} style={pointers > 15 ? {height: '200px'} : {height: '150px'}}>
					<p className='fw-bold me-2'>VT<br></br>{infosUser._wins}</p>
					<p className='fw-bold me-2'>DR<br></br>{infosUser._loses}</p>
					<p className='fw-bold me-2'>EPT<br></br>{infosUser._draws}</p>
					<p className='fw-bold'>KDA<br></br>{infosUser._wins + infosUser._draws / infosUser._loses}</p>
				</div>
			</div>
		</div>
	);
}
