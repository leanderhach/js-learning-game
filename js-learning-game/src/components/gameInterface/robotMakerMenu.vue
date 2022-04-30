<template>
  <!-- Robot Maker Menu -->
  <div class="rmm">
    <div class="rmm__robots content-box" v-if="isOpen">
      <div
        v-for="(template, key) in robotTemplates"
        :key="key"
        class="clickable-card robot"
      >
        <h4 class="title">
          {{ template.name }}
        </h4>
        <img :class="[template.color, 'robot__image', 'icon', 'icon__lg']" src="/icons/robot.svg" alt="">
        <button class="button" @click="constructRobot(template.templateID)">Make Bot</button>
        <button class="button" @click="editRobot(template.templateID)">Edit Bot</button>
      </div>
    </div>
    <div class="rmm__add content-box content-box__flexible">
      <button class="clickable-card" @click="makeRobotTemplate">
        <img class="icon icon__lg" src="/icons/plus.svg">
      </button>
      <button class="clickable-card" @click="toggleViewRobots">
        <img class="icon icon__lg" src="/icons/robot.svg">
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import emitter from 'tiny-emitter/instance'

export default {
    name: 'RobotMakerMenu',
    components: {

    },
    setup(props) {
        const store = useStore();
        const robotTemplates = computed(() => store.state.robotTemplates);
        let isOpen = ref(false);

        const editRobot = (id) => {
            emitter.emit('editRobot', id);
        }

        const makeRobotTemplate = () => {
            emitter.emit('makeRobotTemplate');
        }

        const constructRobot = (id) => {
          store.commit('constructRobot', {id: id, window: window});
        }

        const toggleViewRobots = ()=> {
          isOpen.value = !isOpen.value
        }

        return {
            robotTemplates,
            editRobot,
            constructRobot,
            makeRobotTemplate,
            toggleViewRobots,
            isOpen
        }
    }
}
</script>

<style lang="scss">
    .rmm {
        display:flex;
        padding:20px 0;
        flex-direction: column;
        border-radius:15px;
        align-items:flex-start;
        pointer-events: all;

        &__robots {
            width:50vh;
            height:20vh;
            overflow-y:scroll;
            background-color: white;
            border-radius:15px;
            padding:20px;
            margin-bottom: 15px;
            display:flex;
            flex-direction: row;
            flex-wrap:wrap;
        }
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

    .robot {
      display:flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      width:fit-content;
      height:fit-content;

      .title {
        margin:0;
      }
    }

    .robot__image {
      &.--robot-gold {
        filter: invert(81%) sepia(52%) saturate(447%) hue-rotate(351deg) brightness(98%) contrast(88%);
      }
      &.--robot-blue {
        filter: invert(23%) sepia(69%) saturate(7426%) hue-rotate(240deg) brightness(100%) contrast(96%);
      }
      &.--robot-green {
        filter: invert(70%) sepia(56%) saturate(543%) hue-rotate(88deg) brightness(87%) contrast(98%);
      }
      &.--robot-orange {
        filter: invert(61%) sepia(86%) saturate(3582%) hue-rotate(330deg) brightness(99%) contrast(104%);
      }
      &.--robot-grey {
        filter: invert(50%) sepia(20%) saturate(280%) hue-rotate(179deg) brightness(92%) contrast(86%);
      }
      &.--robot-lime {
        filter: invert(80%) sepia(67%) saturate(335%) hue-rotate(73deg) brightness(101%) contrast(86%);
      }
    }
</style>