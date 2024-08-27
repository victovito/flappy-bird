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
        const sprite = Engine.main.assetManager.getImage("sky");

        const top = this.getScreenPosition(new Vector2(0, Game.playerHeightLimit));
        const bottom = this.getScreenPosition(new Vector2(0, -Game.playerHeightLimit));
        const height = bottom.y - top.y;
        const width = height * sprite.width / sprite.height;
        const originX = (Engine.main.time / 10) % 1 * -width;
        
        this.ctx.imageSmoothingEnabled = false;
        for (let x = originX; x < this.width; x += width) {
            this.ctx.drawImage(
                sprite,
                x, top.y,
                width + 1, height
            );
        }
    }

    drawLimits() {
        const sprite_top = Engine.main.assetManager.getImage("leafs-top");
        const sprite_bottom = Engine.main.assetManager.getImage("leafs");
        const top = this.getScreenPosition(new Vector2(0, Game.playerHeightLimit));
        const bottom = this.getScreenPosition(new Vector2(0, -Game.playerHeightLimit));
        const originX = (Engine.main.time / 1.5) % 1 * (-sprite_top.width * 4);

        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, top.y, this.width, -this.height);
        this.ctx.fillRect(0, bottom.y, this.width, this.height);
        
        this.ctx.imageSmoothingEnabled = false;
        for (let x = originX; x < this.width; x += sprite_top.width * 4) {
            this.ctx.drawImage(
                sprite_top,
                x, top.y,
                sprite_top.width * 4, sprite_top.height * 4
            );
            this.ctx.drawImage(
                sprite_bottom,
                x, bottom.y,
                sprite_bottom.width * 4, -sprite_bottom.height * 4
            );
        }
    }

    /** @param {Player} player  */
    drawPlayer(player) {
        const sprite = Engine.main.assetManager.getImage("kitty");
        const frames = 4;
        const spriteSize = sprite.width / frames;
        const key = Math.floor(Engine.main.time * 5) % frames;
        const position = this.getScreenPosition(player.position.add(new Vector2(-4, 11)));
        const length = this.getScreenLength(player.size * 1.3);
        
        // const oPosition = this.getScreenPosition(player.position);
        // const oLength = this.getScreenLength(player.size);
        // this.ctx.fillStyle = "#eeeeee";
        // this.ctx.beginPath();
        // this.ctx.arc(oPosition.x, oPosition.y, oLength / 2, 0, 7);
        // this.ctx.fill();

        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(
            sprite,
            spriteSize * key, 0, spriteSize, spriteSize,
            position.x - length / 2, position.y - length / 2, length, length
        );
    }
    
    /** @param {Pipe} pipe  */
    drawPipe(pipe) {
        const sprite_top = Engine.main.assetManager.getImage("pipe-top");
        const sprite_bottom = Engine.main.assetManager.getImage("pipe-bottom");
        
        const position = this.getScreenPosition(pipe.position);
        const width = this.getScreenLength(pipe.width);
        const gapPos = this.getScreenPosition(pipe.position.add(new Vector2(0, pipe.gapHeight)));
        const gapLen = this.getScreenLength(Game.pipeGapSize);

        const spriteHeight = width * sprite_top.height / sprite_top.width;

        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(sprite_top, position.x - width / 2, gapPos.y - gapLen / 2, width, -spriteHeight);
        this.ctx.drawImage(sprite_bottom, position.x - width / 2, gapPos.y + gapLen / 2, width, spriteHeight);
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
        this.preloadBackground();

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

    preloadBackground() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    /** @param {Vector2} position  */
    getScreenPosition(position) {
        return this.screenCenter.add(position.invertedY());
    }

    /** @param {Vector2} point  */
    getWorldPosition(point) {
        return point.sub(this.screenCenter).invertedY();
    }

    /** @param {number} length  */
    getScreenLength(length) {
        return length;
    }

}

export default Renderer;
