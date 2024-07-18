class Input {

    binds = [];

    constructor() {
        this.addListener();
    }

    /**
     * @param {string} key 
     * @param {() => void} callback 
     */
    addBind(key, callback) {
        this.binds[key] = callback;
    }

    addListener() {
        document.addEventListener("keydown", event => {
            const callback = this.binds[event.code];
            if (callback) {
                callback();
            }
        });
    }

}

export default Input;
