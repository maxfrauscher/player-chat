import GameObject from "./gameObject";
import Input from "./input";

export default class Camera extends GameObject {
    constructor(ctx, map) {
        super(ctx, map);

        // dir
        this.dirX = 0;
        this.dirY = 0;

        this.dimensions = {
            width: 480,
            height: 480
        };

        // speed
        this.camSpeed = 6;
    }

    // tile cords
    placeAt (x, y) {
        //place map to coords
        this.position.world.x = x * 48; //TODO: coords * tileW
        this.position.world.y = y * 48;
    }

    focus (gameObject) {
        this.position.world.x = gameObject.getPosition().world.x;
        this.position.world.y = gameObject.getPosition().world.y;
    }

    moveX (value) {
        this.dirX = value;
    }

    moveY (value) {
        this.dirY = value;
    }

    move () {
        if (Input.keysDown.arrow_up || Input.keysDown.gp_rightstick_up) {
            this.moveY(-1);
        } else {
            this.moveY(0);
        }
        if (Input.keysDown.arrow_down || Input.keysDown.gp_rightstick_down) {
            this.moveY(1);
        }

        if (Input.keysDown.arrow_left || Input.keysDown.gp_rightstick_left) {
            this.moveX(-1);
        } else {
            this.moveX(0);
        }
        if (Input.keysDown.arrow_right || Input.keysDown.gp_rightstick_right) {
            this.moveX(1);
        }

        //move
        this.position.world.x += this.dirX * this.camSpeed;
        this.position.world.y += this.dirY * this.camSpeed;
    }

    draw () {
        //if input just for Testing, can be deleted
        if (Input.keysPressed.gp_y || Input.keysPressed.space) {
            this.ctx.fillStyle = "rgba(1,1,1,0.3)";
            this.ctx.strokeStyle = "rgba(1,1,1,0.3)";
            this.ctx.lineWidth = 2;

            // Rectangle Border
            this.ctx.strokeRect(
                window.innerWidth / 2 - this.dimensions.width / 2,
                window.innerHeight / 2 - this.dimensions.height / 2,
                this.dimensions.width,
                this.dimensions.height);

            // Crossfade
            this.ctx.beginPath();
            this.ctx.moveTo(this.ctx.canvas.width / 2 - 5, this.ctx.canvas.height / 2);
            this.ctx.lineTo(this.ctx.canvas.width / 2 + 5, this.ctx.canvas.height / 2);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 - 5);
            this.ctx.lineTo(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 5);
            this.ctx.stroke();
        }
    }

    update () {
        this.move();
    }
}