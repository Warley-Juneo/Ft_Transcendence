import rank1 from '../../static/rankLevel/rank1.png';
import rank2 from '../../static/rankLevel/rank2.png';
import rank3 from '../../static/rankLevel/rank3.png';
import rank4 from '../../static/rankLevel/rank4.png';
import rank5 from '../../static/rankLevel/rank5.png';
import rank6 from '../../static/rankLevel/rank6.png';
import { RankFormating } from './typesProfile';

export const RankMappings = [
	{ max: 5, rank: rank1, borderImg: 'mt-5 borderDivFotoRank1 d-flex', borderWrite: 'd-flex borderWriteRank1 w-100 justify-content-center align-items-center w-100' },
	{ max: 10, rank: rank2, borderImg: 'mt-5 borderDivFotoRank2 d-flex', borderWrite: 'd-flex borderWriteRank2 w-100 justify-content-center align-items-center pb-5' },
	{ max: 15, rank: rank3, borderImg: 'mt-5 borderDivFotoRank3 d-flex', borderWrite: 'd-flex borderWriteRank3 w-100 justify-content-center align-items-center w-100' },
	{ max: 20, rank: rank4, borderImg: 'mt-5 borderDivFotoRank4 d-flex', borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100' },
	{ max: 25, rank: rank4, borderImg: 'mt-5 borderDivFotoRank4 d-flex', borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100' },
	{ max: 30, rank: rank4, borderImg: 'mt-5 borderDivFotoRank4 d-flex', borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100' },
	{ max: 35, rank: rank5, borderImg: 'mt-5 borderDivFotoRank5 d-flex', borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100' },
	{ max: Infinity, rank: rank6, borderImg: 'mt-5 borderDivFotoRank6 d-flex', borderWrite: 'd-flex borderWriteRank4 w-100 justify-content-center align-items-end pb-5 w-100' },
];

export default function HandleRank(pointers: number): RankFormating  {
	return RankMappings.find((item) => pointers <= item.max) ||
		RankMappings[RankMappings.length - 1];
};
