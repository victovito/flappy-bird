import Engine from "./engine.js";
import Pipe from "./pipe.js";
import Player from "./player.js";
import Vector2 from "./vector2.js";

class Game {

    static gravity = -3000;

    static jumpVelocity = 900;
    static playerHeightLimit = 450;

    static pipeGapSize = 300;
    static pipeVelocity = new Vector2(-300, 0);

    static isGameOver = false;
    static playing = false;

    /** @type {number} */
    score;
    /** @type {Player} */
    player;
    /** @type {Pipe[]} */
    pipes;

    constructor() {}

    /** @type {number} */
    spawnPipeInterval;

    start() {
        Game.isGameOver = false;
        Game.playing = false;
        this.score = 0;
        this.player = new Player();
        this.pipes = [];
        clearInterval(this.spawnPipeInterval);
        this.showInitialScreen();
    }

    update() {
        if (Game.playing) {
            this.player.update();
            this.pipes = this.pipes.filter(pipe => pipe.position.x > -Pipe.spawnPosition);
            if (!Game.isGameOver) {
                this.pipes.forEach(pipe => {
                    pipe.update();
                    if (!pipe.passed) {
                        if (pipe.position.x < -pipe.width / 2) {
                            pipe.passed = true;
                            this.score++;
                            this.showScore();
                        }
                    }
                    if (pipe.sdf(this.player.position) < this.player.size / 2) {
                        this.gameOver();
                    }
                });
                if (this.player.position.y >= Game.playerHeightLimit || this.player.position.y <= -Game.playerHeightLimit) {
                    this.gameOver();
                }
            }
        }
    }

    startPlaying() {
        if (Game.playing == true) return;
        Game.playing = true;
        this.spawnPipeInterval = setInterval(() => {
            const pipe = new Pipe();
            this.pipes.push(pipe);
        }, 1500 / Engine.timeScale);
        this.showScore();
    }

    gameOver() {
        Game.isGameOver = true;
        Engine.main.ui.showTemplate("gameover", { score: this.score });
        clearInterval(this.spawnPipeInterval);
    }

    showScore() {
        Engine.main.ui.showTemplate("playing", { score: this.score });
    }

    showInitialScreen() {
        Engine.main.ui.showTemplate("start");
    }

}

export default Game;
