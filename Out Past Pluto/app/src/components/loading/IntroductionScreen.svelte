<div id="loading-screen">
    <GameLogo animated={true}></GameLogo>
    <div class="start-button">
        <FormGroup type={"text"} label="Enter Username" hint={"This will be used to save your games"}></FormGroup>   
        <DefaultButton text={"Let's Go"} onclick={startGame}></DefaultButton>
    </div>
</div>

<script lang="ts">
    import DefaultButton from "../generics/DefaultButton.svelte";
	import FormGroup from "../generics/FormGroup.svelte";
	import GameLogo from "../generics/GameLogo.svelte";

    function startGame() {
        console.log("started game!")
        // gameState.set(1);
    }

</script>


<style lang="scss">
    #loading-screen {
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
    }

    .start-button {
        opacity: 0;
        animation: 3s 5s loadingScreenOpacity forwards;
    }

    @keyframes loadingScreenOpacity {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>