class AssetManager {
    /** @type {HTMLImageElement[]} */
    images = [];
    /** @type {HTMLAudioElement[]} */
    audios = [];

    constructor() {}

    async loadAllAssets() {
        await Promise.all([
            this.loadAudio("lost", "assets/lost.mp3"),
            this.loadAudio("meow1", "assets/meow1.mp3"),
            this.loadAudio("meow2", "assets/meow2.mp3"),
            this.loadAudio("meow3", "assets/meow3.mp3"),
            this.loadAudio("meow4", "assets/meow4.mp3"),
            this.loadAudio("meow5", "assets/meow5.mp3"),
            this.loadAudio("meow6", "assets/meow6.mp3"),
            this.loadAudio("meow7", "assets/meow7.mp3"),
            this.loadAudio("dying", "assets/dying.mp3"),
            this.loadAudio("purring", "assets/purring.mp3"),

            this.loadImage("button", "assets/button.png"),
            this.loadImage("point", "assets/point.png"),
            this.loadImage("kitty", "assets/kitty-anim.png"),
            this.loadImage("leafs", "assets/leafs.png"),
            this.loadImage("leafs-top", "assets/leafs-top.png"),
            this.loadImage("pipe-top", "assets/pipe-top.png"),
            this.loadImage("pipe-bottom", "assets/pipe-bottom.png"),
            this.loadImage("sky", "assets/sky.png"),
        ]);
    }

    async loadImage(name, path) {
        const img = document.createElement("img");
        img.src = path;
        await img.decode();
        this.images[name] = img;
    }

    async loadAudio(name, path) {
        const data = await fetch(path);
        const buffer = await data.arrayBuffer();
        const blob = new Blob([buffer], { type: "audio" })
        const audio = new Audio(URL.createObjectURL(blob));
        this.audios[name] = audio;
    }

    getImage(name) {
        return this.images[name];
    }

    getAudio(name) {
        return this.audios[name];
    }

}

export default AssetManager;
