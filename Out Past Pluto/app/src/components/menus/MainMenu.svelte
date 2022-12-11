<div id="main-menu">
    <div id="main-menu__content">
        <GameLogo></GameLogo>
        <DefaultButton text={"New Game"} onclick={()=> console.log('hi')}></DefaultButton>
        <DefaultButton text={"Continue"} onclick={()=> console.log('hi')}></DefaultButton>
        <DefaultButton text={"Settings"} onclick={()=> console.log('hi')}></DefaultButton>
        <DefaultButton text={"Credits"} onclick={()=> console.log('hi')}></DefaultButton>
    </div>
</div>

<script lang="ts">
	import DefaultButton from "../generics/DefaultButton.svelte";
	import GameLogo from "../generics/GameLogo.svelte";
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
        }
    }
</style>