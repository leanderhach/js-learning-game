<button class="button" class:disabled={disabled} on:click={() => handleClick()}>
    <span>
        {text}
    </span>
    <div class="button-flair"></div>
</button>

<script lang="ts">
	import { playOneShot } from "../../utils/audio";

    export let text: string;
    export let onclick: Function;
    export let disabled = false;

    function handleClick() {
        // play button click audio
        playOneShot("/audio/button-click.mp3")

        // run user defined button action function
        onclick();
    }
</script>

<style lang="scss">
    .button {
        margin-top: 5em;
        background-color: transparent;
        border: 1px solid var(--brand-purple);
        color: var(--primary-text-color);
        padding:1em 2em;
        font-family: "Inter";
        cursor: pointer;
        position: relative;

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

        &:hover {
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
</style>