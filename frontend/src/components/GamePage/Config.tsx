import React, { useEffect } from 'react';
import Phaser from 'phaser';
import pong from '../../assets/game/R.png'

export class CustomScene extends Phaser.Scene {
  paddle1: any;
  paddle2: any;
  paddle1UpKey: any;
  paddle1DownKey: any;
  paddle2UpKey: any;
  paddle2DownKey: any;
  ball: any;

  preload() {
    this.load.image('paddle', pong);
    this.load.image('ball', 'caminho/para/imagem/da/bola.png');
  }

  create() {
    this.paddle1 = this.physics.add.sprite(50, this.scale.height / 2, 'paddle')
      .setImmovable(true)
      .setScale(0.5);
    this.paddle2 = this.physics.add.sprite(this.scale.width - 50, this.scale.height / 2, 'paddle')
      .setImmovable(true)
      .setScale(0,5);
    this.ball = this.physics.add.sprite(this.scale.width / 2, this.scale.height / 2, 'ball');

    this.ball.setVelocity(300, 0);
    this.ball.setBounce(1);
    this.ball.setCollideWorldBounds(true);

    this.physics.add.collider(this.ball, this.paddle1);
    this.physics.add.collider(this.ball, this.paddle2);

    if (this.input && this.input.keyboard) {
      this.paddle1UpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.paddle1DownKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.paddle2UpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      this.paddle2DownKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }
  }

  update() {
    if (this.paddle1UpKey && this.paddle1UpKey.isDown) {
      this.paddle1.setVelocityY(-150);
    } else if (this.paddle1DownKey && this.paddle1DownKey.isDown) {
      this.paddle1.setVelocityY(150);
    }

    if (this.paddle2UpKey && this.paddle2UpKey.isDown) {
      this.paddle2.setVelocityY(-150);
    } else if (this.paddle2DownKey && this.paddle2DownKey.isDown) {
      this.paddle2.setVelocityY(150);
    }

    if (this.physics.world.collide(this.ball, this.paddle1)) {
      // Calcula a diferença entre o centro da raquete e o ponto de colisão
      let diff = this.ball.y - this.paddle1.y;
      // Se a bola colide no centro da raquete, não altera o ângulo
      if (diff === 0) {
        diff = 0.5;
      }
      // Ajusta a velocidade vertical da bola com base na diferença
      this.ball.setVelocityY(300, diff);
    }
  
    // Verifica se a bola está colidindo com a raquete do jogador 2
    if (this.physics.world.collide(this.ball, this.paddle2)) {
      let diff = this.ball.y - this.paddle2.y;
      if (diff === 0) {
        diff = 0.5;
      }
      this.ball.setVelocityY(300, diff);
    }
  }
}

