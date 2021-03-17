import Camera from './camera';
// import GameObject from './gameObject';
import Utils from './utils/utils';

class Map {

    constructor(ctx) {
        this.ctx = ctx;
        this.cam = new Camera(ctx, this);

        this.tileW = 24 * Utils.SCALE; //16, 32, 645
        this.tileH = this.tileW;

        this.offset = {
            x: 0, y: 0
        }

        this.img = new Image();
        this.img.src = "https://i.imgur.com/vFz6KQD.png";

        // tileset settings
        this.tilesetWide = 8;
        this.tilesetTileWidth = 24;
        this.tilesetTileHeight = 24;

        // tilemap settings
        this.mapW = 24; //Tilewide, wide of gamemap
        this.mapH = this.mapW;

        this.gameMap = [
            -1, -1, -1, 21, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 23,
            -1, -1, -1, 19, 43, 43, 43, 44, 43, 43, 43, 44, 43, 36, 26, 26, 26, 26, 26, 26, 36, 26, 26, 12,
            -1, -1, -1, 19, 43, 43, 43, 43, 45, 26, 38, 46, 36, 43, 26, 26, 26, 26, 26, 46, 41, 46, 26, 12,
            -1, -1, -1, 19, 43, 41, 43, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 42, 26, 26, 12,
            -1, -1, -1, 19, 43, 43, 43, 26, 26, 26, 26, 26, 26, 26, 36, 26, 26, 26, 26, 26, 26, 26, 26, 12,
            -1, -1, -1, 19, 43, 43, 43, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 12,
            -1, -1, -1, 19, 43, 43, 43, 26, 26, 26, 26, 36, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 36, 12,
            -1, -1, -1, 19, 43, 43, 43, 26, 26, 26, 45, 43, 26, 38, 26, 26, 47, 26, 26, 33, 34, 34, 34, 7,
            -1, -1, -1, 19, 43, 43, 43, 26, 47, 26, 42, 43, 26, 26, 26, 36, 26, 26, 26, 25, 0, 0, 0, 4,
            -1, -1, -1, 19, 43, 43, 43, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 12, -1, -1, -1, -1,
            -1, -1, -1, 19, 43, 43, 43, 26, 37, 45, 26, 26, 26, 26, 26, 26, 26, 45, 26, 12, -1, -1, -1, -1,
            -1, 21, 29, 27, 43, 43, 43, 26, 26, 26, 26, 26, 26, 26, 26, 45, 26, 26, 36, 12, -1, -1, -1, -1,
            -1, 19, 41, 36, 43, 43, 43, 26, 26, 26, 26, 26, 36, 45, 26, 26, 39, 33, 34, 7, -1, -1, -1, -1,
            -1, 19, 43, 43, 43, 26, 36, 26, 39, 26, 26, 26, 26, 26, 26, 45, 26, 25, 0, 4, -1, -1, -1, -1,
            -1, 19, 38, 26, 26, 37, 37, 26, 26, 45, 36, 26, 26, 38, 26, 26, 37, 35, 29, 29, 29, 23, -1, -1,
            -1, 19, 26, 26, 26, 33, 34, 34, 34, 32, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 12, -1, -1,
            -1, 19, 45, 26, 37, 25, 0, 0, 0, 24, 36, 26, 26, 26, 26, 26, 26, 45, 26, 26, 26, 12, -1, -1,
            -1, 19, 26, 26, 37, 16, 20, 20, 20, 17, 26, 36, 26, 26, 26, 37, 26, 26, 46, 26, 26, 12, -1, -1,
            -1, 19, 26, 26, 26, 38, 45, 37, 45, 26, 39, 26, 26, 26, 38, 26, 26, 26, 26, 26, 26, 12, -1, -1,
            -1, 19, 26, 36, 26, 26, 26, 42, 26, 36, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 12, -1, -1,
            -1, 19, 26, 26, 39, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 46, 41, 12, -1, -1,
            -1, 6, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 7, -1, -1,
            -1, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        ];
    }

    draw () {
        for (let y = 0; y < this.mapH; y++) {
            for (let x = 0; x < this.mapW; x++) {
                var val = this.gameMap[((y * this.mapW) + x)]; //val = tileset index in tilemap
                this.ctx.drawImage(
                    this.img,
                    // Source Position
                    (val % this.tilesetWide) * this.tilesetTileWidth, // x
                    (Math.floor(val / this.tilesetWide)) * this.tilesetTileHeight, // y
                    // Source Size
                    this.tilesetTileWidth,
                    this.tilesetTileHeight,
                    // Destination Position
                    this.offset.x + ((x * this.tileW) - this.cam.getPosition().world.x),
                    this.offset.y + ((y * this.tileH) - this.cam.getPosition().world.y),
                    // Destination Size
                    this.tileW,
                    this.tileH
                );
            }
        }
    }

    //overide center
    center () {
        this.offset.x = (this.ctx.canvas.width - this.ctx.canvas.width / 2);
        this.offset.y = (this.ctx.canvas.height - this.ctx.canvas.height / 2);
    }

    update () {
        this.center();
    }

    //GETTER/ SETTER
    getCamera () {
        return this.cam;
    }

    getTileW () {
        return this.tileW;
    }

    getOffsetX () {
        return this.offset.x;
    }

    getOffsetY () {
        return this.offset.y;
    }
}

export default Map;