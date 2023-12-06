import { useContext } from 'react';
import { ReactComponent as CoinIcon } from '../../static/game/coin.svg';
import { UserData } from '../InitialPage/Contexts/Contexts';

export default function Coins(): JSX.Element {
	const {user: {coins}} = useContext(UserData)
	return (
		<span className="ms-auto me-4 text-white">
			<div className="d-flex align-items-end">
				<p className="me-1 fs-5">{coins}</p>
				<CoinIcon style={{ height: '2rem', width: '2rem' }} />
			</div>
		</span>
	)
}
