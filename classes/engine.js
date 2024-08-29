import AssetManager from "./assets.js";
import Game from "./game.js";
import Input from "./input.js";
import Renderer from "./renderer.js";
import UI from "./ui.js";

class Engine {

    /** @type {Engine} */
    static main;
    static timeScale = 1;
    
    /** @type {Renderer} */
    renderer;
    /** @type {AssetManager} */
    assetManager;
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
    started = false;

    get delta() {
        return (this.currentFrame - this.lastFrame) / 1000 * Engine.timeScale;
    }

    get time() {
        return (this.currentFrame - this.timeStart) / 1000 * Engine.timeScale;
    }

    constructor() {
        Engine.main = this;
        this.renderer = new Renderer();
        this.assetManager = new AssetManager();
        this.ui = new UI();
        this.input = new Input();
        this.game = new Game();
    }

    async load() {
        await this.assetManager.loadAllAssets();
        this.loading = false;
    }

    preloadScreen() {
        const element = this.ui.showTemplate("preload");
        /** @type {HTMLButtonElement} */
        const button = element.querySelector("#startbutton");
        button.onclick = () => this.start();
    }

    start() {
        this.started = true;
        this.setupInputs();
        this.game.start();
        const audio = Engine.main.assetManager.getAudio("lost");
        audio.loop = true;
        audio.volume = 0.5;
        audio.play();
    }

    update() {
        this.renderer.initFrame();
        if (this.loading) {
            this.renderer.loadingScreen();
        }
        else if (!this.started) {
            this.renderer.preloadBackground();
        } else {
            this.renderer.drawBackground();
            this.game.update();
            this.game.pipes.forEach(pipe => this.renderer.drawPipe(pipe));
            this.renderer.drawPlayer(this.game.player);
            this.renderer.drawLimits();
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
        this.input.addBind("KeyH", () => Game.drawHitboxes = !Game.drawHitboxes);
    }

}

export default Engine;
