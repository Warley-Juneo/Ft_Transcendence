import Bar from "./Bar";
import Top10 from "./Top10";

export default function Ranking() {
	return (
		<div className="bg-custon-roxo h-100 rounded">
			<div className="d-flex flex-column h-100 p-5">
				<Bar />
				<div className="h-100 overflow-auto">
					<Top10 />
				</div>
			</div>
		</div>
	)
}
