import Bar from "./Bar";
import Top10 from "./Top10";

export default function Ranking() {
	return (
		<div className="bg-custon-roxo h-100 p-2 rounded">
			<div className="d-flex flex-column h-100 p-5">
				<Bar />
				<div style={{height: '5%'}}></div>
				<div className="overflow-auto h-100">
					<Top10 />
					<Top10 />
					<Top10 />
					<Top10 />
					<Top10 />
					<Top10 />
					<Top10 />
					<Top10 />
					<Top10 />
					<Top10 />
					<Top10 />
					<Top10 />
				</div>
			</div>
		</div>
	)
}
