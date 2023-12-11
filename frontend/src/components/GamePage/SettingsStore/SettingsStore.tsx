import React, { SetStateAction, useState } from "react";
import { IoMdClose } from "react-icons/io";
import ShowItemsStore from "./ShowItemsStore";
import FakeApiStore from "./FakeApiStore";

type propsSettingsStore = {
	openStore: React.Dispatch<SetStateAction<boolean>>;
}

export default function SettingsStore(props: propsSettingsStore): JSX.Element {
	const [barPerfil, setBarPerfil] = useState(true)

	return (
		<div className="position-absolute top-50 start-50 translate-middle">
			<div className="d-flex">
				<button onClick={() => setBarPerfil(true)}>
					Bar Perfil
				</button>
				<button onClick={() => setBarPerfil(false)} >
					Bar Game
				</button>
				<IoMdClose onClick={() => props.openStore(false)}
					className="text-white ms-auto" size={30}
				/>
			</div>
			<div>
				{barPerfil ? <ShowItemsStore items={FakeApiStore('skinsBar')} /> :
					<ShowItemsStore items={FakeApiStore('skinsGame')} />
				}
			</div>
		</div>
	)
}
