class Vector2 {
    x = 0;
    y = 0;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /** @param {Vector2} vector  */
    add(vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    /** @param {Vector2} vector  */
    sub(vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    /** @param {number} factor  */
    scale(factor) {
        return new Vector2(this.x * factor, this.y * factor);
    }

    abs() {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }

    /** @param {Vector2} vector  */
    min(vector) {
        return new Vector2(Math.min(this.x, vector.x), Math.min(this.y, vector.y));
    }

    /** @param {Vector2} vector  */
    max(vector) {
        return new Vector2(Math.max(this.x, vector.x), Math.max(this.y, vector.y));
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    invertedY() {
        return new Vector2(this.x, -this.y);
    }

}

export default Vector2;
