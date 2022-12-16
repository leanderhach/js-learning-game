<div id="pause-menu" class="fitted-menu outlined">
        <DefaultButton text={"Continue"} on:click={() => setPlaying()}></DefaultButton>
</div>

<script>
	import { gameState } from "../../store";
	import { get } from "svelte/store";
	import DefaultButton from "../generics/DefaultButton.svelte";

    function setPlaying() {
        gameState.set(3);
    }
</script>

<style lang="scss">
</style>