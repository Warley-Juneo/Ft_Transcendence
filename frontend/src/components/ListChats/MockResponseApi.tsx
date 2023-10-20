export type t_chat = {
	name: string;
	onlines: number;
	adm: string;
};

export function returnResponseMocket() : t_chat[] {
	return (
		[
			{
				name: 'Aonde e o Bar?',
				onlines: 5,
				adm: 'Zoro',
			},
			{
				name: 'Cassinho online',
				onlines: 15,
				adm: 'Nami',
			},
			{
				name: 'Assistindo Master Chef',
				onlines: 8,
				adm: 'Sanji',
			},
			{
				name: 'Assistindo the good doctor',
				onlines: 3,
				adm: 'Chopper',
			},
			{
				name: 'O grande capitão Usopp',
				onlines: 11,
				adm: 'Ussop',
			},
		]
	)
}
