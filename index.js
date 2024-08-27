import Engine from "./classes/engine.js";

let engine = new Engine();

function start() {
    engine.load().then(res => {
        engine.preloadScreen();
    });
    requestAnimationFrame(update);
}

function update() {
    engine.update();
    engine.lastFrame = engine.currentFrame;
    engine.currentFrame = Date.now();
    requestAnimationFrame(update);
}

start();
