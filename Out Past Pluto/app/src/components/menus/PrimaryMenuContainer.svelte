<div id="menu-container">
    {#if currentGameState === 1}
            <MainMenu></MainMenu>
        {:else if currentGameState === 4}
            <PauseMenu></PauseMenu>
    {/if}
    <MenuManager></MenuManager>
</div>


<script lang="ts">
	import { gameState } from "../../store";
	import { get } from "svelte/store";
	import MainMenu from "./MainMenu.svelte";
	import PauseMenu from "./PauseMenu.svelte";

    let currentGameState: number = 0;

    gameState.subscribe(value => {
        currentGameState = value
    })
</script>

<style lang="scss">
#menu-container {
    position: absolute;
    height: 100%;
    width:100%;
    top: 0;
    left: 0;
    font-family: 'Inter', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    pointer-events: none;
}
</style>