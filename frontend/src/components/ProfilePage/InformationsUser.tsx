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

const rankMappings = [
	{ max: 5, rank: rank1, borderImg: 'mt-5 borderDivFotoRank1 d-flex', borderWrite: 'd-flex borderWriteRank1 w-100 justify-content-center align-items-center w-100' },
	{ max: 10, rank: rank2, borderImg: 'mt-5 borderDivFotoRank2 d-flex', borderWrite: 'd-flex borderWriteRank2 w-100 justify-content-center align-items-center pb-5' },
	{ max: 15, rank: rank3, borderImg: 'mt-5 borderDivFotoRank3 d-flex', borderWrite: 'd-flex borderWriteRank3 w-100 justify-content-center align-items-center w-100' },
	{ max: 20, rank: rank4, borderImg: 'mt-5 borderDivFotoRank4 d-flex', borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100' },
	{ max: 25, rank: rank4, borderImg: 'mt-5 borderDivFotoRank4 d-flex', borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100' },
	{ max: 30, rank: rank4, borderImg: 'mt-5 borderDivFotoRank4 d-flex', borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100' },
	{ max: 35, rank: rank5, borderImg: 'mt-5 borderDivFotoRank5 d-flex', borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100' },
	{ max: Infinity, rank: rank6, borderImg: 'mt-5 borderDivFotoRank6 d-flex', borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100' },
];

type formattingRankUser = {
	rank: string;
	borderImg: string;
	borderWrite: string;
}

export default function InformationsUser() {
	const [user, setInfosUser] = useState<infosUserPerfil>({} as infosUserPerfil);

	const handleRank = (pointers: number): formattingRankUser => {
		return rankMappings.find((item) => pointers <= item.max) ||
			rankMappings[rankMappings.length - 1];
	}

	const getProfile = (): void => {
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
	}

	let pointers: number = user._wins - user._loses;
	let maping: formattingRankUser = handleRank(pointers);

	useEffect(() => {
		getProfile();
	}, []);


	const { rank, borderImg, borderWrite } = maping;
	let aux = user._wins + user._draws;
	let kda: number = aux === 0 ? user._loses : aux / user._loses;
	return (
		<div className='text-center text-white'>
			<div className={borderImg}>
				<img className='img-fluid rounded-circle m-auto' src={user._avatar} alt='foto' />
			</div>
			<h2 className='mt-2 letter-pixel'>{user._nickname}</h2>
			<div className='d-flex flex-column align-items-center'>
				<div className='p-2'>
					<img className='img-fluid' src={rank} alt='' />
				</div>
				<div className={borderWrite} style={pointers > 15 ? { height: '200px' } : { height: '150px' }}>
					<p className='fw-bold me-2'>VT<br></br>{user._wins}</p>
					<p className='fw-bold me-2'>DR<br></br>{user._loses}</p>
					<p className='fw-bold me-2'>EPT<br></br>{user._draws}</p>
					<p className='fw-bold'>KDA<br></br>{kda}</p >
				</div>
			</div>
		</div>
	);
}
