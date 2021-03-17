export default class GameObject {
    constructor(ctx, map) {
        this.ctx = ctx;

        this.map = map;

        this.position = {
            world: { x: 0, y: 0 },
            tileX: () => Math.floor(this.position.world.x / this.map.getTileW()),
            tileY: () => Math.floor(this.position.world.y / this.map.getTileW()),
            relX: () => this.offset.x + this.position.world.x - this.map.getCamera().getPosition().world.x,
            relY: () => this.offset.y + this.position.world.y - this.map.getCamera().getPosition().world.y,
        };

        this.dimensions = {
            width: 0,
            height: 0
        }

        this.direction = {
            x: 0,
            y: 0
        };

        this.offset = {
            x: 0,
            y: 0
        }
    }

    center () {
        this.offset.x = (this.ctx.canvas.width - this.ctx.canvas.width / 2) - this.dimensions.width / 2;
        this.offset.y = (this.ctx.canvas.height - this.ctx.canvas.height / 2) - this.dimensions.height / 2;
    }

    update () {
        this.center();
    }

    draw () { }

    //Getter/ Setter

    getPosition () {
        return this.position;
    }

    getDimensions () {
        return this.dimensions;
    }
}



