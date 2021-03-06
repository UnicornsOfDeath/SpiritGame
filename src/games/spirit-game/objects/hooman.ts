import { Ghost } from "./ghost";
import { Hole } from "./obstacles/hole";

export class Hooman extends Phaser.GameObjects.Sprite {
    // variables
    private speed: number;
    private moveVel: Phaser.Math.Vector2;
    private key: string;
    private panicCounter: integer;

    playedSound: boolean;

    private dying: boolean = false;
  
    constructor(params) {
      // Select random key
      super(params.scene, params.x, params.y, 'adventurer_f1', params.frame);
      this.key = `adventurer_${['m', 'f'][Phaser.Math.Between(0, 1)]}${Phaser.Math.Between(1, 4)}`
  
      this.initImage();
      this.scene.add.existing(this);
    }
  
    private initImage() {
      // variables
      this.speed = 25;
      this.moveVel = this.randomMoveVel();
    
      // physics
      this.scene.physics.world.enable(this);
  
      // image
      this.setOrigin(0.5, 0.5);
      this.setDepth(10);

      // animation
      this.anims.load(this.key + '_walk');
      this.anims.play(this.key + '_walk');

      // sound and shit
      this.playedSound = false;
    }

    onHitObstacle(hooman: Hooman): void {
      hooman.moveVel = hooman.randomMoveVel();
    }

    onScared(ghost: Ghost) {
      const v = new Phaser.Math.Vector2(this.x, this.y).subtract(new Phaser.Math.Vector2(ghost.x, ghost.y));
      this.moveVel = this.moveVel.add(v);
    }

    onPanic(): boolean {
      const wasPanicked = this.panicCounter > 0;
      this.panicCounter = 100;
      return !wasPanicked;
    }

    onHitHole(hooman: Hooman, hole: Hole): boolean {
      if(Phaser.Geom.Rectangle.ContainsRect(hole.getBounds(), hooman.getBounds())) {
        hooman.dying = true;

        hooman.body.velocity = hooman.body.velocity.normalize().scale(20);

        hooman.scene.tweens.add({
          targets: hooman,
          props: { scaleX: 0,
                    scaleY: 0 },
          delay: 0,
          duration: 1000,
          ease: "Expo",
          easeParams: null,
          onComplete: function () {
            hooman.destroy()
          }
        });

        return false;
      }

      return true;
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
      if (this.panicCounter > 0) {
        this.panicCounter--;
      }
      if (this.active) {
        if(!this.dying) {
          this.handleInput();
        }
      } else {
        this.destroy();
      }
    }
  
    private handleInput() {
      // move
      this.moveVel.normalize();
      let v = this.moveVel.clone();
      v = v.scale(this.speed);
      if (this.panicCounter > 0)
      {
        v = v.scale(3);
      }
      this.body.velocity = v;
    }
  }
