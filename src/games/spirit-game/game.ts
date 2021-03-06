/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Tank
 * @license      Digitsensitive
 */

import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";
import { MenuScene } from "./scenes/menu-scene";

const config: GameConfig = {
  title: "Tank",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 448,
  height: 256,
  zoom: 2.5,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, MenuScene, GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  backgroundColor: "#000000",
  render: { pixelArt: true, antialias: false }
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }

  preload(): void {
    this.boot;
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);
});
