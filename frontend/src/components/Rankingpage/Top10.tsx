import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

type typeRaking = {
	points: number,
	_avatar: string
	_draws: number,
	_ladder: number,
	_loses: number,
	_matches: number,
	_nickname: string
	_wins: number,
}


export default function Top10() {
	const [ranking, setRanking] = useState<typeRaking[]>([])

	function getRanking() {
		axios.get('http://localhost:3000/users/ladder', {
			headers: {
				Authorization: Cookies.get('jwtToken')
			}, timeout: 5000
		}).then((res) => {
			setRanking(res.data.ladder)
		}
		)
	}
	useEffect(() => {
		getRanking()
	}, [])

	const handleScore = (statusPart: typeRaking) => {
		const getScore: { [key: string]: number } = { VTR: statusPart._wins, DER: statusPart._loses, EMP: statusPart._draws };
		const renderScores = Object.keys(getScore).map((key) => (
			<div className="ms-3" key={key}>
				<p className="text-primary">{key}</p>
				<p>{getScore[key]}</p>
			</div>
		));
		return (
			<div className="d-flex align-items-center justify-content-center h-100" id='Pontos'>
				{renderScores}
			</div>
		);
	}

	return (
		<>
			{ranking.map((user, index) => (
				<div className="row g-0 text-center shadow-grounps p-2 mt-2 fw-bold">
					<div className="col-5 h-100">
						<div className="row g-0 h-100">
							<div className="col-2 h-100">
								<div className="d-flex align-items-center justify-content-center h-100" id='Pontos'>
									<p>{index + 1}</p>
								</div>
							</div>
							<div className="col-10 h-100">
								<div className="d-flex align-items-center h-100">
									<div className="d-flex w-50 justify-content-center">
										<img
											className="rounded-circle mh-100 mw-100"
											src={user._avatar}
											alt="foto de perfil"  // Adicinar o unsuario que esta sendo printado
											style={{ height: '4rem', width: '4rem' }}
										/>
									</div>
									<div className="d-flex justify-content-center w-50">
										<p>{user._nickname}</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-2"></div>

					<div className="col-5 h-100">
						<div className="row g-0 h-100">
							<div className="col-10">
								{handleScore(user)}
							</div>
							<div className="col-2 h-100">
								<div className="d-flex align-items-center justify-content-center h-100" id='Pontos'>
									<p>100</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	)
}
