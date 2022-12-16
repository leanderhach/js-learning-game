<div bind:clientWidth={gameCanvasWidth} bind:clientHeight={gameCanvasHeight} id="game-canvas"></div>

<script lang="ts">
    import type * as PIXI from "pixi.js";
    import * as Pixi from "pixi.js";
	import { onMount } from "svelte";
	import Crayon from "../crayon";
	import { RenderStore } from "../store";

    let gameCanvasWidth: number;
    let gameCanvasHeight: number;

    let gameCanvas: PIXI.Application;


    // if(gameCanvas != null) {
    //     const basicText = new Pixi.Text('Basic text in pixi');
    //     basicText.x = 50;
    //     basicText.y = 50;
    //     basicText.style.fill = "black";

    //     gameCanvas.stage.addChild(basicText)
    // }


    onMount(() => {

        // instantiate Pixi
        gameCanvas = new Pixi.Application({
            width: gameCanvasWidth,
            height: gameCanvasHeight
        })

        // attach to dom element
        const view: any = gameCanvas.view
        document.querySelector("#game-canvas")?.appendChild(view);

        const renderer = new Crayon({
            canvas: gameCanvas,
        })
        
        RenderStore.set(renderer);
    })
    
</script>

<style lang="scss">
    #game-canvas {
        height: 100%;
    }
</style>