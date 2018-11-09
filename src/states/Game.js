/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Poop from '../sprites/Poop'
import lang from '../lang'

export default class extends Phaser.State {
    init() {
    }

    preload() {
    }

    create() {
        this.game.stage.backgroundColor = '#71c5cf'

        this.game.physics.startSystem(Phaser.Physics.ARCADE)

        this.deathSound = game.add.audio('fart');

        const bannerText = lang.text('welcome')
        let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
            font: '40px Bangers',
            smoothed: false
        })

        banner.padding.set(10, 16)
        banner.anchor.setTo(0.5)

        this.mushroom = new Mushroom({
            game: this.game,
            x: this.world.centerX,
            y: this.world.centerY,
        })

        this.game.add.existing(this.mushroom)

        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(() => {
            this.mushroom.jump()
        }, this);

        this.poops = this.game.add.group();

        this.timer = this.game.time.events.loop(1500, this.addRowOfPoops, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0",
            {font: "30px Arial", fill: "#ffffff"});

    }

    addRowOfPoops() {
        let hole = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i < 8; i++)
            if (i !== hole && i !== hole + 1 && i !== hole + 2)
                this.addOnePoop(this.game.width, i * 60 + 10);

        this.score += 1;
        this.labelScore.text = this.score;
    }

    addOnePoop(x, y) {
        this.poops.add(new Poop({
            game: this.game,
            x: x,
            y: y,
        }));
    }

    update() {
        if (!this.mushroom.inCamera)
            this.restartGame()
        if (this.mushroom && this.poops) {
            this.game.physics.arcade.overlap(this.mushroom, this.poops, () => {
                this.shouldRestart = true
            }, null, this);
        }


        if (this.shouldRestart) {
            this.restartGame()
        }
    }

    restartGame() {
        this.score = 0
        this.labelScore.text = this.score;
        this.deathSound.play()

        this.mushroom.destroy();
        this.mushroom = new Mushroom({
            game: this.game,
            x: this.world.centerX,
            y: this.world.centerY,
            asset: 'mushroom'
        })
        this.game.add.existing(this.mushroom)

        this.poops.forEach((poop) => {
            poop.kill()
        })
        this.shouldRestart = false;
    }

    render() {
        // if (__DEV__) {
        //   this.game.debug.spriteInfo(this.mushroom, 32, 32)
        // }
    }
}
