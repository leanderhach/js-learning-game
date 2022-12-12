<div class="form-group">
    <input use:typeAction id={id} bind:value={value}>
    <div class="form-group-flair"></div>
    <label for={id}>{label}</label>
    <span class="form-group__hint">{hint}</span>
    {#if formError && formError.hasError}
        <span class="form-group__error">{formError.errorText}</span>
    {/if}
</div>

<script lang="ts">
	import type { FormError } from "../../types/forms";


    export let label: string;
    export let hint = "";
    export let id: string;
    export let value: string;
    export let formError: FormError | null = null;
    export let type: string = "text";

    function typeAction(node: any) {
        node.type = type;
    }
    
</script>

<style lang="scss">
    .form-group {
        position: relative;
        width:max-content;
        display:flex;
        flex-direction: column;
        color: var(--primary-text-color);

        &__hint {
            margin-top: 1em;
            order: 3;
            font-size: 0.85em;
            opacity: 0.8;
            font-weight: 300;
        }

        &__error {
            order: 4;
            margin-top: 1em;
            font-size: 0.85em;
            font-weight: 300;
            color: #e74c3c;
        }
    }

    .form-group-flair {
        order:1;
        position: absolute;
        height: 3.3em;
        top: 2.2em;
        width:100%;
        pointer-events: none;
        z-index:3;

        &::before, &::after {
            background-color: var(--primary-background-color);
            height: 1px;
            position: absolute;
            content: "";
            width: 15px;
            transition: left .33s ease;
        }

        &::before {
            top: 0;
            left: 10%;
        }

        &::after {
            bottom: 0;
            left: 90%;
        }
    }

    input {
        order: 2;
        background-color: var(--primary-background-color);
        border: 1px solid var(--brand-purple);
        color: var(--primary-text-color);
        padding:1em 2em;
        font-size: 1em;
        font-family: var(--primary-font-family);
        position: relative;

        &:focus {
            outline: none;

            + .form-group-flair {
                &::before {
                    top: 0;
                    left: 90%;
                }

                &::after {
                    bottom: 0;
                    left: 10%;
                }
            }
        }
    }

    label {
        order: 0;
        margin-bottom: 1em;
        font-weight: 200;
    }
</style>