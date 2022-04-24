<template>
  <div id="app-container">
    <GameInterface></GameInterface>
    <Game></Game>
    <Overlay></Overlay>
  </div>
</template>

<script>
import GameInterface from './components/GameInterface.vue';
import Game from './components/Game.vue';
import Overlay from './components/Overlay.vue';

export default {
  name: 'App',
  components: {
    GameInterface,
    Game,
    Overlay
  }
}
</script>

<style lang="scss">

@import url('./assets/css/global.scss');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-light);
  background-color: var(--space);
}
</style>
