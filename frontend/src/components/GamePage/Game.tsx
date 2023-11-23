import React, { useEffect, useState } from "react";

type informationGame = {
	position: [number, number],
	direction: [number, number],
	positionBar: number,
	collisions: number,
	speed: number
}

type BotTemp = {
	position: number,
	direction: number
}

const styleScreenGame: React.CSSProperties = {
	width: '100%',
	position: 'relative',
	height: '100%',
	display: 'flex',
};

export default function Game() {
	const [infosGame, setInfosGame] = useState<informationGame>({
		position: [20, 20], direction: [-2, 2], positionBar: 0,
		collisions: 0, speed: 0
	} as informationGame
	);

	const handleKeyPress = (e: KeyboardEvent) => {
		setInfosGame((prevPosition: informationGame) => {
			if (e.key === 'ArrowUp') {
				return { ...prevPosition, positionBar: (prevPosition.positionBar > 0 ? prevPosition.positionBar - 2 : prevPosition.positionBar) };
			}
			else if (e.key === 'ArrowDown') {
				return { ...prevPosition, positionBar: (prevPosition.positionBar < 74 ? prevPosition.positionBar + 2 : prevPosition.positionBar) };
			}
			return prevPosition;
		});
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setInfosGame((prevPosition: informationGame) => {
				const newInfosball: informationGame = { ...prevPosition };
				const [y, x] = newInfosball.position;
				const [dirY, dirX] = newInfosball.direction;
				const positionEixoYBar = newInfosball.positionBar;

				const auxNewY = y + dirY + (dirY < 0 ? -newInfosball.speed : newInfosball.speed);
				const auxNewX = x + dirX + (dirX < 0 ? -newInfosball.speed : newInfosball.speed);

				if (auxNewY < 0 || auxNewY > 98) {
					newInfosball.direction = [-dirY, dirX];
				}
				else if (auxNewX > 98) {
					newInfosball.direction = [dirY, -dirX];
				}
				else if (auxNewX < 4) {
					newInfosball.collisions++;
					newInfosball.speed = Math.floor(newInfosball.collisions++ / 3);
					if (auxNewX < 1 && (auxNewY < positionEixoYBar || auxNewY > positionEixoYBar + 26)) {
						clearInterval(intervalId);
						// alert('Você perdeu!');
					}
					let randon = Math.floor(Math.random() * 3 + 1);
					if (randon === 1)
						newInfosball.direction = [-dirY, -dirX];
					else if (randon === 2)
						newInfosball.direction = [dirY, -dirX];
					else
						newInfosball.direction = [-dirY, dirX];
				}
				const NewY = y + dirY + (dirY < 0 ? -newInfosball.speed : newInfosball.speed);
				const NewX = x + dirX + (dirX < 0 ? -newInfosball.speed : newInfosball.speed);
				newInfosball.position = [NewY, NewX];

				return newInfosball;
			});
		}, 75);
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const [positionBarBot, setPositionBarBot] = useState<BotTemp>({ position: 0, direction: 4 });
	useEffect(() => {
		const intervalId = setInterval(() => {
			setPositionBarBot((prevPosition) => {
				prevPosition.position += prevPosition.direction;
				console.log(prevPosition.position);
				if (prevPosition.position < 2 || prevPosition.position > 98) {
					return { ...prevPosition, direction: -prevPosition.direction };
				}
				return { ...prevPosition };
			});

		}, 200);
	}, [])

	return (
		<div className="bg-custon-roxo row g-0 position-relative" style={styleScreenGame} >
			<div
				className="bg-light position-relative"
				style={{ top: `${infosGame.positionBar}%`, height: '26%', width: '4%' }}>
			</div>
			<div className="d-flex justify-content-end h-100 position-absolute" style={{ top: `${positionBarBot.position}%` }}>
				<div className="bg-light" style={{ height: '26%', width: '4%' }}>
				</div>
			</div>

			<div
				className="bg-light position-absolute rounded-circle"
				style={{ height: '30px', width: '30px', top: `${infosGame.position[0]}%`, left: `${infosGame.position[1]}%` }}>
			</div>
			<div className="d-flex text-white align-items-end justify-content-center w-100">
				<p>collisions {infosGame.collisions}</p>
			</div>
		</div>
	);
}
