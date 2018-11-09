import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({game, x, y}) {
        super(game, x, y, 'poop')

        game.physics.arcade.enable(this);
        this.body.velocity.x = -200;
        this.checkWorldBounds = true
        this.outOfBoundsKill = true
    }
}
