export default class FPS {
    constructor(ctx) {
        this.ctx = ctx;
        this.frameCount = 0;
        this.currentSecond = 0;
        this.frameLastSecond = 0;
    }

    calculate () {
        this.prevSecond = Math.floor(Date.now() / 1000);
        if (this.prevSecond != this.currentSecond) {
            this.currentSecond = this.prevSecond;
            this.frameLastSecond = this.frameCount;
            this.frameCount = 1;
        } else {
            this.frameCount++;
        }
    }

    update () {
        this.calculate();
    }

    draw () {
        this.ctx.font = '12pt VT323';
        this.ctx.fillStyle = "#eeffaa";
        this.ctx.fillText("FPS: " + this.frameLastSecond, 5, 20);
    }
}