import { IconType } from "react-icons";


type buttonConfigurationProps = {
	Icon: IconType;
	content: string;
}

export default function ButtonConfiguration(props: buttonConfigurationProps) {
	return (
		<h5 className="p-2 hover">
			<props.Icon className="foto-list-friends bg-light text-black me-3 p-1" size={30} />
			{props.content}
		</h5>
	)
}
