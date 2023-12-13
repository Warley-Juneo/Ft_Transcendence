import rank1 from '../../assets/rankLevel/rank1.png';
import rank2 from '../../assets/rankLevel/rank2.png';
import rank3 from '../../assets/rankLevel/rank3.png';
import rank4 from '../../assets/rankLevel/rank4.png';
import rank5 from '../../assets/rankLevel/rank5.png';
import rank6 from '../../assets/rankLevel/rank6.png';
import { RankFormating } from './typesProfile';

export const RankMappings = [
	{ max: 5, rank: rank1, borderImg: 'mt-2 borderDivFotoRank1 h-75', borderWrite: 'borderWriteRank1'},
	{ max: 10, rank: rank2, borderImg: 'mt-2 borderDivFotoRank2 h-75', borderWrite: 'borderWriteRank2'},
	{ max: 15, rank: rank3, borderImg: 'mt-2 borderDivFotoRank3 h-75', borderWrite: 'borderWriteRank3'},
	{ max: 30, rank: rank4, borderImg: 'mt-2 borderDivFotoRank4 h-75', borderWrite: 'borderWriteRank4'},
	{ max: 35, rank: rank5, borderImg: 'mt-2 borderDivFotoRank5 h-75', borderWrite: 'borderWriteRank4'},
	{ max: Infinity, rank: rank6, borderImg: 'mt-2 borderDivFotoRank6 h-75', borderWrite: 'borderWriteRank4'},
];

export default function HandleRank(pointers: number): RankFormating  {
	return RankMappings.find((item) => pointers <= item.max) ||
		RankMappings[RankMappings.length - 1];
};
