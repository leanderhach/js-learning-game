<div id="loading-screen">
    <GameLogo></GameLogo>
    <LoadingSpinner></LoadingSpinner>
</div>

<script>
	import GameLogo from "../generics/GameLogo.svelte";
    import LoadingSpinner from "../generics/LoadingSpinner.svelte";
</script>

<style lang="scss">
    #loading-screen {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--primary-background-color);
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
</style>