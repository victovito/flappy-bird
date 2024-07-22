class UI {

    ui = document.getElementById("ui");
    /** @type {string[]} */
    templates = [];

    constructor() {
        for (let i = 0; i < this.ui.children.length; i++) {
            const child = this.ui.children[i];
            if (child.tagName == "TEMPLATE") {
                this.templates[child.id] = child.innerHTML;
            }
        }
        this.ui.innerHTML = "";
    }

    showTemplate(id, props) {
        const template = this.templates[id];
        if (template) {
            let html = template;
            if (props) {
                for (let prop of Object.keys(props)) {
                    html = html.replace(`{{${prop}}}`, props[prop]);
                }
            }
            this.ui.innerHTML = html;
        }
    }

}

export default UI;
