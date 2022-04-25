<template>
  <!-- Robot Maker Menu -->
  <div class="rmm content-box">
    <div class="rmm__robots">
      <div
        v-for="(template, key) in robotTemplates"
        :key="key"
        class="clickable-card"
      >
        <h4 class="title">
          {{ template.name }}
        </h4>
        <p class="text">
          {{ template.id }}
        </p>

        <button class="button" @click="constructRobot(template.id)">Make Bot</button>
        <button class="button" @click="editRobot(template.id)">Edit Bot</button>
      </div>
    </div>
    <div class="rmm__add">
      <div class="clickable-card" @click="makeRobotTemplate">
        <font-awesome-icon
          icon="plus"
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
        const robotTemplates = computed(() => store.state.robotTemplates);

        const editRobot = (id) => {
            emitter.emit('editRobot', id);
        }

        const makeRobotTemplate = () => {
            emitter.emit('makeRobotTemplate');
        }

        const constructRobot = (id) => {
          emitter.emit('constructRobot', id);
        }

        return {
            robotTemplates,
            editRobot,
            constructRobot,
            makeRobotTemplate
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