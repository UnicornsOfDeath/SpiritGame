/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Tank: Game Scene
 * @license      Digitsensitive
 */

import { Player } from "../objects/player";
import { Enemy } from "../objects/enemy";
import { Ghost } from "../objects/ghost";
import { Obstacle } from "../objects/obstacles/obstacle";
import { Hooman } from "../objects/hooman";

export class GameScene extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private layer: Phaser.Tilemaps.StaticTilemapLayer;

  private player: Player;
  private ghost1: Ghost;
  private enemies: Phaser.GameObjects.Group;
  private hoomans: Phaser.GameObjects.Group;
  private obstacles: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {}

  create(): void {
    // animations
    for (let sex of ['m', 'f']) {
      for (let number of [1, 2, 3, 4]) {
        const key = `adventurer_${sex}${number}`
        const config = {
          key: key + '_walk',
          frames: this.anims.generateFrameNumbers(key, {
            frames: [0, 1, 2, 3]
          }),
          frameRate: 6,
          yoyo: false,
          repeat: -1
        };
        this.anims.create(config);
      }
    }

    // create tilemap from tiled JSON
    this.map = this.make.tilemap({ key: "freshMap" });

    this.tileset = this.map.addTilesetImage("tiles");
    this.layer = this.map.createStaticLayer("tileLayer", this.tileset, 0, 0);
    this.layer.setCollisionByProperty({ collide: true });

    this.obstacles = this.add.group({
      /*classType: Obstacle,*/
      runChildUpdate: true
    });

    this.enemies = this.add.group({
      /*classType: Enemy*/
    });
    this.hoomans = this.add.group({
      /*classType: Hooman*/
    });
    this.convertObjects();

    // collider layer and obstacles
    this.physics.add.collider(this.player, this.layer);
    this.physics.add.collider(this.player, this.obstacles);
    this.physics.add.collider(this.ghost1, this.layer);
    this.physics.add.collider(this.ghost1, this.obstacles);


    // collider for bullets
    this.physics.add.collider(
      this.player.getBullets(),
      this.layer,
      this.bulletHitLayer,
      null,
      this
    );

    this.physics.add.collider(
      this.player.getBullets(),
      this.obstacles,
      this.bulletHitObstacles,
      null,
      this
    );

    this.enemies.children.each((enemy: Enemy) => {
      this.physics.add.overlap(
        this.player.getBullets(),
        enemy,
        this.playerBulletHitEnemy,
        null,
        this
      );
      this.physics.add.overlap(
        enemy.getBullets(),
        this.player,
        this.enemyBulletHitPlayer,
        null
      );

      this.physics.add.collider(
        enemy.getBullets(),
        this.obstacles,
        this.bulletHitObstacles,
        null
      );
      this.physics.add.collider(
        enemy.getBullets(),
        this.layer,
        this.bulletHitLayer,
        null
      );
    }, this);

    this.hoomans.children.each((hooman: Hooman) => {
      this.physics.add.collider(hooman, this.layer, hooman.onHitObstacle, null);
      this.physics.add.collider(hooman, this.obstacles, hooman.onHitObstacle, null);
      this.physics.add.collider(hooman, this.hoomans, hooman.onHitObstacle, null);
    })

    this.cameras.main.startFollow(this.ghost1);
  }

  update(): void {
    this.player.update();
    this.ghost1.update();

    this.enemies.children.each((enemy: Enemy) => {
      enemy.update();
      if (this.player.active && enemy.active) {
        var angle = Phaser.Math.Angle.Between(
          enemy.body.x,
          enemy.body.y,
          this.player.body.x,
          this.player.body.y
        );

        enemy.getBarrel().angle =
          (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
      }
    }, this);

    this.hoomans.children.each((hooman: Hooman) => {
      hooman.update();
    }, this);
  }

  private convertObjects(): void {
    // find the object layer in the tilemap named 'objects'
    const objects = this.map.getObjectLayer("objects").objects as any[];

    objects.forEach(object => {
      switch (object.type) {
        case "player": {
        this.player = new Player({
          scene: this,
          x: object.x,
          y: object.y,
          key: "tankBlue"
        });
        break;
      }
      case "enemy": {
        let enemy = new Enemy({
          scene: this,
          x: object.x,
          y: object.y,
          key: "tankRed"
        });

        this.enemies.add(enemy);
        break;
      }
      case "ghost1": {
        this.ghost1 = new Ghost({
          scene: this,
          x: object.x,
          y: object.y,
          key: "ghost1"
        });
        break;
      }
      case "hooman": {
        let hooman = new Hooman({
          scene: this,
          x: object.x,
          y: object.y
        });

        this.hoomans.add(hooman);
        break;
      }
      default: {
        let obstacle = new Obstacle({
          scene: this,
          x: object.x,
          y: object.y - 40,
          key: object.type
        });

        this.obstacles.add(obstacle);
        break;
      }
    }
    });
  }

  private bulletHitLayer(bullet): void {
    bullet.destroy();
  }

  private bulletHitObstacles(bullet, obstacle): void {
    bullet.destroy();
  }

  private enemyBulletHitPlayer(bullet, player): void {
    bullet.destroy();
    player.updateHealth();
  }

  private playerBulletHitEnemy(bullet, enemy): void {
    bullet.destroy();
    enemy.updateHealth();
  }
}
