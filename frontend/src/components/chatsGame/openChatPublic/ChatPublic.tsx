import { useParams } from "react-router-dom";
import { AiTwotoneSetting, AiOutlineSetting } from 'react-icons/ai';

export default function ChatPublic() {
	const id = useParams();
	console.log(id);
	return (
		<div className="bg-custon-roxo h-100 rounded">
			<div className="row g-0 h-100">
				<div className="col-3 border-end h-100">
				</div>
				<div className="col-9 p-2 text-white">
					<div className="border-bottom d-flex align-items-end">
						<img
							src="https://i.etsystatic.com/37688069/r/il/d3e600/5143421340/il_600x600.5143421340_sm1f.jpg"
							alt="bordão sunny one picie"
							className="foto-list-friends"
						/>
						<h3>{id.id}</h3>
						<AiTwotoneSetting size={25} color="white" className="my-auto ms-auto"/>
					</div>
				</div>
			</div>
		</div>
	)
}
