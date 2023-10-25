import { useState } from "react";
import BarConfigurations from "./barConfigurations";
import Configurations from "./Configurations";
import { AiOutlineSend } from 'react-icons/ai';

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
					<div className='d-flex align-items-center'>
						<input className='remove-format-input' type='text' placeholder='Digite sua mensagem' />
						<button className='remove-format-button'><AiOutlineSend size={30} /></button>
					</div>
				</div>

			</div>
		</div>
	)
}
