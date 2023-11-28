type PropsButtonEdit = {
	addedInputNameDef180: () => void;
	content: string;
}
export default function ButtonEdit(props: PropsButtonEdit): JSX.Element {
	return (
		<button
			className='rounded bg-info px-3 my-3 styleButton'
			onClick={props.addedInputNameDef180}>
			<p>{props.content}</p>
		</button>
	)
}
