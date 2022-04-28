<template>
    <div class="state-button">
        <button class="button button--state" @click.prevent="toggleButton">{{ text }}</button>
        <div class="state-button__overlay" v-if="isActive">
            <img class="icon" src="/icons/check.svg" alt="">
        </div>
    </div>
</template>

<script>
import { ref, defineEmits } from 'vue';
export default {
    name: 'StateButton',
    props: {
        text: {
            type: String,
            default: '',
        },
    },
    emits: ['clicked'],
    setup(props, context) {

        let isActive = ref(false);

        const toggleButton = () => {
            isActive.value = true;
            context.emit('clicked');

            setTimeout(() => {
                isActive.value = false
            }, 1000)
        }

        return {
            isActive,
            toggleButton
        }
    }
}
</script>

<style lang="scss">
    .state-button {
        position:relative;
        height:fit-content;
        width:fit-content;

        &__overlay {
            position:absolute;
            top:0;
            left:0;
            width:calc(100% - 10px);
            height:calc(100% - 10px);
            pointer-events: none;
            display:flex;
            justify-content: center;
            align-items: center;
            margin:5px;
            background-color:var(--green);

            img {
                filter: invert(99%) sepia(100%) saturate(2%) hue-rotate(352deg) brightness(108%) contrast(101%);
            }
        }
    }
</style>