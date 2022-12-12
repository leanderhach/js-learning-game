<div id="notification-overlay">
    {#if popupNotification}
        <div class="popup-notification">
            <h1>{popupNotification.title}</h1>
            <p>{popupNotification.message}</p>

            <div class="button-group">
                {#each popupNotification.buttons as button}
                    <DefaultButton text={button.text} on:click={() => typeof button.action === "string" ? closePopup() : runAction(button.action)}></DefaultButton>
                {/each}
            </div>
        </div>
    {/if}

    {#if pushNotifications}
    {/if}
</div>


<script lang="ts">
	import { push, popup } from "../../utils/notification";
    import type { PopupNotification, PushNotification } from "../../types/notifications";
	import DefaultButton from "../generics/DefaultButton.svelte";

    let popupNotification: PopupNotification | null;
    let pushNotifications: PushNotification[] | null;

    push.subscribe((value: (PushNotification[] | null)) => {
        pushNotifications = value;
    })

    popup.subscribe((value: (PopupNotification | null)) => {
        popupNotification = value;
    })

    function closePopup() {
        popup.set(null);
    }

    async function runAction(action: Function) {
        await action();
        closePopup();
    }
</script>


<style lang="scss">
    #notification-overlay {
        position: absolute;
        top:0;
        left: 0;
        width:100%;
        height: 100%;
        pointer-events: none;
        z-index:100;
        display:flex;
        justify-content: center;
        align-items: center;
        font-family: var(--primary-font-family);
    }

    .popup-notification {
        background-color: var(--primary-background-color);
        color: var(--primary-text-color);
        padding: 2em 4em;
        width: 50%;
        border: 1px solid var(--brand-purple);
        position: relative;
        pointer-events: all;

        &::after, &::before {
            content: "";
            position: absolute;
            background-color: var(--brand-purple);
            left: 0;
        }

        &::after {
            width: 1px;
            height: 2em;
            top: -1em;
            left: -1px;
            border-bottom: 15px solid var(--primary-background-color);
            transition: top .33s ease;
        }

        &::before {
            left: -1em;
            top: -1px;
            width:2em;
            height: 1px;
            transition: left .33s ease;
            border-right: 15px solid var(--primary-background-color);
        }

        h1 {
            font-weight: 200;
        }
    }
</style>