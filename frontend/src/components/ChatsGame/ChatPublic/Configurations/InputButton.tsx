type propsInputButton = {
	newMember: React.RefObject<HTMLInputElement>,
	function: (e: any) => void,
}

export default function InputButton(props: propsInputButton): JSX.Element {
	return (
		<input
			type="text"
			className="remove-format-input"
			placeholder="Nome da pessoa"
			ref={props.newMember}
			onKeyDown={props.function}
		/>
	)
}
