<div id="main-menu" class="fitted-menu">
        <GameLogo></GameLogo>
        <div class="spacer mt-2"></div>
        <DefaultButton text={"New Game"} on:click={()=> startNewGame()}></DefaultButton>
        <DefaultButton text={"Continue"} on:click={()=> loadGame()}></DefaultButton>
        <DefaultButton text={"Settings"} on:click={()=> openSettings()}></DefaultButton>
        <DefaultButton text={"Credits"} on:click={()=> openCredits()}></DefaultButton>
</div>
<div class="client-check" bind:clientHeight={clientHeight} bind:clientWidth={clientWidth}></div>

<script lang="ts">
	import { gameState, RenderStore } from "../../store";
	import DefaultButton from "../generics/DefaultButton.svelte";
	import GameLogo from "../generics/GameLogo.svelte";
	import { get } from "svelte/store";
	import { Asteroid } from "../../classes/Asteroid";
	import { getRandomInRange } from "../../utils/generators";
	import { initializeGame } from "../../gameManager";

    let isSettingsOpen = false;
    let isCreditsOpen = false;

    let clientHeight: number;
    let clientWidth: number;

    function doSetTimeout(movingAsteroid: any) {
        setTimeout(function() {
            movingAsteroid.position.x += 5;
            movingAsteroid.position.y += 5;
            get(RenderStore).drawOnce(movingAsteroid);
        }, 200);
    }

    function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function startNewGame() {
        gameState.set(3);
        initializeGame({x: clientWidth, y: clientHeight});
    }

    function loadGame() {
        console.log("loading game")
    }

    function openSettings() {

    }

    function openCredits() {

    }
</script>

<style lang="scss">
    .client-check {
        position: absolute;
        width:100%;
        height:100%;
    }
</style>