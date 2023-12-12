import { SetStateAction } from "react";
import { IoMdClose as Closed } from "react-icons/io";

type propsButtonClosed = {
	backgroundColor: string;
	backgroundShadow: string;
	openStore: React.Dispatch<SetStateAction<boolean>>;
}

export default function ButtonClosed(props: propsButtonClosed): JSX.Element {
	const cssButtonClosed: React.CSSProperties = {
		position: 'absolute',
		top: '-1rem',
		right: '-1rem',
		zIndex: 3,

		height: '3rem',
		width: '3rem',
		borderRadius: '0.5rem',
		backgroundColor: props.backgroundColor,
		boxShadow: `2px 2px 1px #FFF inset, -8px -8px 8px ${props.backgroundShadow} inset`,

		cursor: 'pointer',
	}
	return (
		<Closed style={cssButtonClosed} onClick={() => props.openStore(false)}/>
	)
}
