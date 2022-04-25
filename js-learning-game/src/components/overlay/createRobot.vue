<template>
  <div id="overlay-body">
    <h2 class="title">
      Create Robot
    </h2>
    <div class="form-input">
      <label
        for="robotName"
        class="label"
      >Name</label>
      <input
        id="robotName"
        v-model="robotName"
        type="text"
        class="input"
      >
    </div>
    <div class="form-input">
      <label
        for="robotName"
        class="label"
      >Color</label>
      <div class="color-grid">
        <div
          v-for="(color, key) in colors"
          :key="key" 
          :class="['color', {'is-active': key === colorKey}]" 
          :style="`background-color:var(${color}`"
          @click="setColor(color, key)"
        />
      </div>
    </div>
    <button
      class="button"
      @click="createRobot"
    >
      Create Robot
    </button>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import Robot from '../../assets/js/robots/Robot';
import emitter from 'tiny-emitter/instance';

export default {
    name: 'CreateRobot',
    setup(props) {
        const store = useStore();

        let robotName = ref('');
        let robotColor = ref('--robot-gold');

        let colorKey = ref(-1);

        const colors = [
            '--robot-gold', 
            '--robot-blue', 
            '--robot-green',
            '--robot-orange',
            '--robot-grey',
            '--robot-lime'
        ]

        const createRobot = () => {

            if(robotName.value.trim().length > 0) {
                let newRobot = new Robot(robotName.value, robotColor.value);
                store.commit('addRobot', newRobot);
                emitter.emit('editRobot', newRobot.id)
            }
        }

        const setColor = (color, key) => {
            robotColor.value = color;
            colorKey.value = key;
        }

        return {
            robotName,
            robotColor,
            colorKey,
            createRobot,
            setColor,
            colors
        }
    }
}
</script>

<style lang="scss">
    #overlay-body {
        color:var(--text-dark);
    }

    .color-grid{
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        width:200px;

        .color {
            cursor:pointer;
            box-sizing: border-box;
            margin: 10px;
            flex: 1 1 calc(30% - 20px);
            height: 46px;
            position:relative;

            &::after {
                position: absolute;
                top:50%;
                left:50%;
                transform:translate(-50%, -50%);
                height:10px;
                width:10px;
                border-radius:10px;
                background-color:black;
                content: '';
                display:none;
            }

            &.is-active::after{
                display:block;
            }
        }
    }
</style>