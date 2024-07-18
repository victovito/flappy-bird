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
        this.ctx.fillStyle = "#2a2a2a";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    resize() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
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
