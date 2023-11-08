type RankingUser = {
	VTR: number,
	DRT: number,
	EMPT: number,
	PART: number,
}

export default function Top10() {

	const handleScore = (statusPart: RankingUser) => {
		const renderScores = Object.keys(statusPart).map((key) => (
			<div className="ms-3" key={key}>
				<p className="text-primary">{key}</p>
				<p>{statusPart[key as keyof RankingUser]}</p>
			</div>
		));
		return (
			<div className="d-flex align-items-center justify-content-center h-100" id='Pontos'>
				{renderScores}
			</div>
		);
	}

	return (
		<div className="row g-0 text-center shadow-grounps p-2 mt-2 fw-bold">
			<div className="col-5 h-100">
				<div className="row g-0 h-100">
					<div className="col-2 h-100">
						<div className="d-flex align-items-center justify-content-center h-100" id='Pontos'>
							0
						</div>
					</div>
					<div className="col-10 h-100">
						<div className="d-flex align-items-center justify-content-evenly h-100">
							<img
								className="rounded-circle mh-100 mw-100"
								src="https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg"
								alt="foto de perfil"  // Adicinar o unsuario que esta sendo printado
								style={{ height: '4rem', width: '4rem' }}
							/>
							<p>Bankai 007</p>
						</div>
					</div>
				</div>
			</div>

			<div className="col-2"></div>

			<div className="col-5 h-100">
				<div className="row g-0 h-100">
					<div className="col-10">
						{handleScore({ VTR: 0, DRT: 0, EMPT: 0, PART: 0 })}
					</div>
					<div className="col-2 h-100">
						<div className="d-flex align-items-center justify-content-center h-100" id='Pontos'>
							<p>100</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
