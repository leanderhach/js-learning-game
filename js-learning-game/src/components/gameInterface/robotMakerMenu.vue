<template>
  <!-- Robot Maker Menu -->
  <div class="rmm content-box">
    <div class="rmm__robots">
      <div
        v-for="(robot, key) in robots"
        :key="key"
        class="clickable-card"
        @click="editRobot(robot.id)"
      >
        <h4 class="title">
          {{ robot.name }}
        </h4>
        <p class="text">
          {{ robot.id }}
        </p>
      </div>
    </div>
    <div class="rmm__add">
      <div class="clickable-card">
        <font-awesome-icon
          icon="plus"
          @click="createRobot"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import emitter from 'tiny-emitter/instance'
export default {
    name: 'RobotMakerMenu',
    components: {

    },
    setup(props) {
        const store = useStore();
        const robots = computed(() => store.state.robots);

        const editRobot = (id) => {
            emitter.emit('editRobot', id);
        }

        const createRobot = () => {
            emitter.emit('createRobot');
        }

        return {
            robots,
            editRobot,
            createRobot
        }
    }
}
</script>

<style lang="scss">
    .rmm {
        background-color: white;
        box-shadow: 10px 10px 5px 0px rgba(16,23,31,0.74);
        color: var(--text-dark);
        max-width:300px;
        display:flex;
        padding:20px 0;
        flex-direction: column;
        border-radius:15px;
        align-items:center;
        pointer-events: all;

        &__robots {
            flex-grow:3;
            overflow:scroll;
            display:flex;
            flex-direction: column;
            align-items:center;
        }

        &__add {
            flex-grow:1;
            font-size:2rem;
        }
    }
</style>