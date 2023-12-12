import Bar from "./Bar/Bar";
import TopRank from "./TopRank/TopRank";
import bgTerra from '../../assets/game/planets/backgrounds/backgroundTerra.jpg'
import { SetStateAction } from "react";
import { IoMdClose as ButtonClosed } from "react-icons/io";

type propsRanking= {
	openStore: React.Dispatch<SetStateAction<boolean>>;
}

export default function Ranking(props: propsRanking): JSX.Element {
	const cssBackgroundTerra = {
		backgroundImage: `url(${bgTerra})`,
		backgroundSize: 'cover',
		backgroundPosition: 'contain',
		backgroundRepeat: 'no-repeat',
	}

	const cssButtonClosed: React.CSSProperties = {
		position: 'absolute',
		top: '-1rem',
		right: '-1rem',
		zIndex: 3,

		height: '3rem',
		width: '3rem',
		borderRadius: '0.5rem',
		backgroundColor: '#7cdedb',
		boxShadow: '2px 2px 1px #FFF inset, -8px -8px 8px #0f3a28 inset',

		cursor: 'pointer',
	}

	return (
		<div className="h-75 w-75 rounded position-absolute top-50 start-50 translate-middle" style={cssBackgroundTerra}>
			<ButtonClosed style={cssButtonClosed} onClick={() => props.openStore(false)}/>

			<div className="d-flex flex-column h-100 p-5">
				<Bar />
				<div className="h-100 overflow-auto">
					<TopRank />
				</div>
			</div>
		</div>
	)
}
