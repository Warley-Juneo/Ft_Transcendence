import { useContext, useEffect, useRef, useState } from "react";

import Phaser from "phaser";
import background from "../../../assets/game/planets/backgrounds/bgSpace2.png";

import planetaAnel from '../../../assets/game/planets/planetaJupter.png';
import planetaFire from '../../../assets/game/planets/planetaFire.png';
import planetaLua from '../../../assets/game/planets/PlanetaLua.png';
import Lua from '../../../assets/game/planets/lua.png';
import planetaTerra from '../../../assets/game/planets/PlanetaTerra.png';
import satelete from '../../../assets/game/planets/satelete.png';
import Base from '../../../assets/game/planets/base.png';

import naveFrente from '../../../assets/game/nave/naveFrente.png';
import naveCostas from '../../../assets/game/nave/naveCostas.png';
import naveDescendo from '../../../assets/game/nave/naveDescendo.png';
import naveLateral from '../../../assets/game/nave/naveLateral.png';
import SettingsStore from "../SettingsStore/SettingsStore";
import SettingsPath from "../SettingsGame/SettingsGame";
import Ranking from "../../Rankingpage/Ranking";
import PageChats from "../../PublicChatsPage/PublicChats";
import DinamicProfile from "../../Profiles/DinamicProfile/DinamicProfile";
import { UserData } from "../../InitialPage/Contexts/Contexts";
import MiniProfile from "../../Profiles/MiniProfile/MiniProfile";

class GameData extends Phaser.Scene {
	nave: Phaser.Physics.Arcade.Sprite
	pntAnel: Phaser.Physics.Arcade.Sprite
	pntFire: Phaser.Physics.Arcade.Sprite
	pntLua: Phaser.Physics.Arcade.Sprite
	LuaTerra: Phaser.Physics.Arcade.Sprite
	pntTerra: Phaser.Physics.Arcade.Sprite
	sateleteChat: Phaser.Physics.Arcade.Sprite
	base: Phaser.Physics.Arcade.Sprite

	containerWidth: number
	containerHeight: number

	constructor() {
		super({ key: 'MyGameScene' });
		this.nave = {} as Phaser.Physics.Arcade.Sprite;
		this.pntAnel = {} as Phaser.Physics.Arcade.Sprite;
		this.pntFire = {} as Phaser.Physics.Arcade.Sprite;
		this.pntLua = {} as Phaser.Physics.Arcade.Sprite;
		this.LuaTerra = {} as Phaser.Physics.Arcade.Sprite;
		this.pntTerra = {} as Phaser.Physics.Arcade.Sprite;
		this.sateleteChat = {} as Phaser.Physics.Arcade.Sprite;
		this.base = {} as Phaser.Physics.Arcade.Sprite;
		this.containerHeight = window.innerHeight; // Altura do container ou da janela
		this.containerWidth = window.innerWidth; // Largura do container ou da janela
	}

	calculeScaleNave(valueEixoX: number, valueEixoY: number) {
		let percentageX = (valueEixoX * 100 / this.containerWidth) / 1000;
		percentageX *= percentageX > 0.06 ? 2 : 1;
		// let percentageY = (valueEixoY * 100 / containerHeight) / 1000;
		// percentageY *= percentageY > 0.06 ? 2 : 1;
		// return percentageX + percentageY + 0.1;
		return percentageX + 0.1;
	}

	preload(this: Phaser.Scene) {
		// Carregue suas imagens aqui, se necessário
		this.load.image("background", background);
		this.load.image("planetaAnel", planetaAnel);
		this.load.image("planetaFire", planetaFire);
		this.load.image("planetaLua", planetaLua);
		this.load.image('planetaTerra', planetaTerra);
		this.load.image('satelete', satelete);
		this.load.image('base', Base);
		this.load.image('Lua', Lua);

		this.load.image('naveFrente', naveFrente);
		this.load.image('naveCostas', naveCostas);
		this.load.image('naveDescendo', naveDescendo);
		this.load.image('naveLateral', naveLateral);
	}

	create() {
		const containerWidth = this.containerWidth;
		const containerHeight = this.containerHeight;

		// added background in the center of the scrren
		const background = this.add.sprite(containerWidth / 2, containerHeight / 2, "background");
		background.setScale(containerWidth / background.width, containerHeight / background.height); // Redimensiona o fundo para preencher a tela

		// added nave in the center of the scrren
		this.nave = this.physics.add.sprite((containerWidth / 2), (containerHeight / 2), "naveFrente");
		this.nave.setCollideWorldBounds(true); // Define a colisão com os limites do mundo
		this.nave.setScale(this.calculeScaleNave(containerWidth / 2, containerHeight / 2)); // Redimensiona a nave para que ela seja proporcional ao tamanho da tela

		this.pntFire = this.physics.add.sprite((containerWidth * 0.1), (containerHeight * 0.2), "planetaFire").setImmovable()
		this.pntLua = this.physics.add.sprite((containerWidth * 0.9), (containerHeight * 0.1), "planetaLua").setImmovable()
		this.pntAnel = this.physics.add.sprite((containerWidth * 0.9), (containerHeight * 0.8), "planetaAnel").setImmovable()
		this.pntTerra = this.physics.add.sprite((containerWidth * 0.6), (containerHeight * 0.3), "planetaTerra").setImmovable()
		this.LuaTerra = this.physics.add.sprite((containerWidth * 0.57), (containerHeight * 0.25), "Lua").setImmovable()
		this.sateleteChat = this.physics.add.sprite((containerWidth * 0.6), (containerHeight * 0.7), "satelete").setImmovable()
		this.base = this.physics.add.sprite((containerWidth * 0.1), (containerHeight * 0.9), "base").setImmovable()

		this.base.setScale(0.1)
		this.LuaTerra.setScale(0.3)
		this.pntLua.setScale(0.4);
		this.pntTerra.setScale(0.7)
		this.sateleteChat.setScale(0.2)
		this.sateleteChat.setAngle(295) //rotate the satelete

		this.base.setName("Base");
		this.pntAnel.setName("PntAnel");
		this.pntFire.setName("PntFire");
		this.pntLua.setName("PntLua");
		this.pntTerra.setName("PntTerra");
		this.sateleteChat.setName("Satelete");
		this.physics.world.setBounds(0, 0, containerWidth, containerHeight); // Define os limites do mundo para que a nave não possa sair da tela
	}

	update() {
		const curso = this.input.keyboard?.createCursorKeys(); // event listener para as teclas de seta

		if (!curso) return // Se não houver teclas de seta, retorne;

		if (curso.down.isDown || curso.left.isDown || curso.right.isDown || curso.up.isDown) {
			const { x, y } = this.nave;
			const inverseSizeX = -(-this.containerWidth + x)
			this.nave.setScale(this.calculeScaleNave(inverseSizeX, y));

			if (curso.left.isDown && curso.down.isDown) {
				this.nave.setTexture('naveDescendo');
				this.nave.setFlipX(true);
				this.nave.setVelocityX(-100);
				this.nave.setVelocityY(100);
			}
			else if (curso.right.isDown && curso.down.isDown) {
				this.nave.setTexture('naveDescendo');
				this.nave.setFlipX(false);
				this.nave.setVelocityX(100);
				this.nave.setVelocityY(100);
			}
			else if (curso.up.isDown && curso.left.isDown) {
				this.nave.setTexture('naveCostas');
				this.nave.setFlipX(true);
				this.nave.setVelocityX(-100);
				this.nave.setVelocityY(-100);
			}
			else if (curso.up.isDown && curso.right.isDown) {
				this.nave.setTexture('naveCostas');
				this.nave.setFlipX(false);
				this.nave.setVelocityX(100);
				this.nave.setVelocityY(-100);
			}
			else if (curso.up.isDown) {
				this.nave.setTexture('naveCostas');
				this.nave.setVelocityY(-100);
			}
			else if (curso.down.isDown) {
				this.nave.setTexture('naveFrente');
				this.nave.setVelocityY(100);
			}
			else if (curso.left.isDown) {
				this.nave.setTexture('naveLateral');
				this.nave.setFlipX(true);
				this.nave.setVelocityX(-100);
			}
			else if (curso.right.isDown) {
				this.nave.setTexture('naveLateral');
				this.nave.setFlipX(false);
				this.nave.setVelocityX(100);
			}
		} else { // Se nenhuma tecla de seta estiver pressionada pare a nave
			this.nave.setVelocityY(0);
			this.nave.setVelocityX(0);
		}

		this.physics.world.collide(this.nave, [
		this.pntAnel,
		this.pntFire,
		this.pntLua,
		this.pntTerra,
		this.sateleteChat,
		this.base
		], (rocket, planet) => {
			// Verifica se 'planet' é do tipo Sprite antes de acessar a propriedade 'name'
			if (planet instanceof Phaser.Physics.Arcade.Sprite) {
				// setCollisionStore((prev) => {
				// 	if (!prev) {
				// 		planetName.current = planet.name;
				// 		prev = true;
				// 	}
				// 	return prev;
				// })
			}
		});
	}

}

export default function Game(): JSX.Element {
	const dataUser = useContext(UserData).user;
	const gameContainerRef = useRef<HTMLDivElement>(null);


	useEffect(() => {
		const gameConfig: Phaser.Types.Core.GameConfig = {
			type: Phaser.AUTO,
			width: window.innerWidth,
			height: window.innerHeight,
			physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 0 },
					debug: false,
				}
			},
			scene: GameData
		};

		const game = new Phaser.Game(gameConfig);


		// Limpeza quando o componente for desmontado
		return () => {
			game.destroy(true);
		};
	}, []); // A dependência vazia garante que isso só seja executado uma vez

	return <div ref={gameContainerRef} className="h-100 position-relative" style={{ height: '100vh', width: '100vw' }}>
		{/* {collisionStore && planetName.current === 'PntLua' ? <SettingsStore openSettingsStore={setCollisionStore} /> : null}
		{collisionStore && planetName.current === 'PntFire' ? <SettingsPath openSettingsPath={setCollisionStore} /> : null}
		{collisionStore && planetName.current === 'PntTerra' ? <MiniProfile propsMiniProfile={setCollisionStore} /> : null}
		{collisionStore && planetName.current === 'Satelete' ? <PageChats openPageChats={setCollisionStore} /> : null}
		{collisionStore && planetName.current === 'Base' ? <Ranking openStore={setCollisionStore} /> : null} */}
		{/* {collisionStore && planetName.current === 'Terra' ? <DinamicProfile openDinamicProfile={setCollisionStore} */}
		{/* nickName={dataUser.nickname} id={dataUser.id}/> : null} */}
	</div>;
}

//TODO Aidicionar mini perfil do usuario
//Adicionar Ranking
