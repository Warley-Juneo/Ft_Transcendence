import { useEffect, useState } from "react"

type MessagensChatPrivate = {
	user: string
	messagens: string
	img: string
}

function mockResponse() : MessagensChatPrivate[] {
	const SimulatedMessages: MessagensChatPrivate[] = [
		{
			user: 'Wagratom',
			messagens: 'Iae Fausto, Já termino o back-end do projeto?',
			img: 'https://i.pinimg.com/originals/30/5f/68/305f68b547c8b43ae7f1dc8fed76af22.jpg',
		},
		{
			user: 'Wagratom',
			messagens: 'O joão ta enchendo o saco aqui',
			img: 'https://i.pinimg.com/originals/30/5f/68/305f68b547c8b43ae7f1dc8fed76af22.jpg',
		},
		{
			user: 'Fausto',
			messagens: 'Terminei não, to nem na metade do curso ainda kk',
			img: 'https://i.pinimg.com/originals/ab/86/b1/ab86b13309ad04f8b500b8f5f8330c06.jpg',
		},
		{
			user: 'Wagratom',
			messagens: 'Ja falei que isso ae e mooh suco de pera',
			img: 'https://i.pinimg.com/originals/30/5f/68/305f68b547c8b43ae7f1dc8fed76af22.jpg',
		},
		{
			user: 'Wagratom',
			messagens: 'Vamo copiar do GPT kkkkkkkkkk',
			img: 'https://i.pinimg.com/originals/30/5f/68/305f68b547c8b43ae7f1dc8fed76af22.jpg',
		},
		{
			user: 'Fausto',
			messagens: 'Marca ae, deixa eu termina esse video aqui',
			img: 'https://i.pinimg.com/originals/ab/86/b1/ab86b13309ad04f8b500b8f5f8330c06.jpg',
		},
		{
			user: 'Wagratom',
			messagens: 'Demora não se não eu vou fz sozinho',
			img: 'https://i.pinimg.com/originals/30/5f/68/305f68b547c8b43ae7f1dc8fed76af22.jpg',
		},
	]
	return SimulatedMessages;
}

export default function FormatMessagensList() {
	const [messagens, setMessagens] = useState<MessagensChatPrivate[]>([]);

	//Função para concatenar as mensagens de um mesmo usuario
	const formatedMessagens = (ListMessagens: MessagensChatPrivate[]): MessagensChatPrivate[] => {
		let ListMessagensFormatted: MessagensChatPrivate[] = []; //Lista de objetos formatados

		while (ListMessagens[0]) {
			let messagenFormatted: MessagensChatPrivate = { //Criando um novo objeto para a versão formatada
				user: ListMessagens[0].user,
				img: ListMessagens[0].img,
				messagens: ListMessagens[0].messagens,
			};

			let index: number = 0;
			while (ListMessagens[++index] && ListMessagens[index].user === messagenFormatted.user) { //Enquanto o proximo objeto for do mesmo usuario concateno a mensagem
				messagenFormatted.messagens += '\n' + ListMessagens[index].messagens;
			}
			ListMessagens.splice(0, index); //Removendo os objetos que ja foram concatenados
			ListMessagensFormatted.push(messagenFormatted); //Adicionando o objeto formatado na lista de objetos formatados
		}
		return ListMessagensFormatted;
	};

	const get_MessagensAPI = () => {
		let messagens: MessagensChatPrivate[] = mockResponse();
		messagens = formatedMessagens(messagens);
		console.log(messagens);
		setMessagens(messagens);
	}

	useEffect(() => {
		get_MessagensAPI();
	}, []);

	return (
		<div>
			{messagens.map((messagen, index) => {
				if (messagen.user === 'Wagratom') {
					return (
						<div className='d-flex justify-content-end mb-2'>
							<div className='bg-light rounded me-2 p-1' style={{ whiteSpace: 'pre-line' }}>
								{messagen.messagens}
							</div>
							<img style={{ height: '40px', width: '40px', borderRadius: '50%' }} src={messagen.img} alt='foto' />
						</div>
					);
				} else {
					return (
						<div className='d-flex mb-2'>
							<img style={{ height: '40px', width: '40px', borderRadius: '50%' }} src={messagen.img} alt='foto' />
							<div className='bg-light rounded me-2 p-1' style={{ whiteSpace: 'pre-line' }}>
								{messagen.messagens}
							</div>
						</div>
					);
				};
			})};
		</div>
	)
}
