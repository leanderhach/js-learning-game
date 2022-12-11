<button 
    class="button" 
    class:text-only={style === "textonly"} 
    class:text-underlined={style === "textunderlined"} 
    class:disabled={disabled} class:loading={isLoading}
    on:click={() => handleClick()}
>
    <span>{text}</span>
    <div class="button-flair"></div>

    {#if isLoading}
        <div class="button__loading-container">
            <LoadingSpinner></LoadingSpinner>
        </div>
    {/if}
</button>

<script lang="ts">
	import { playOneShot } from "../../utils/audio";
	import LoadingSpinner from "./LoadingSpinner.svelte";

    export let text: string;
    export let onclick: Function;
    export let disabled = false;
    export let isLoading = false;
    export let style = "default";

    function handleClick() {
        if(!disabled) {
            // play button click audio
            playOneShot("/audio/button-click.mp3")

            // run user defined button action function
            onclick(); 
        }
    }
</script>

<style lang="scss">
    .button:not(.text-only):not(.text-underlined) {
        margin-top: 5em;
        background-color: transparent;
        border: 1px solid var(--brand-purple);
        color: var(--primary-text-color);
        padding:1em 2em;
        font-family: "Inter";
        position: relative;
        opacity: 0.5;
        transition: opacity .33s ease;

        .button__loading-container {
            position:absolute;
            height:100%;
            width: 100%;
            background: var(--primary-background-color);
            top:0;
            left:0;
            z-index:2;
            display:flex;
            align-items: center;
            justify-content: center;
        }

        &:not(.disabled) {
            cursor: pointer;
            opacity: 1;
        }

        span {
            position: relative;
            z-index: 1;
        }

        &::before {
            position: absolute;
            top: 0;
            left: 0;
            content: "";
            width: 0;
            height: 100%;
            background-color: var(--brand-purple);
            transition: width .33s ease;
        }

        .button-flair {
            position: absolute;
            top:-1px;
            left:-1px;
            height:1em;
            width:1em;

            &::after, &::before {
                content: "";
                position: absolute;
                background-color: var(--brand-purple);
                left: 0;
            }

            &::after {
                width:1px;
                height: 100%;
                top:-50%;
                border-bottom: 15px solid var(--primary-background-color);
                transition: top .33s ease;
            }

            &::before {
                left: -50%;
                width:100%;
                height: 1px;
                transition: left .33s ease;
                border-right: 15px solid var(--primary-background-color);
            }
        }

        &:hover:not(.disabled):not(.loading) {
            &::before {
                width: 100%;
            }

            .button-flair {
                &::after {
                    border-bottom: 0;
                    top: 0;
                }

                &::before {
                    border-right: 0;
                    left: 0;
                }
            }
        }
    }

    .button {
        &.text-only {
            background-color: transparent;
            color: var(--primary-text-color);
            border: none;
            outline:none;
            cursor:pointer;
            transition: color .33s ease;

            &:focus, &:hover, &:active {
                outline: none;
                color: var(--brand-purple);
            }
        }

        &.text-underlined {
            background-color: transparent;
            color: var(--primary-text-color);
            border: none;
            outline:none;
            cursor:pointer;
            transition: color .33s ease;
            padding-bottom: 0.2em;
            border-bottom: 1px solid var(--brand-purple);
            position: relative;

            &::after {
                content: "";
                position: absolute;
                height: 1px;
                width: 10px;
                background-color: var(--primary-background-color);
                bottom: -1px;
                left: 10%;
                transition: left .33s ease;
            }

            &:focus, &:hover, &:active {
                outline: none;
                color: var(--brand-purple);

                &:after {
                    left: 70%;
                }
            }
        }
    }
</style>