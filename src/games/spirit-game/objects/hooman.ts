export class Hooman extends Phaser.GameObjects.Sprite {
    // variables
    private speed: number;
    private moveVel: Phaser.Math.Vector2;
  
    constructor(params) {
      // Select random key
      const key = `adventurer_${['m', 'f'][Phaser.Math.Between(0, 1)]}${Phaser.Math.Between(1, 4)}`
      super(params.scene, params.x, params.y, key, params.frame);
  
      this.initImage();
      this.scene.add.existing(this);
    }
  
    private initImage() {
      // variables
      this.speed = 100;
      this.moveVel = this.randomMoveVel();
    
      // physics
      this.scene.physics.world.enable(this);
  
      // image
      this.setOrigin(0.5, 0.5);
      this.setDepth(0);
      this.setScale(4);
    }

    onHitObstacle(hooman: Hooman): void {
      hooman.moveVel = hooman.randomMoveVel();
    }

    private randomMoveVel(): Phaser.Math.Vector2 {
      switch (Phaser.Math.Between(0, 3)) {
        case 0: {
          return new Phaser.Math.Vector2(0, 1);
        }
        case 1: {
          return new Phaser.Math.Vector2(0, -1);
        }
        case 2: {
          return new Phaser.Math.Vector2(1, 0);
        }
        case 3: {
          return new Phaser.Math.Vector2(-1, 0);
        }
      }
    }
  
    update(): void {
      if (this.active) {
        this.handleInput();
      } else {
        this.destroy();
      }
    }
  
    private handleInput() {
      // move
      let v = this.moveVel.clone();
      v = v.scale(this.speed);
      this.body.velocity = v;
    }
  }
  