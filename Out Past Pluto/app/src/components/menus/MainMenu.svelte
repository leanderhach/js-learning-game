<div id="main-menu" bind:clientHeight={clientHeight} bind:clientWidth={clientWidth}>
    <div id="main-menu__content">
        <GameLogo></GameLogo>
        <DefaultButton text={"New Game"} on:click={()=> startNewGame()}></DefaultButton>
        <DefaultButton text={"Continue"} on:click={()=> loadGame()}></DefaultButton>
        <DefaultButton text={"Settings"} on:click={()=> openSettings()}></DefaultButton>
        <DefaultButton text={"Credits"} on:click={()=> openCredits()}></DefaultButton>
    </div>

    {#if isSettingsOpen}
        <SettingsMenu></SettingsMenu>
    {/if}
</div>

<script lang="ts">
	import { gameState } from "../../store";
	import DefaultButton from "../generics/DefaultButton.svelte";
	import GameLogo from "../generics/GameLogo.svelte";
	import SettingsMenu from "./SettingsMenu.svelte";
    import CreditsMenu from "./CreditsMenu.svelte";
	import { asteroidFields, initializeGame } from "../../gameManager";
	import { get } from "svelte/store";

    let isSettingsOpen = false;
    let isCreditsOpen = false;

    let clientHeight: number;
    let clientWidth: number;

    function startNewGame() {
        gameState.set(2);
        initializeGame({x: clientWidth, y: clientHeight});
        gameState.set(3);

        console.log(get(asteroidFields))
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
        #main-menu {
        position: absolute;
        height: 100%;
        width:100%;
        background-color: #000000;
        top: 0;
        left: 0;
        font-family: 'Inter', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        &__content {
            display:flex;
            flex-direction: column;

            * {
                margin-top: 2em;
            }
        }
    }
</style>