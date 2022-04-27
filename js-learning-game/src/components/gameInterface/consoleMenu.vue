<template>
  <!-- Robot Maker Menu -->
  <div class="cm">
    <div class="cm__messages content-box" v-if="isOpen">
        <div class="messages__header">
            <button class="button" @click="clearConsole">Clear</button>
        </div>
        <div class="messages__body">
            <div v-for="(message, key) in consoleMessages" :key="key" :class="['console-message', message.body.level]">
                <span class="console-message__heading">
                    <img class="icon log-icon" src="/icons/circle-info.svg">
                    <img class="icon danger-icon" src="/icons/triangle-exclamation.svg">
                    <img class="icon error-icon" src="/icons/circle-exclamation.svg">
                    {{ message.body.heading }}
                </span>
                <span class="console-message__body">{"x": "stuff", "id": "bb589424-5d4c-428e-b701-4d0c09617bad"} </span>
            </div>
        </div>
    </div>
    <div class="cm__toggle content-box content-box__flexible">
      <div class="clickable-card" @click="toggleOpen">
        <span v-if="alertCount > 0" class="alert-count">{{ (alertCount <= 50) ? alertCount : `${alterCount}+` }}</span>
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

        return {
            consoleMessages,
            removeMessage,
            clearConsole,
            alertCount,
            isOpen,
            toggleOpen
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
        padding:0.5rem 0;

        .icon {
            display: none;
        }

        &.log {
            color: #f8c291;

            & .log-icon {
                display: block;
                filter: invert(96%) sepia(90%) saturate(7445%) hue-rotate(300deg) brightness(108%) contrast(95%);
                margin-right:5px;
            }
        }
    }

    .messages  {
        &__heading {
            display:flex;
        }

        &__body {
            height:20vh;
            overflow:scroll;
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

        &__lg {
            height:2rem;
            width:2rem;
        }
    }
</style>