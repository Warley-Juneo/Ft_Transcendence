import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import AvatarAndUser from "./AvatarAndUser"
import Score from "./Score"

export type typeRaking = {
	points: number,
	avatar: string
	draws: number,
	ladder: number,
	loses: number,
	matches: number,
	nickname: string
	wins: number,
}

export default function TopRank() {
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

	let itemsCenter = "row g-0 h-100 d-flex d-flex align-items-center justify-content-center"

	return (
		<>
			{ranking.map((user, index) => (
				<div className="row g-0 text-center shadow-grounps p-2 mt-2 fw-bold">
					<div className="col-5 h-100">
						<div className={itemsCenter}>
							<div className="col-2">
								<p>{index + 1}</p>
							</div>
							<div className="col-10 h-100">
								<AvatarAndUser avatarUrl={user.avatar}
									nickname={user.nickname}
								/>
							</div>
						</div>
					</div>

					<div className="col-2"></div>

					<div className="col-5 h-100">
						<div className={itemsCenter}>
							<div className="col-10">
								<Score statusPart={user} />
							</div>
							<div className="col-2 h-100">
								<p>100</p>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	)
}
