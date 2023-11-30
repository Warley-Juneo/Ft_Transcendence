type propsInputButton = {
	newMember: React.RefObject<HTMLInputElement>,
	function: (e: any) => void,
	placeholder?: string,
}

export default function InputButton(props: propsInputButton): JSX.Element {
	return (
		<input
			type="text"
			className="remove-format-input"
			placeholder={props.placeholder ? props.placeholder : "Digite o nome do usuário" }
			ref={props.newMember}
			onKeyDown={props.function}
		/>
	)
}
