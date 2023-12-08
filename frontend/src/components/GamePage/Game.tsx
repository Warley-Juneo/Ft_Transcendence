import { CustomScene } from "./Config";
import React, { useEffect } from 'react';

const PongGame = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 1000,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
      },
      scene: [CustomScene]
    };

    const game = new Phaser.Game(config);

    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, []);

  return <div id="phaser-game-container" />;
};

export default PongGame;
