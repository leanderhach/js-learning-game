<template>
  <!-- Progress Menu -->
  <div class="pm">
    <div class="content-box">
      <h4 class="title">
        Progress
      </h4>
      <div class="pm__bars">
        <div class="progress-bar__container" v-for="(requirement, key) of levelRequirements" :key="key">
          <div class="progress-bar__title">
            <img v-if="requirement.type === 'iron'" class="icon" src="/sprites/resources/iron.png" alt="">
            <img v-if="requirement.type === 'cobalt'" class="icon" src="/sprites/resources/cobalt.png" alt="">
            <img v-if="requirement.type === 'silicon'" class="icon" src="/sprites/resources/silicon.png" alt="">
            <h4> {{ requirement.type }}</h4>
          </div>
          <div class="progress-bar__bar">
            <div 
              :class="['progress-bar__fill', requirement.type]" 
              :style="`width: ${ requirement.harvested / requirement.quota * 100 }%`">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
    name: 'ProgressMenu',
    setup(props) {
        const store = useStore();

        const levelRequirements = computed(() => store.state.levelRequirements);

        return {
            levelRequirements
        }
    }
}
</script>

<style lang="scss">
    .pm {
        display:flex;
        flex-direction: column;
        width:100%;
        max-height:200px;
        align-items: flex-end;

        &__bars {
          display:flex;
          align-items: center;
          flex-direction:column;
        }

        .title {
          margin:0;
        }

        .content-box {
          width: 50%;
          min-width: 300px;
        }
    }

    .progress-bar {

      &__container {
        margin-bottom:1rem;
        width:70%;
      }

      &__title {
        display: flex;
        flex-direction: row;

        h4 {
          margin: 0;
          text-transform: capitalize;
        }

        .icon {
          margin-right:5px;
        }
      }

      &__bar {
        width:100%;
        height:10px;
        background-color: #dfe4ea;
        position:relative;
      }

      &__fill {
        position:absolute;
        height:10px;
        top:0;
        left:0;

        &.iron {
          background-color: var(--orange);
        }

        &.cobalt {
          background-color: var(--blue);
        }

        &.silicon {
          background-color: var(--green);
        }
      }
    }
</style>