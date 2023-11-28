import { useEffect, useState } from "react"


export default function FormatMessagensList() {

	//Função para concatenar as mensagens de um mesmo usuario
	// const formatedMessagens = (ListMessagens: MessagensChatPrivate[]): MessagensChatPrivate[] => {
	// 	let ListMessagensFormatted: MessagensChatPrivate[] = []; //Lista de objetos formatados

	// 	while (ListMessagens[0]) {
	// 		let messagenFormatted: MessagensChatPrivate = { //Criando um novo objeto para a versão formatada
	// 			user: ListMessagens[0].user,
	// 			img: ListMessagens[0].img,
	// 			messagens: ListMessagens[0].messagens,
	// 		};

	// 		let index: number = 0;
	// 		while (ListMessagens[++index] && ListMessagens[index].user === messagenFormatted.user) { //Enquanto o proximo objeto for do mesmo usuario concateno a mensagem
	// 			messagenFormatted.messagens += '\n' + ListMessagens[index].messagens;
	// 		}
	// 		ListMessagens.splice(0, index); //Removendo os objetos que ja foram concatenados
	// 		ListMessagensFormatted.push(messagenFormatted); //Adicionando o objeto formatado na lista de objetos formatados
	// 	}
	// 	return ListMessagensFormatted;
	// };



	return (
		<div></div>
	)
}
