import Engine from "./engine.js";
import Game from "./game.js";
import Vector2 from "./vector2.js";

class Player {

    position = new Vector2();
    velocity = new Vector2();
    size = 80;

    constructor() {}

    jump() {
        if (Game.isGameOver) return;
        this.velocity.y = Game.jumpVelocity;
    }

    update() {
        this.velocity.y += Game.gravity * Engine.main.delta;
        this.position = this.position.add(this.velocity.scale(Engine.main.delta));
    }

}

export default Player;
