import { useState } from "react";
import BarConfigurations from "./barConfigurations";
import Configurations from "./Configurations";
import InputChats from "../InputChats";
import FormatMessagensList from "../ChatPrivate/FormatMessagensList";

export default function ChatPublic() {
	const [showConfigurations, setShowConfigurations] = useState(false);

	const openOrClosedConf = () => {
		setShowConfigurations(!showConfigurations);
	}

	return (
		<div className="bg-custon-roxo rounded text-white h-100">
			<div className="row g-0 h-100 p-2">
				<div className="col-3 border-end">
				</div>
				<div className="col-9 d-flex flex-column h-100 position-relative">
					<BarConfigurations openOrClosedConf={openOrClosedConf} />
					{showConfigurations === true ? <Configurations openOrClosedConf={openOrClosedConf} /> : null}
					<div className="h-100 text-black p-3 overflow-auto">
						<FormatMessagensList />
					</div>
					<InputChats />
				</div>
			</div>
		</div>
	)
}
