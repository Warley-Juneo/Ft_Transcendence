import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

type MatchHistoryType = {
	id: number;
	userId: number;
	opponentId: number;
	winnerId: number;
	loserId: number;
	createdAt: string;
	updatedAt: string;
};

export default function MatchHistory() {
	const [matchHistory, setMatchHistory] = useState<MatchHistoryType[]>({} as MatchHistoryType[]);

	useEffect(() => {
		console.log("Huhu")
		axios.get('http://localhost:3000/game/user/match-history', {
			headers: {
				Authorization: Cookies.get('jwtToken'),
			}
		})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log("Error: ", error.response.data);
			})
	}, []);

	if (matchHistory) {
		return (
			<div className='d-flex p-2 text-center'>
				<p>Você não possui nenhuma partida no momento</p>
			</div>
		)
	}
	return (
		<div className='d-flex p-2 justify-content-between hover text-center'>
			<img className='img-fluid rounded-circle' src='https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg' alt='foto' />
			<div className='fs-5 col-3'>
				<p>Oponente</p>
				<p>xXMalMalvadoXx</p>
			</div>
			<div className='fs-5 fw-bold col-2'>
				<p>HISTORY</p>
				<p>8x10</p>
			</div>
			<p className='letter-pixel fs-1 derrota'>DERROTA</p>
		</div>
	);
}
