export class Plebs extends Phaser.GameObjects.Image {

    private speed: number;

    constructor(params) {
        super(params.scene, params.x, params.y, params.key, params.frame);
        this.initContainer();
        this.scene.add.existing(this);
    }

    private initContainer() {
        this.speed = 0;

        // image
        this.setDepth(0);
    }


    update(): void {}

}
