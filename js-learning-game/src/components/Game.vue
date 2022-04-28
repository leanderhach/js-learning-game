<template>
  <div id="game-container">
    <canvas
      ref="gameCanvas"
      :height="screenHeight"
      :width="screenWidth"
    />
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { getRandomInt } from '../utils/math';
import { getSprite } from '../utils/file';
import Iron from '../assets/js/resources/Iron';
import Cobalt from '../assets/js/resources/Cobalt';
import getColorFilter from '../utils/getColorFilter';

export default {
    name: 'Game',
    setup(props, { expose }) {
        const gameCanvas = ref(null);
        let gameContext = null;

        const store = useStore();

        let currentLevel = computed(() => store.state.chapterFile);
        let oldLevel = ref(null);


        // check size of the screen;
        const screenHeight = computed(() => window.innerHeight);
        const screenWidth = computed(() => window.innerWidth);

        const drawMothership = () => {
            // draw the mothership. This will remain the same the entire game.
            gameContext.fillStyle = 'red';
            gameContext.fillRect(screenWidth.value / 2, screenHeight.value / 2, 30, 30);
        }

        // resource creation functions
        const makeResource = (count, type) => {

            let resources = [];

            for(let i = 0; i < count; i++) {
                let posX = getRandomInt(gameCanvas.value.width - 100);
                let posY = getRandomInt(gameCanvas.value.height - 100);

                switch (type) {
                    case 'iron':
                        resources.push(new Iron(posX, posY));
                        break;

                    case 'cobalt':
                        resources.push(new Cobalt(posX, posY));
                        break;
                }
            }

            store.commit('addResources', resources);
        }

        const drawResources = async () => {
            for (let resource of store.state.resources) {
                let image;

                switch (resource.type) {
                    case 'iron':
                        image = await getSprite('resources', 'iron.png');
                        gameContext.drawImage(image, resource.position.x, resource.position.y, 10, 10);
                        break;
                    
                    case 'cobalt':
                        image = await getSprite('resources', 'cobalt.png');
                        gameContext.drawImage(image, resource.position.x, resource.position.y, 10, 10);
                        break;
                }
            }
        }

        const drawBots = async () => {
            for (let robot of store.state.robotInstances) {
                let image = await getSprite('robots', 'basic_robot.png');

                // set the robot's color
                gameContext.filter = getColorFilter(robot.color);
                gameContext.drawImage(image, robot.position.x, robot.position.y, 15, 15);
                gameContext.filter = "none";
            }
        }

        const initGame = () => {
            gameContext = gameCanvas.value.getContext('2d');
            gameLoop();
        }

        const changeLevel = () => {
            let requirements;
            let robotUpgrades;

            switch (currentLevel.value) {
                case 'level1':
                    console.log('level 1!');
                    makeResource(16, 'iron');

                    // set the resource requirements for this level
                    requirements = [
                        {
                            type: 'iron',
                            quota: 10,
                            harvested: 3,
                        }
                    ];

                    store.commit('setLevelRequirements', { requirements });

                    break;
                
                case 'level2':

                    console.log('level 2!');

                    requirements = [
                        {
                            type: 'iron',
                            quota: 20,
                            harvested: 0
                        },
                        {
                            type: 'cobalt',
                            quota: 16,
                            harvested: 0,
                        }
                    ]

                    robotUpgrades = {
                        backpackSize: 3,
                    }

                    makeResource(25, 'iron');
                    makeResource(5, 'cobalt');
                    store.commit('setLevelRequirements', { requirements, robotUpgrades})
                    break;

                case 'level3':
                    console.log('level 3!');

                    requirements = [
                        {
                            type: 'iron',
                            quota: 20,
                            harvested: 0
                        },
                        {
                            type: 'cobalt',
                            quota: 16,
                            harvested: 0,
                        }
                    ]

                    robotUpgrades = {
                        backpackSize: 3,
                    }

                    makeResource(25, 'iron');
                    makeResource(5, 'cobalt');
                    store.commit('setLevelRequirements', { requirements, robotUpgrades})
                    break;
            }

            oldLevel.value = currentLevel.value;
        }

        const gameLoop = async () => {

            // check if the level needs to be changed
            if (currentLevel.value !== oldLevel.value) {
                changeLevel();
            }

            // clear the canvas
            gameContext.clearRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);

            drawMothership();
            drawResources();
            drawBots();

            // update on frame
            window.requestAnimationFrame(gameLoop);
        }

        onMounted(() => {
            initGame();
        });

        return {
            gameCanvas,
            gameContext,
            screenHeight,
            screenWidth
        }
    }
}
</script>

<style lang="scss">
    #game-container {
        height:100%;
        width:100%;
        position:absolute;
        top:0;
        left:0;
        z-index:2;
    }
</style>