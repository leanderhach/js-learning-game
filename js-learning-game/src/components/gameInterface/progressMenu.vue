<template>
  <!-- Progress Menu -->
  <div class="pm content-box">
    <h4 class="title">
      Progress
    </h4>
    <div class="pm__bars" />
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
    name: 'ProgressMenu',
    setup(props) {
        const store = useStore();

        const currentResourceDemands = computed(() => store.state.currentResourceDemands)

        return {
            currentResourceDemands
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