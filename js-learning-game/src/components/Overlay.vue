<template>
  <div
    id="overlay-container"
    :class="[{'is-active': isActive}]"
    @click.self="toggleOverlay"
  >
    <CreateRobot
      v-if="activeView === 'createRobot'"
      class="overlay-content"
    />
    <EditRobot
      v-if="activeView === 'editRobot'"
      class="overlay-content"
      :id="activeID"
    />
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import emitter from 'tiny-emitter/instance';
import CreateRobot from './overlay/createRobot.vue';
import EditRobot from './overlay/editRobot.vue';

export default {
    name: 'Overlay',
    components: {
        CreateRobot,
        EditRobot
    },
    setup(props) {
        let isActive = ref(false);
        let activeView = ref('createRobot');

        let activeID = ref(null);

        const toggleOverlay = () => {
            isActive.value = !isActive.value
        }

        emitter.on('editRobot', (id) => {
            activeView.value = 'editRobot';
            activeID.value = id;
            toggleOverlay();

        })

        emitter.on('makeRobotTemplate', () => {
            activeView.value = 'createRobot',
            toggleOverlay();
        })

        emitter.on('closeOverlay', () => {
            toggleOverlay();
        })


        return {
            toggleOverlay,
            isActive,
            activeView,
            activeID,
        }
    }
}
</script>

<style lang="scss">
    #overlay-container {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 12;
        pointer-events: none;
        background-color: rgba(16,23,31,0);
        display:flex;
        justify-content: center;
        align-items: center;

        .overlay-content{
            pointer-events: all;
            margin-top:-1000%;
            background-color:white;
            padding:30px 20px;
            border-radius:15px;
            box-sizing: border-box;
        }

        &.is-active {
            background-color: rgba(16,23,31,0.8);
            pointer-events: all;

            .overlay-content {
                margin-top:0;
            }
        }
    }
</style>