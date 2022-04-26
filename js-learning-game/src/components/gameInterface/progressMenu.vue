<template>
  <!-- Progress Menu -->
  <div class="pm content-box">
    <h4 class="title">
      Progress
    </h4>
    <div class="pm__bars">
      <div class="progress-bar-container" v-for="(requirement, key) of levelRequirements" :key="key">
        <label :for="requirement + key">{{ requirement.type }}</label>
        <progress :id="requirement + key" :value="requirement.harvested" :max="requirement.quota">
          {{ (requirement.harvested / requirement.quota) + "%"}} 
        </progress>
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
    }
</style>