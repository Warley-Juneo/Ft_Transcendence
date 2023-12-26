import { FormEvent } from 'react'
import { RiLockPasswordLine } from 'react-icons/ri'

export default function AlterPassword({ funcChange }: {
	funcChange: (form: FormEvent<HTMLFormElement>) => void
}): JSX.Element {
	return (
		<div>
			<h5 className="p-2 hover" data-bs-toggle="modal" data-bs-target="#modalConfirmPassword">
				<RiLockPasswordLine className="foto-list-friends bg-light text-black me-3 p-1" size={30} />
				Alterar Senha
			</h5>

			<div className="modal fade text-black" id="modalConfirmPassword" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">Confirme Password</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<form onSubmit={funcChange}>
							<div className="modal-body">
								<div>
									<label htmlFor="password">Confirme Password</label>
									<input name='password' type="password" className="form-control" id="password" placeholder="Password" />
								</div>
								<div>
									<label htmlFor="newPassword">Nova Password</label>
									<input name='newPassword' type="password" className="form-control" id="newPassword" placeholder="Nova Password" />
								</div>
								<div>
									<label htmlFor="confirmNewPassword">Confirme Nova Password</label>
									<input name='confirmNewPassword' type="password" className="form-control" id="confirmNewPassword" placeholder="Confirme Nova Password" />
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
								<button type="submit" className="btn btn-primary">Save changes</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
