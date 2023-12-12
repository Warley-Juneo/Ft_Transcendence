import Bar from "./Bar/Bar";
import TopRank from "./TopRank/TopRank";
import bgTerra from '../../assets/game/planets/backgrounds/backgroundTerra.jpg'

export default function Ranking() {
	const cssBackgroundTerra = {
		backgroundImage: `url(${bgTerra})`,
		backgroundSize: 'cover',
		backgroundPosition: 'contain',
		backgroundRepeat: 'no-repeat',
	}
	return (
		<div className="h-75 w-75 rounded position-absolute top-50 start-50 translate-middle" style={cssBackgroundTerra}>
			<div className="d-flex flex-column h-100 p-5">
				<Bar />
				<div className="h-100 overflow-auto">
					<TopRank />
				</div>
			</div>
		</div>
	)
}
