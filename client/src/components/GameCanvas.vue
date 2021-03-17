<template>
  <div id="game">      
      <canvas width="1024" height="1024"></canvas>
  </div>
</template>

<style scoped>
    #game {
        position: fixed;
        top: 0;

        margin: 0 auto;
        overflow: hidden;
    }

    canvas {
        border: 4px solid #1f1f1f;
        /* image-rendering: -moz-crisp-edges;
        image-rendering: -webkit-crisp-edges;
        image-rendering: pixelated;
        image-rendering: crisp-edges; */
        font-smooth: never !important;
        -webkit-font-smoothing : none;
    }
</style>

<script>
import Map from '../models/map'
import Input from '../models/input'
import FPS from '../models/fps'
import Player from '../models/player'

let ctx = null;
let map = null;
let fps = null;
let player = null;

export default {
    name: "GameCanvas",
    methods: {
        loop() {
            //ctx smoothing & always 100%
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
            ctx.imageSmoothingEnabled = false;
            
            if(!ctx) return;

            //clear
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            //draw map
            map.update();
            map.draw();

            //Ui of player
            player.getUIElement().focus(player);
            player.getUIElement().draw();
            player.getUIElement().update();

            //draw player
            player.draw();
            player.update();

            // Camera focus
            map.getCamera().draw();
            map.getCamera().update();

            // Testing the focus function
             if (!Input.keysPressed.space && !Input.keysPressed.gp_y) {
                 map.getCamera().focus(player);
            }

            // drawing coords
            ctx.fillStyle = "#eeffaa";
            ctx.font = '12pt VT323';
            ctx.fillText(`Player World Coords: ${player.getPosition().world.x} , ${player.getPosition().world.y}`, 5,40);
            ctx.fillText(`Player Tile Coords: ${player.getPosition().tileX()} , ${player.getPosition().tileY()}`, 5,60);
            ctx.fillText(`Player Rel Coords: ${player.getPosition().relX()} , ${player.getPosition().relY()}`, 5,80);
            ctx.fillText(`Cam World Coords: ${map.getCamera().getPosition().world.x} , ${map.getCamera().getPosition().world.y}`, 5, 100);
            ctx.fillText(`Cam Tile Coords: ${map.getCamera().getPosition().tileX()} , ${map.getCamera().getPosition().tileY()}`, 5,120);
            ctx.fillText(`Cam Rel Coords: ${map.getCamera().getPosition().relX()} , ${map.getCamera().getPosition().relY()}`, 5,140);
            
            // FPS
            fps.update();
            fps.draw();  

            // animation loop
            requestAnimationFrame(this.loop);
        }
    },
    mounted() {
        // set background
        document.querySelector(".background-wallpaper").style.backgroundImage = "url('https://i.pinimg.com/originals/fe/78/bb/fe78bbb25f35d56b502327fb6d43b309.png')";
    
        ctx = document.querySelector('canvas').getContext('2d');
        ctx.imageSmoothingEnabled = false;
    
        // init map
        map = new Map(ctx);
        //map.getCamera().placeAt(8, 10);

        // init player
        player = new Player(ctx, map);
        player.placeAt(15, 20);

        // init key controller
        Input.init();
        
        // init fps 
        fps = new FPS(ctx);

        // start game loop
        this.loop();
    }, 
}
</script>