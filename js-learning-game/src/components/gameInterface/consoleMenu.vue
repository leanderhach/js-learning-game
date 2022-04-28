<template>
  <!-- Robot Maker Menu -->
  <div class="cm">
    <div class="cm__messages content-box" v-if="isOpen">
        <div class="messages__header">
            <button class="button" @click="clearConsole">Clear</button>
        </div>
        <div class="messages__body">
            <div v-for="(message, key) in consoleMessages" :key="key" :class="['console-message', message.body.level]">
                <div class="console-message__heading">
                    <img class="icon log-icon" src="/icons/circle-info.svg">
                    <img class="icon warn-icon" src="/icons/triangle-exclamation.svg">
                    <img class="icon danger-icon" src="/icons/triangle-exclamation.svg">
                    <p>{{ message.body.heading }}</p>
                </div>
                <p class="console-message__body">{{message.body.message}}</p>
            </div>
        </div>
    </div>
    <div class="cm__toggle content-box content-box__flexible">
      <div class="clickable-card" @click="toggleOpen">
        <span v-if="alertCount > 0" class="alert-count">{{ alertCountFormatted }}</span>
        <img class="icon icon__lg" src="/icons/rectangle-terminal.svg">
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';
import emitter from 'tiny-emitter/instance'

export default {
    name: 'RobotMakerMenu',
    setup(props) {
        const store = useStore();
        const consoleMessages = computed(() => { return store.state.consoleMessages});
        const isOpen = ref(false);
        let alertCount = ref(0);

        const removeMessage = (id) => {
            store.commit('removeMessageFromConsole', id);
        }

        const clearConsole = () => {
            store.commit('clearMessageConsole');
        }

        // watch for new alerts
        watch(store.state.consoleMessages, (old, next) => {
            if (!isOpen.value) {
                alertCount.value += 1;
            };
        })

        const toggleOpen = () => {
            isOpen.value = !isOpen.value;
            alertCount.value = 0;
        }

        const alertCountFormatted = computed(() => {
            return alertCount.value <= 50 ? alertCount : `50`
        })

        return {
            consoleMessages,
            removeMessage,
            clearConsole,
            alertCount,
            isOpen,
            toggleOpen,
            alertCountFormatted
        }
    }
}
</script>

<style lang="scss">
    .cm {
        display:flex;
        padding:20px 0;
        flex-direction: column;
        border-radius:15px;
        align-items:flex-end;
        pointer-events: all;

        &__messages {
            width:50vh;
            background-color: #2f3640 !important;
            border-radius:15px;
            padding:20px;
            margin-bottom:15px;
        }
    }

    .console-message {
        text-align:left;
        display:flex;
        flex-direction: column;
        border-top: 1px solid var(--text-dark);
        padding:15px;

        &__heading {
            display:flex;
            flex-direction: row;
            margin-bottom:5px;
        }

        P {
            margin:0;
            white-space: normal;
            overflow-wrap: break-word;
        }

        .icon {
            display: none;
        }

        &.log {
            color: #686de0;

            & .log-icon {
                display: block;
                filter: invert(42%) sepia(93%) saturate(434%) hue-rotate(200deg) brightness(91%) contrast(93%);
                margin-right:5px;
            }
        }
        &.warn {
            color: #f8c291;

            &.warn-icon {
                display: block;
                filter: invert(96%) sepia(90%) saturate(7445%) hue-rotate(300deg) brightness(108%) contrast(95%);
                margin-right:5px;
            }
        }
        &.danger {
            color: #eb4d4b;

            & .danger-icon {
                display: block;
                filter: invert(40%) sepia(13%) saturate(6194%) hue-rotate(329deg) brightness(99%) contrast(87%);
                margin-right:5px;
            }
        }
    }

    .messages  {
        &__header {
            display:flex;
        }

        &__body {
            height:20vh;
            overflow-y:scroll;
        }
    }

    .alert-count {
        position:absolute;
        height:0.8rem;
        width:0.8rem;
        right:0.2rem;
        top:0.2rem;
        background:var(--red);
        border-radius:50%;
        padding:5px;
        color:white;
        font-family: 'CanadaRadio', sans-serif;
        font-weight: 600;
        font-size:0.8rem;
    }

    .content-box__flexible {
        padding:0 !important;
        display:flex;
    }

    .icon{
        height:1rem;
        width:1rem;
        padding:0.1rem;

        &__lg {
            height:2rem;
            width:2rem;
        }
    }
</style>