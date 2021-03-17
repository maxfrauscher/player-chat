import GameObject from './gameObject';
import Input from './input';
import Projectile from './tests/projectile';
import UIElement from './uielement';
import Utils from './utils/utils';


export default class Player extends GameObject {
    constructor(ctx, map) {
        super(ctx, map);

        this.img = new Image();
        this.img.src = "https://i.imgur.com/4t3cExH.png";

        // ToDo: Map Position, Centered Relative Position

        this.sourceWidth = 48;
        this.sourceHeight = 48;

        this.dimensions = {
            width: this.sourceWidth * Utils.SCALE,
            height: this.sourceHeight * Utils.SCALE
        }

        // Animation -> Maybe in another ParentClass
        this.animationFrameIndex = 0;
        this.animationRow = 1;
        this.animationFrameMaxIndex = 16; // How length per row
        // Animation Ticks
        this.ticksPerFrame = 6; // How long to stay in an animationframe
        this.tickCount = 0; // 

        this.speed = 5;

        //ui
        this.ui = new UIElement(ctx, map);

        //projectiles
        this.projectiles = [];
    }


    animate () {
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.animationFrameIndex < this.animationFrameMaxIndex - 1) {
                this.animationFrameIndex += 1;
            } else {
                this.animationFrameIndex = 0;
            }
        }
    }

    //Just testing
    shoot () {
        if (Input.keysDown.mouse_left) {
            Input.keysDown.mouse_left = false;
            this.tickCount = 0;
            const proj = new Projectile(
                this.ctx,
                this,
                Input.mousePosition,
                this.map);
            this.projectiles.push(proj);

        }
    }

    moveY (value) {
        this.direction.y = value;
    }

    moveX (value) {
        this.direction.x = value;
    }

    move () {
        if (Input.keysDown.up) {
            this.moveY(-1);
        } else {
            this.moveY(0);
        }
        if (Input.keysDown.down) {
            this.moveY(1);
        }

        if (Input.keysDown.left) {
            this.moveX(-1);
        } else {
            this.moveX(0);
        }
        if (Input.keysDown.right) {
            this.moveX(1);
        }
    }

    updatePosition () {
        this.position.world.x += this.direction.x * this.speed;
        this.position.world.y += this.direction.y * this.speed;
    }

    // tile cords
    placeAt (x, y) {
        //place map to coords
        this.position.world.x = (x * this.map.getTileW()); //coords * tileW
        this.position.world.y = (y * this.map.getTileW());
    }

    setIdleDirection () {
        let degrees = Utils.angle(
            {
                x: (this.position.world.x + this.offset.x - this.map.getCamera().getPosition().world.x) + this.dimensions.width / 2,
                y: (this.position.world.y + this.offset.y - this.map.getCamera().getPosition().world.y) + this.dimensions.height / 2
            },
            Input.mousePosition
        );
        if (degrees > 180)
            this.animationRow = 1;
        else
            this.animationRow = 0;
    }

    update () {
        super.update();

        this.move();
        this.updatePosition();

        //Animation
        this.animate();
        this.setIdleDirection();

        //Projectiles
        this.shoot();
        this.projectiles.forEach(p => {
            p.update();
            p.draw();
        });
    }

    draw () {
        this.ctx.drawImage(
            this.img,
            // Source cutting the image
            this.sourceWidth * this.animationFrameIndex, // 0, 1, 2, 3
            this.sourceHeight * this.animationRow, // y
            this.sourceWidth,
            this.sourceHeight,
            // Destination
            this.position.relX(),
            this.position.relY(),
            this.dimensions.width,
            this.dimensions.height
        );
    }

    getUIElement () {
        return this.ui;
    }

}
