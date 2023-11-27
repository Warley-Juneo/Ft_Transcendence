import Bar from "./Bar";
import TopRank from "./TopRank/TopRank";

export default function Ranking() {
	return (
		<div className="bg-custon-roxo h-100 rounded">
			<div className="d-flex flex-column h-100 p-5">
				<Bar />
				<div className="h-100 overflow-auto">
					<TopRank />
				</div>
			</div>
		</div>
	)
}
