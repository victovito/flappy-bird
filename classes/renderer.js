import Engine from "./engine.js";
import Game from "./game.js";
import Pipe from "./pipe.js";
import Player from "./player.js";
import Vector2 from "./vector2.js";

class Renderer {
    /** @type {HTMLCanvasElement} */
    canvas;
    /** @type {CanvasRenderingContext2D } */
    ctx;

    get width() { return this.canvas.width; }
    get height() { return this.canvas.height; }
    get screenCenter() { return new Vector2(this.width / 2, this.height / 2); }

    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    initFrame() {
        this.resize();
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    resize() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }

    drawBackground() {
        this.ctx.fillStyle = "#2a2a2a";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawLimits() {
        const top = this.getScreenPosition(new Vector2(0, Game.playerHeightLimit));
        const bottom = this.getScreenPosition(new Vector2(0, -Game.playerHeightLimit));
        this.ctx.fillStyle = "#1a1a1a";
        this.ctx.fillRect(0, top.y, this.width, -this.height);
        this.ctx.fillRect(0, bottom.y, this.width, this.height);
    }

    /** @param {Player} player  */
    drawPlayer(player) {
        const position = this.getScreenPosition(player.position);
        const length = this.getScreenLength(player.size);

        this.ctx.fillStyle = "#eeeeee";

        // this.ctx.fillRect(position.x - length / 2, position.y - length / 2, length, length);
        this.ctx.beginPath();
        this.ctx.arc(position.x, position.y, length / 2, 0, 7);
        this.ctx.fill();
    }
    
    /** @param {Pipe} pipe  */
    drawPipe(pipe) {
        const position = this.getScreenPosition(pipe.position);
        const width = this.getScreenLength(pipe.width);
        const gapPos = this.getScreenPosition(pipe.position.add(new Vector2(0, pipe.gapHeight)));
        const gapLen = this.getScreenLength(Game.pipeGapSize);
        
        this.ctx.fillStyle = "#555555";
        
        this.ctx.fillRect(position.x - width / 2, 0, width, gapPos.y - gapLen / 2);
        this.ctx.fillRect(position.x - width / 2, this.height, width, -(this.height - (gapPos.y + gapLen / 2)));
    }
    
    /** 
     * @param {Vector2} point 
     * @param {number} dist 
     * */
    drawSdf(point, dist) {
        if (dist < 0) return;
        
        const position = this.getScreenPosition(point);
        const radius = this.getScreenLength(dist);

        this.ctx.strokeStyle = "#ffffff";

        this.ctx.beginPath()
        this.ctx.arc(position.x, position.y, radius, 0, 7);
        this.ctx.stroke();
    }

    loadingScreen() {
        // background
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.width, this.height);

        // spinner
        const sc = this.screenCenter;
        const size = new Vector2(200, 25);
        const speed = 50;
        const offset = new Vector2((Engine.main.time * speed) % (size.y * 2), 0);
        
        // this.ctx.fillStyle = "#333";
        // this.ctx.fillRect(sc.x - size.x / 2, sc.y - size.y / 2, size.x, size.y);

        this.ctx.fillStyle = "#fff";

        for (let i = 0; i < (size.x / size.y) + 1; i++) {
            if (i % 2 == 0) {
                const position = sc.sub(size.scale(0.5))
                    .add(new Vector2(i * size.y, 0))
                    .add(offset)
                    .sub(new Vector2(size.y, 0));
                
                const startAdjust = Math.min(0, position.x - (sc.x - size.x / 2));
                const endAdjust = Math.max(Math.min(0, (sc.x + size.x / 2) - (position.x + size.y)), -size.y);

                this.ctx.fillRect(
                    Math.min(Math.max(position.x, sc.x - size.x / 2), sc.x + size.x / 2),
                    position.y,
                    size.y + startAdjust + endAdjust,
                    size.y
                );
            }
        }
    }

    /** @param {Vector2} position  */
    getScreenPosition(position) {
        return this.screenCenter.add(position.invertedY());
    }

    /** @param {number} length  */
    getScreenLength(length) {
        return length;
    }

}

export default Renderer;
