import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

type MatchHistoryType = {
	id: string;
	opponent_avatar: string;
	opponent: string;
	my_score: number;
	opponent_score: number;
	status: string;
};

export default function MatchHistory({ userId }: { userId: string }) {
	const [matchHistory, setMatchHistory] = useState<MatchHistoryType[]>([]);

	const getMatchHistory = (): void => {
		const ENV = `user_id=${userId}`
		axios.get(`https://21f6-2804-14c-1a8-a325-fbe4-507a-840b-f839.ngrok-free.app/game/user/match-history/?${ENV}`, {
			headers: {
				Authorization: Cookies.get('jwtToken'),
				"ngrok-skip-browser-warning": "69420"
			}
		}).then((response) => {
			setMatchHistory(response.data);
		}).catch((error) => {
		})
	}
	useEffect(() => {
		getMatchHistory();
	}, []);

	if (!matchHistory) {
		return (
			<div className='d-flex p-2 text-center'>
				<p>Você não possui nenhuma partida no momento</p>
			</div>
		)
	}
	return (
		<div>
			{matchHistory.map((match: MatchHistoryType) => {
				return (
					<div className='d-flex p-2 justify-content-between hover text-center' key={match.id}>
						<div style={{ height: '4rem' }}>
							<img className='img-fluid rounded-circle h-100' src={match.opponent_avatar} alt={`avatar do ${match.opponent} `} />
						</div>
						<div className='fs-5 col-3'>
							<p>Oponente</p>
							<p>{match.opponent}</p>
						</div>
						<div className='fs-5 fw-bold col-2'>
							<p>HISTORY</p>
							<p>{`${match.opponent_score} X ${match.my_score}`}</p>
						</div>
						<p className='letter-pixel fs-1 derrota'>{match.status}</p>
					</div>
				)
			})}
		</div>
	);
}

//TODO: Remover outro Profile
