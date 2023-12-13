import { useContext, useEffect, useRef, useState } from "react";

import Phaser from "phaser";
import backgroundSpace from "../../../assets/game/planets/backgrounds/bgSpace.png";

import planetaAnel from '../../../assets/game/planets/planetaJupter.png';
import planetaFire from '../../../assets/game/planets/planetaFire.png';
import planetaLua from '../../../assets/game/planets/PlanetaLua.png';
import planetaTerra from '../../../assets/game/planets/PlanetaTerra.png';
import satelete from '../../../assets/game/planets/satelete.png';

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


export default function Game(): JSX.Element {
	const dataUser = useContext(UserData).user;
	const gameContainerRef = useRef<HTMLDivElement>(null);

	const nave = useRef<Phaser.Physics.Arcade.Sprite>({} as Phaser.Physics.Arcade.Sprite);
	const pntAnel = useRef<Phaser.Physics.Arcade.Sprite>({} as Phaser.Physics.Arcade.Sprite)
	const pntFire = useRef<Phaser.Physics.Arcade.Sprite>({} as Phaser.Physics.Arcade.Sprite)
	const pntLua = useRef<Phaser.Physics.Arcade.Sprite>({} as Phaser.Physics.Arcade.Sprite)
	const pntTerra = useRef<Phaser.Physics.Arcade.Sprite>({} as Phaser.Physics.Arcade.Sprite)
	const sateleteChat = useRef<Phaser.Physics.Arcade.Sprite>({} as Phaser.Physics.Arcade.Sprite)

	const [collisionStore, setCollisionStore] = useState<boolean>(false);
	const planetName = useRef<string>('');

	useEffect(() => {
		if (!gameContainerRef.current) return;

		const containerHeight = gameContainerRef.current?.clientHeight || window.innerHeight; // Altura do container ou da janela
		const containerWidth = gameContainerRef.current?.clientWidth || window.innerWidth; // Largura do container ou da janela

		const calculeScaleNave = (valueEixoX: number, valueEixoY: number) => {
			let percentageX = (valueEixoX * 100 / containerWidth) / 1000;
			percentageX *= percentageX > 0.06 ? 2 : 1;
			// let percentageY = (valueEixoY * 100 / containerHeight) / 1000;
			// percentageY *= percentageY > 0.06 ? 2 : 1;
			// return percentageX + percentageY + 0.1;
			return percentageX +  0.1;
		}

		// Configurações básicas do jogo Phaser
		const config: Phaser.Types.Core.GameConfig = {
			type: Phaser.AUTO, // WebGL ou Canvas esse e o tipo de renderização
			parent: gameContainerRef.current, // Onde o jogo será renderizado
			scale: { // Configurações de escala do jogo
				mode: Phaser.Scale.ScaleModes.RESIZE, // Modo de escala
				autoCenter: Phaser.Scale.CENTER_BOTH, // Centralizar o jogo
				width: containerWidth, // Largura do jogo
				height: containerHeight, // Altura do jogo
			},
			scene: { // Cenas do jogo
				preload: preload, // Pré-carregamento de recursos
				create: create, // Criação de elementos
				update: update, // Lógica de atualização
			},
			physics: { // Configurações de física
				default: 'arcade', // Motor de física padrão
				arcade: { // Configurações do motor de física arcade
					gravity: { y: 0 }, // Gravidade do jogo
					debug: true, // Mostrar colisões
				},
			},
		};

		// Inicializa o jogo
		const game = new Phaser.Game(config);

		// Pré-carrega recursos (imagens, áudio, etc.)
		function preload(this: Phaser.Scene) {
			// Carregue suas imagens aqui, se necessário
			this.load.image("background", backgroundSpace);
			this.load.image("planetaAnel", planetaAnel);
			this.load.image("planetaFire", planetaFire);
			this.load.image("planetaLua", planetaLua);
			this.load.image('naveFrente', naveFrente);
			this.load.image('naveCostas', naveCostas);
			this.load.image('naveDescendo', naveDescendo);
			this.load.image('naveLateral', naveLateral);
			this.load.image('planetaTerra', planetaTerra);
			this.load.image('satelete', satelete);
		}

		// Criação de elementos do jogo
		function create(this: Phaser.Scene) { //Pharser.Scene é o tipo de this que estamos usando
			// Adicione os elementos do seu jogo aqui

			const background = this.add.sprite(containerWidth / 2, containerHeight / 2, "background"); // Adiciona o fundo do jogo no centro da tela
			background.setScale(containerWidth / background.width, containerHeight / background.height); // Redimensiona o fundo para preencher a tela

			// Phaser.Physics.Arcade.Sprite é o tipo de retorno de this.physics.add.sprite
			nave.current = this.physics.add.sprite((containerWidth / 2), (containerHeight / 2), "naveFrente") as Phaser.Physics.Arcade.Sprite;
			nave.current.setVelocityX(100); // Inicializa a velocidade horizontal da nave
			nave.current.setCollideWorldBounds(true); // Define a colisão com os limites do mundo
			nave.current.setScale(calculeScaleNave(containerWidth / 2, containerHeight / 2));

			//added planets
			pntFire.current = this.physics.add.sprite((containerWidth * 0.1), (containerHeight * 0.2), "planetaFire").setImmovable() as Phaser.Physics.Arcade.Sprite
			pntLua.current = this.physics.add.sprite((containerWidth * 0.9), (containerHeight * 0.1), "planetaLua").setImmovable() as Phaser.Physics.Arcade.Sprite
			pntAnel.current = this.physics.add.sprite((containerWidth * 0.9), (containerHeight * 0.8), "planetaAnel").setImmovable() as Phaser.Physics.Arcade.Sprite
			pntTerra.current = this.physics.add.sprite((containerWidth * 0.6), (containerHeight * 0.3), "planetaTerra").setImmovable() as Phaser.Physics.Arcade.Sprite
			sateleteChat.current = this.physics.add.sprite((containerWidth * 0.6), (containerHeight * 0.7	), "satelete").setImmovable() as Phaser.Physics.Arcade.Sprite

			pntLua.current.setScale(0.4);
			pntTerra.current.setScale(0.7)
			sateleteChat.current.setScale(0.2)
			sateleteChat.current.setAngle(295)

			pntAnel.current.setName("Anel");
			pntFire.current.setName("Fire");
			pntLua.current.setName("Lua");
			pntTerra.current.setName("Terra");
			sateleteChat.current.setName("Satelete");

			this.physics.world.setBounds(0, 0, containerWidth, containerHeight); // Define os limites do mundo para que a nave não possa sair da tela
		}

		// Lógica de atualização do jogo
		function update(this: Phaser.Scene) {
			const curso = this.input.keyboard?.createCursorKeys(); // event listener para as teclas de seta

			if (!curso) return // Se não houver teclas de seta, retorne;

			if (curso.down.isDown || curso.left.isDown || curso.right.isDown || curso.up.isDown) {
				const {x, y} = nave.current;
				const inverseSizeX = -(-containerWidth + x)
				nave.current.setScale(calculeScaleNave(inverseSizeX, y));

				if (curso.left.isDown && curso.down.isDown) {
					nave.current.setTexture('naveDescendo');
					nave.current.setFlipX(true);
					nave.current.setVelocityX(-100);
					nave.current.setVelocityY(100);
				}
				else if (curso.right.isDown && curso.down.isDown) {
					nave.current.setTexture('naveDescendo');
					nave.current.setFlipX(false);
					nave.current.setVelocityX(100);
					nave.current.setVelocityY(100);
				}
				else if (curso.up.isDown && curso.left.isDown) {
					nave.current.setTexture('naveCostas');
					nave.current.setFlipX(true);
					nave.current.setVelocityX(-100);
					nave.current.setVelocityY(-100);
				}
				else if (curso.up.isDown && curso.right.isDown) {
					nave.current.setTexture('naveCostas');
					nave.current.setFlipX(false);
					nave.current.setVelocityX(100);
					nave.current.setVelocityY(-100);
				}
				else if (curso.up.isDown) {
					nave.current.setTexture('naveCostas');
					nave.current.setVelocityY(-100);
				}
				else if (curso.down.isDown) {
					nave.current.setTexture('naveFrente');
					nave.current.setVelocityY(100);
				}
				else if (curso.left.isDown) {
					nave.current.setTexture('naveLateral');
					nave.current.setFlipX(true);
					nave.current.setVelocityX(-100);
				}
				else if (curso.right.isDown) {
					nave.current.setTexture('naveLateral');
					nave.current.setFlipX(false);
					nave.current.setVelocityX(100);
				}
			} else { // Se nenhuma tecla de seta estiver pressionada pare a nave
				nave.current.setVelocityY(0);
				nave.current.setVelocityX(0);
			}

			this.physics.world.collide(nave.current, [pntAnel.current,
				pntFire.current,
				pntLua.current,
				pntTerra.current,
				sateleteChat.current
			], (rocket, planet) => {
				// Verifica se 'planet' é do tipo Sprite antes de acessar a propriedade 'name'
				if (planet instanceof Phaser.Physics.Arcade.Sprite) {
					setCollisionStore((prev) => {
						if (!prev) {
							planetName.current = planet.name;
							prev = true;
						}
						return prev;
					})
				}
			});
		}

		// Limpeza quando o componente for desmontado
		return () => {
			game.destroy(true);
		};
	}, []); // A dependência vazia garante que isso só seja executado uma vez

	return <div ref={gameContainerRef} className="h-100 position-relative">
		{collisionStore && planetName.current === 'Lua' ? <SettingsStore openSettingsStore={setCollisionStore}/> : null}
		{collisionStore && planetName.current === 'Fire' ? <SettingsPath openSettingsPath={setCollisionStore}/> : null}
		{/* {collisionStore && planetName.current === 'Terra' ? <Ranking openStore={setCollisionStore}/> : null} */}
		{collisionStore && planetName.current === 'Satelete' ? <PageChats openPageChats={setCollisionStore}/> : null}
		{collisionStore && planetName.current === 'Terra' ? <DinamicProfile openDinamicProfile={setCollisionStore}
			nickName={dataUser.nickname} id={dataUser.id}/> : null}
	</div>;
}
