import { useState } from "react";
import BarConfigurations from "./barConfigurations";
import Configurations from "./Configurations";

export default function ChatPublic() {
	const [showConfigurations, setShowConfigurations] = useState(false);

	const handleClickConf = () => {
		setShowConfigurations(!showConfigurations);
	}

	return (
		<div className="bg-custon-roxo rounded h-100">
			<div className="row g-0 h-100">
				<div className="col-3 border-end" id='peoples'>
				</div>
				<div className="col-9 text-white p-1 d-flex flex-column h-100">
					<BarConfigurations handleClickConf={handleClickConf}/>
				{	 showConfigurations === true ? <Configurations /> : null}
				</div>
			</div>
		</div>
	)
}
