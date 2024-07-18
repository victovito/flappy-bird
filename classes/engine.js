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
    
    lastFrame = Date.now();
    currentFrame = Date.now();
    

    get delta() {
        return (this.currentFrame - this.lastFrame) / 1000;
    }

    constructor() {
        Engine.main = this;
        this.renderer = new Renderer();
        this.ui = new UI();
        this.input = new Input();
        this.game = new Game();
    }

    start() {
        this.setupInputs();
        this.game.start();
    }

    update() {
        this.game.update();
        this.renderer.initFrame();
        this.game.pipes.forEach(pipe => this.renderer.drawPipe(pipe));
        this.renderer.drawPlayer(this.game.player);

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
        this.input.addBind("Space", () => this.game.player.jump());
        this.input.addBind("KeyR", () => this.game.start());
    }

}

export default Engine;
