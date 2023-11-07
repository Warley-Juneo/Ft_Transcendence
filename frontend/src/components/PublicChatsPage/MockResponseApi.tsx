export type t_chat = {
	name: string;
	onlines: number;
	adm: string;
	chat_id: number;
};

export function returnResponseMocket() : t_chat[] {
	return (
		[
			{
				name: 'Aonde e o Bar?',
				onlines: 5,
				adm: 'Zoro',
				chat_id: 1,
			},
			{
				name: 'Cassinho online',
				onlines: 15,
				adm: 'Nami',
				chat_id: 2,
			},
			{
				name: 'Assistindo Master Chef',
				onlines: 8,
				adm: 'Sanji',
				chat_id: 3,
			},
			{
				name: 'Assistindo the good doctor',
				onlines: 3,
				adm: 'Chopper',
				chat_id: 4,
			},
			{
				name: 'O grande capitão Usopp',
				onlines: 11,
				adm: 'Ussop',
				chat_id: 5,
			},
		]
	)
}
