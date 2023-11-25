import { IconType } from "react-icons";

export default function AudioRanger({Icone}: {Icone: IconType}): JSX.Element {
	return (
		<div className='d-flex'>
			<label htmlFor="customRange1" className="form-label me-5" style={{ display: 'block' }}><Icone /></label>
			<input type="range" className="form-range" min="0" max="5" step="0.5" id="customRange2"></input>
		</div>
	)
}
