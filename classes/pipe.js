import Engine from "./engine.js";
import Game from "./game.js";
import Vector2 from "./vector2.js";

class Pipe {

    gapHeight = 0;
    position = new Vector2();
    width = 150;

    passed = false;

    static get spawnPosition() {
        return Engine.main.renderer.width / 2 + 100;
    }

    constructor() {
        this.position.x = Pipe.spawnPosition;
        this.gapHeight = Math.random() * 400 - 200;
    }

    update() {
        this.position = this.position.add(Game.pipeVelocity.scale(Engine.main.delta));
    }

    /** @param {Vector2} point */
    sdf(point) {
        /**
         * @param {Vector2} p
         * @param {Vector2} s 
          */
        function sdRect(p, s) {
            const d = p.abs().sub(s);
            return d.max(new Vector2()).length() + Math.min(Math.max(d.x, d.y), 0);
        }

        const main_p = point.sub(this.position);
        const gap_p = point.sub(this.position.add(new Vector2(0, this.gapHeight)));

        const main = sdRect(main_p, new Vector2(this.width / 2, 1000));
        const gap = sdRect(gap_p, new Vector2(1000, Game.pipeGapSize / 2));

        return Math.max(main, -gap);
    }

}

export default Pipe;
