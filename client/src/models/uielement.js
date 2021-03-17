import GameObject from './gameObject';
import Input from './input';
import Utils from './utils/utils';

export default class UIElement extends GameObject {
    constructor(ctx, map) {
        super(ctx);

        this.img = new Image();
        // this.img.src = "https://i.imgur.com/fCJCCRJ.png";
        this.img.src = "https://i.imgur.com/VCAbCQo.png";

        this.map = map

        // rescale the img
        this.scale = 5;

        this.sourceWidth = 21;
        this.sourceHeight = 21;

        this.dimensions = { width: this.sourceWidth, height: this.sourceHeight }
        this.dimensions.width *= this.scale;
        this.dimensions.height *= this.scale;
    }

    // @override center
    center () {
        super.center();
        this.offset.y += 40;
    }

    focus (gameObject) {
        this.position.world.x = gameObject.getPosition().world.x;
        this.position.world.y = gameObject.getPosition().world.y;
    }

    update () {
        super.update();
    }

    draw () {
        //degree calc can be used more often
        let degrees = Utils.angle(
            {
                x: (this.position.world.x + this.offset.x - this.map.getCamera().getPosition().world.x) + this.dimensions.width / 2,
                y: (this.position.world.y + this.offset.y - this.map.getCamera().getPosition().world.y) + this.dimensions.height / 2
            },
            Input.mousePosition
        );
        // set new center point
        degrees += 180;

        const shapeCenterX = (this.position.world.x + this.offset.x - this.map.getCamera().getPosition().world.x) + this.dimensions.width / 2;
        const shapeCenterY = (this.position.world.y + this.offset.y - this.map.getCamera().getPosition().world.y) + this.dimensions.height / 2;

        this.ctx.translate(shapeCenterX, shapeCenterY);
        this.ctx.rotate(degrees * Math.PI / 180);
        this.ctx.translate(-shapeCenterX, -shapeCenterY);

        this.ctx.drawImage(
            this.img,
            // Source cutting the image
            0, // x
            0, // y
            this.sourceWidth,
            this.sourceHeight,
            // Destination
            (this.position.world.x + this.offset.x - this.map.getCamera().getPosition().world.x),
            (this.position.world.y + this.offset.y - this.map.getCamera().getPosition().world.y),
            this.dimensions.width,
            this.dimensions.height
        );

        this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    }
}
