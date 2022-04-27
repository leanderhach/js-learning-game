<template>
  <main>
    <div class="columns">
      <div class="column">
        <MainMenu />
        <RobotMakerMenu />
      </div>
      <div class="column" />
      <div class="column">
        <ProgressMenu />
        <ConsoleMenu />
      </div>
    </div>
  </main>
</template>

<script>
import RobotMakerMenu from './gameInterface/robotMakerMenu.vue';
import ProgressMenu from './gameInterface/progressMenu.vue';
import MainMenu from './gameInterface/mainMenu.vue';
import ConsoleMenu from './gameInterface/consoleMenu.vue';

export default {
    name: 'UI',
    components: {
        RobotMakerMenu,
        ProgressMenu,
        MainMenu,
        ConsoleMenu,
    }
}
</script>

<style lang="scss">
    main {
        height:100%;
        width:100%;
        position:relative;
        z-index:10;
        pointer-events: none;
        box-sizing: border-box;
        padding:20px;
    }
    .columns{
        display:flex;
        flex-direction: row;
        height:100%;
        background-color:transparent;

        > .column { 
            display:flex;
            flex-direction: column;
            justify-content: space-between;
        }

        > .column:nth-child(2) {
            width: 40%;
        }

        > .column:nth-child(odd) {
            width:30%;
        }
    }
</style>