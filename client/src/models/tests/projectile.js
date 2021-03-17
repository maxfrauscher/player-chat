import GameObject from "../gameObject";

export default class Projectile extends GameObject {
    constructor(ctx, player, mousePosition, map) {
        super(ctx, map);

        this.img = new Image();
        this.img.src = "https://i.imgur.com/PSruWi7.png"

        this.sourceWidth = 24;
        this.sourceHeight = 24;

        this.dimensions = {
            width: 30,
            height: 30,
        };

        this.speed = 0;
        this.maxSpeed = 10;
        this.acc = 0.1;

        super.center();
        this.player = player;

        this.position.world.x = this.player.getPosition().world.x;
        this.position.world.y = this.player.getPosition().world.y;

        this.deltaX = mousePosition.x - (this.position.relX() + this.dimensions.width / 2);
        this.deltaY = mousePosition.y - (this.position.relY() + this.dimensions.height / 2);
    }


    update () {
        super.update();

        // Acceleration
        this.speed += (this.maxSpeed - this.speed) * this.acc;

        var magnitude = Math.sqrt(this.deltaX * this.deltaX + this.deltaY * this.deltaY);
        var velocityScale = this.speed / magnitude;

        this.velocityInstanceX = this.deltaX * velocityScale;
        this.velocityInstanceY = this.deltaY * velocityScale;


        this.position.world.x += this.velocityInstanceX;
        this.position.world.y += this.velocityInstanceY;
    }

    draw () {
        this.ctx.drawImage(
            this.img,
            0,
            0,
            this.sourceWidth,
            this.sourceHeight,
            this.position.relX(), // x
            this.position.relY(), // y
            this.dimensions.width,//width
            this.dimensions.height//height
        );

        // this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    }
}