
import Coins from '../Coins'
import ButtonsItemsStore from './ButtonItemsStore'
import { StoreItems } from './FakeApiStore'


export default function ShowItemsStore({items}: {items: StoreItems}): JSX.Element {
	const cssDivFilhoSelectGame: React.CSSProperties = {
		position: 'relative',
		zIndex: 2,

		backgroundColor: '#3b0054',
		borderRadius: '1rem',
		boxShadow: '1px 2px 2px black inset, 0px -2px 2px #FFF inset',
		opacity: '1 !important',
		display: 'flex',
		flexDirection: 'column',
	}

	return (
		<div style={cssDivFilhoSelectGame}>
			<Coins />
			{items.map((listItems) => {
				return (
					<div className="d-flex p-3" id='divOptionsStartGame'>
						{listItems.map((item) => {
							return (
								<ButtonsItemsStore
									photo={item.photo}
									explanation={item.explanation}
									id={item.id}
									price={item.prie}
									backgroundBuy={item.backgroundBuy}
									key={item.id}
								/>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}
