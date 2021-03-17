import Utils from "./utils/utils";

export default class Input {
    static mousePosition = {
        x: 0,
        y: 0,
    }

    static keysDown = {
        "up": false,
        "down": false,
        "left": false,
        "right": false,

        //Arrows
        "arrow_up": false,
        "arrow_down": false,
        "arrow_left": false,
        "arrow_right": false,

        "mouse_left": false,
    }

    static keysPressed = {
        "space": false,
    }

    static init () {
        window.addEventListener("mousemove", function (e) {
            Input.mousePosition.x = e.pageX;
            Input.mousePosition.y = e.pageY;
        });

        window.addEventListener("mousedown", function () {
            Input.keysDown.mouse_left = true;
        });

        window.addEventListener("mouseup", function () {
            Input.keysDown.mouse_left = false;
        });

        document.onkeypress = function (e) {
            e = e || window.event;
            switch (e.key) {
                case " ":
                    Input.keysPressed.space = !Input.keysPressed.space;
                    break;
                case "+":
                    Utils.SCALE += 1;
                    console.log("test");
                    break;
                default:
                    // console.log(e);
                    break;
            }
        }

        document.onkeydown = function (e) {
            e = e || window.event;
            switch (e.key) {
                case "a":
                    Input.keysDown.left = true;
                    break;
                case "d":
                    Input.keysDown.right = true;
                    break;
                case "w":
                    Input.keysDown.up = true;
                    break;
                case "s":
                    Input.keysDown.down = true;
                    break;
                case "ArrowLeft":
                    Input.keysDown.arrow_left = true;
                    break;
                case "ArrowRight":
                    Input.keysDown.arrow_right = true;
                    break;
                case "ArrowUp":
                    Input.keysDown.arrow_up = true;
                    break;
                case "ArrowDown":
                    Input.keysDown.arrow_down = true;
                    break;
                default:
                    console.log(e.key);
                    break;
            }
        };

        document.onkeyup = function (e) {
            e = e || window.event;
            switch (e.key) {
                case "a":
                    Input.keysDown.left = false;
                    break;
                case "d":
                    Input.keysDown.right = false;
                    break;
                case "w":
                    Input.keysDown.up = false;
                    break;
                case "s":
                    Input.keysDown.down = false;
                    break;
                case "ArrowLeft":
                    Input.keysDown.arrow_left = false;
                    break;
                case "ArrowRight":
                    Input.keysDown.arrow_right = false;
                    break;
                case "ArrowUp":
                    Input.keysDown.arrow_up = false;
                    break;
                case "ArrowDown":
                    Input.keysDown.arrow_down = false;
                    break;
                default:
                    break;
            }
        };
    }
}

