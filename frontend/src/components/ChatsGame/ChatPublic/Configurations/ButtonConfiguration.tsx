import { IconType } from "react-icons";

type buttonConfigurationProps = {
	Icon: IconType;
	content: string;
	function: () => void;
}

export default function Buttons(props: buttonConfigurationProps) : JSX.Element {
	return (
		<h5 className="p-2 hover" onClick={props.function}>
			<props.Icon className="foto-list-friends bg-light text-black me-3 p-1" size={30} />
			{props.content}
		</h5>
	)
}
