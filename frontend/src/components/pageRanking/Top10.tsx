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
			<p>{key}</p>
			<p>{statusPart[key as keyof RankingUser]}</p> {/* Use type assertion here */}
		  </div>
		));
		return (
		  <div className="d-flex justify-content-center" id='Pontos'>
			{renderScores}
		  </div>
		);
	  }

	return (
		<div className="row g-0 text-center shadow-grounps d-flex align-items-center p-2" style={{height: '10%'}}>
			<div className="col-5 h-100">
				<div className="row g-0 h-100">
					<div className="col-2 h-100">
						Rank
					</div>
					<div className="col-10 h-100">
						<div className="h-100">
							<img  className="rounded-circle mh-100 mw-100" src="https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg" alt="foto de perfil"/>
						</div>
					</div>
				</div>
			</div>

			<div className="col-2"></div>

			<div className="col-5">
				<div className="row g-0">
					<div className="col-9">
						{handleScore({VTR: 0, DRT: 0, EMPT: 0, PART: 0})}
					</div>
				</div>
			</div>
		</div>
	)
}
