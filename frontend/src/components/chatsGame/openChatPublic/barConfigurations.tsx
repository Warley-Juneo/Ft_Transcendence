import { AiTwotoneSetting } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

export default function BarConfigurations({openOrClosedConf}: {openOrClosedConf : () => void}) {
	const id = useParams();

	return (
		<div className="border-bottom d-flex align-items-end" style={{height: "55px"}}>
			<img
				src="https://i.etsystatic.com/37688069/r/il/d3e600/5143421340/il_600x600.5143421340_sm1f.jpg"
				alt="bordão sunny one picie"
				className="foto-list-friends"
			/>
			<h3>{id.id}</h3>
			<AiTwotoneSetting
				size={25}
				style={{color: 'white', cursor: 'pointer'}}
				className="my-auto ms-auto"
				onClick={openOrClosedConf}
			/>
		</div>

	)
}

