<template>
  <!-- Main Menu -->
  <div class="mm">
    <div class="content-box">
      <div class="mm__options">
        <nav class="options__nav">
          <button class="invisible-button">
            <font-awesome-icon icon="cog" />
          </button>
          <button
            v-if="isPlaying"
            class="invisible-button"
            @click="togglePlaying"
          >
            <font-awesome-icon icon="pause" />
          </button>
          <button
            v-else
            class="invisible-button"
            @click="togglePlaying"
          >
            <font-awesome-icon icon="play" />
          </button>
          <button class="invisible-button">
            <font-awesome-icon icon="circle-info" />
          </button>
        </nav>
      </div>
      <div class="mm__brief">
        {{ missionBrief }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
    name: 'MainMenu',
    setup(props, { expose }) {
        const store = useStore();
        const isPlaying = computed(() => store.state.isPlaying);
        const missionBrief = computed(() => store.state.missionBrief);

        const togglePlaying = () => {
            store.commit('togglePlaying');
        }

        return {
            togglePlaying,
            isPlaying,
            missionBrief,
        }
    }
}
</script>

<style lang="scss">
    .mm {
        width:100%;
        max-height:200px;

        &__options {
            display:flex;
            flex-direction:row;
            padding:0 20px;
        }

        &__brief {
            margin-top: 20px;
            padding:0 20px; 
        }

        .content-box {
          width:50%;
        }
    }

    .options__nav {
        background-color: #222f3e;
        padding:10px;
        border-radius:20px;

        .invisible-button {
            color: white;
            font-size:1.25rem;
        }

        .invisible-button:not(:last-child) {
            margin-right:10px;
        }
    }
</style>