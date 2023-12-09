import Ace from '../../../assets/store/skins/AceIcon.svg'
import BarbaBranca from '../../../assets/store/skins/BarbaBranca.svg'
import Brook from '../../../assets/store/skins/BrookIcon.svg'
import Luffy from '../../../assets/store/skins/LuffyIcon.svg'
import Ussop from '../../../assets/store/skins/UssopIcon.svg'
import Law from '../../../assets/store/skins/Law.svg'

import faixa1 from '../../../assets/store/faixas/faixa1.svg'
import faixa2 from '../../../assets/store/faixas/faixa2.svg'
import faixa3 from '../../../assets/store/faixas/faixa3.svg'
import faixa4 from '../../../assets/store/faixas/faixa4.svg'
import faixa5 from '../../../assets/store/faixas/faixa5.svg'
import faixa6 from '../../../assets/store/faixas/faixa6.svg'

export type StoreItems = {
	photo: string,
	explanation: string,
	id: string,
	price: number,
	backgroundBuy: string,
}[][]

export default function FakeApiStore(type: string): StoreItems {
	if (type === 'skinsGame') {
		return  [
			[
				{
					photo: Ace,
					explanation: "Ace churrasqueiro",
					id: "AceIcon",
					price: 25,
					backgroundBuy: '',
				},
				{
					photo: Brook,
					explanation: "Brook Yohohohoho",
					id: "BrookIcon",
					price: 25,
					backgroundBuy: '',

				},
				{
					photo: Law,
					explanation: "Law nefado",
					id: "Law",
					price: 30,
					backgroundBuy: '',

				},
			],
			[
				{
					photo: BarbaBranca,
					explanation: "Barba Branca sem barba",
					id: "BarbaBranca",
					price: 35,
					backgroundBuy: '',

				},
				{
					photo: Luffy,
					explanation: "Luffy chapeu de plastico",
					id: "LuffyIcon",
					price: 45,
					backgroundBuy: '',

				},
				{
					photo: Ussop,
					explanation: "O Lendario GOD USOPP",
					id: "UssopIcon",
					price: 200,
					backgroundBuy: '',
				},
			]
		]
	}
	else if (type === 'skinsBar') {
		return [
			[
				{
					photo: faixa1,
					explanation: "Barra Simples",
					id: "faixa1",
					price: 15,
					backgroundBuy: faixa1,
				},
				{
					photo: faixa2,
					explanation: "Continua Simples",
					id: "faixa2",
					price: 20,
					backgroundBuy: faixa2,

				},
				{
					photo: faixa3,
					explanation: "Começando a ficar elegante",
					id: "faixa3",
					price: 25,
					backgroundBuy: faixa3,

				},
			],
			[
				{
					photo: faixa4,
					explanation: "Barra elegante",
					id: "faixa4",
					price: 30,
					backgroundBuy: faixa4,
				},
				{
					photo: faixa5,
					explanation: "Barra de um verdareiro HUNTER",
					id: "faixa5",
					price: 50,
					backgroundBuy: faixa5,
				},
				{
					photo: faixa6,
					explanation: "Barra do GOOD USOPP",
					id: "faixa6",
					price: 200,
					backgroundBuy: faixa6,
				}
			]
		]
	}
	return [] as StoreItems
}
