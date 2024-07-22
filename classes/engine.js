import Game from "./game.js";
import Input from "./input.js";
import Renderer from "./renderer.js";
import UI from "./ui.js";

class Engine {

    /** @type {Engine} */
    static main;
    
    /** @type {Renderer} */
    renderer;
    /** @type {UI} */
    ui;
    /** @type {Input} */
    input;
    /** @type {Game} */
    game;
    
    timeStart = Date.now();
    lastFrame = Date.now();
    currentFrame = Date.now();
    
    loading = true;

    get delta() {
        return (this.currentFrame - this.lastFrame) / 1000;
    }

    get time() {
        return (this.currentFrame - this.timeStart) / 1000;
    }

    constructor() {
        Engine.main = this;
        this.renderer = new Renderer();
        this.ui = new UI();
        this.input = new Input();
        this.game = new Game();
    }

    async load() {
        return new Promise((res, err) => {
            setTimeout(res, 1000);
        });
    }

    start() {
        this.loading = false;
        this.setupInputs();
        this.game.start();
    }

    update() {
        this.renderer.initFrame();
        if (!this.loading) {
            this.renderer.drawBackground();
            this.game.update();
            this.game.pipes.forEach(pipe => this.renderer.drawPipe(pipe));
            this.renderer.drawLimits();
            this.renderer.drawPlayer(this.game.player);
        } else {
            this.renderer.loadingScreen();
        }

        // let dist = Infinity;
        // this.game.pipes.forEach(pipe => {
        //     const curr = pipe.sdf(this.game.player.position);
        //     if (curr < dist) {
        //         dist = curr;
        //     }
        // });
        // this.renderer.drawSdf(this.game.player.position, dist);
    }

    setupInputs() {
        const jump = () => {
            this.game.player.jump();
            this.game.startPlaying();
        }
        this.input.addBind("Space", jump);
        this.input.addBind("KeyR", () => this.game.start());
    }

}

export default Engine;
