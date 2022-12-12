<svelte:head>
    <script src="https://kit.fontawesome.com/79aef49974.js" crossorigin="anonymous"></script>
    <style src="../styles/main.scss"></style>
</svelte:head>

<slot><!-- optional fallback --></slot>
{#if getGameState === 0}
    <IntroductionScreen></IntroductionScreen>
{/if}

{#if getGameState === 1}
    <MainMenu></MainMenu>
{/if}

{#if getGameState === 2}
    <LoadingScreen></LoadingScreen>
{/if}

<NotificationOverlay></NotificationOverlay>

<script lang="ts">
	import { gameState } from "../store";
	import { get } from "svelte/store";
	import IntroductionScreen from "../components/loading/IntroductionScreen.svelte";
	import MainMenu from "../components/menus/MainMenu.svelte";
	import NotificationOverlay from "../components/notifications/NotificationOverlay.svelte";
	import LoadingScreen from "../components/loading/LoadingScreen.svelte";

    let getGameState = get(gameState);

    gameState.subscribe(value => {
        getGameState = value
    })
</script>