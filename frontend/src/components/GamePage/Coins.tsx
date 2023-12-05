import { ReactComponent as CoinIcon } from '../../static/game/coin.svg';

export default function Coins(): JSX.Element {
	return (
		<span className="position-absolute top-0 end-0 p-3">
			<div className="d-flex align-items-end">
				<p className="me-2 fs-5">30</p>
				<CoinIcon style={{ height: '3rem', width: '3rem' }} />
			</div>
		</span>
	)
}
