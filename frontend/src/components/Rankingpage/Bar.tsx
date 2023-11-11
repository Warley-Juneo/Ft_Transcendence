export default function Bar() {
	return (
		<div className="row g-0 align-items-center text-center shadow-grounps p-2">
			<div className="col-5">
				<div className="row g-0">
					<div className="col-2">
						Rank
					</div>
					<div className="col-10">
						<div className="d-flex w-100">
							<div className="d-flex w-50 justify-content-center">
								<p>Avatar</p>
							</div>
							<div className="d-flex justify-content-center w-50">
								<p>Perfil</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="col-2"></div>

			<div className="col-5">
				<div className="row g-0">
					<div className="col-10">
						Historico
					</div>
					<div className="col-2">
						Prontos
					</div>
				</div>
			</div>
		</div>
	)
}
