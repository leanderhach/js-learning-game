<template>
  <div id="game-container">
    <canvas
      ref="gameCanvas"
      height="1080"
      width="1920"
    />
  </div>
</template>

<script>
import { computed, onMounted, onUpdated, ref } from 'vue';
import { useStore } from 'vuex';
import { getRandomInt } from '../utils/math';
import { getSprite } from '../utils/file';
import timeout from '../utils/timeout';
import Iron from '../assets/js/resources/Iron';
import Cobalt from '../assets/js/resources/Cobalt';
import Robot from '../assets/js/robots/Robot';
import emitter from 'tiny-emitter/instance'

export default {
    name: 'Game',
    setup(props, { expose }) {
        const gameCanvas = ref(null);
        let gameContext = null;

        const store = useStore();

        let currentLevel = computed(() => store.state.chapterFile);
        let oldLevel = ref(null);

        const handleRobotInstanceMessages = async (e) => {

            switch(e.data.type) {
                case 'updateRobot':
                    store.commit('updateRobotInstance', e.data.robot);
                    break;
                case 'resourceListUpdate':
                    store.commit('updateResourceList', e.data.resources);
                    break;
                case 'collectResource':
                    store.commit('collectResource', e.data.resource);
                    break;

                case 'doneWork':
                    store.commit('doneWork', e.data.robot);
                    break;
                
                case 'unloadStoredResources':
                    store.commit('workerUnloadStoredResources', e.data.robot);
                    break;
                case 'log':
                    store.commit('addMessageToConsole', { ...e.data });
                    break;
            }
        }


        // robot creation events
        emitter.on('constructRobot', (id) => {
            let robot = store.state.robotTemplates.find(robot => robot.id === id);

            if (robot) {
                let robotInstance = new Worker('/workers/RobotWorker.js');

                // add an event listener to the new worker
                robotInstance.onmessage = (e) => {
                    handleRobotInstanceMessages(e)
                };

                store.commit('createRobotWorkerAndInstance', {instance: robotInstance, template: robot});
            }
        })
        

        const drawMothership = () => {
            // draw the mothership. This will remain the same the entire game.
            gameContext.fillStyle = 'red';
            gameContext.fillRect(1920/2, 1080/2, 50, 50);
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
                    case 'Iron':
                        image = await getSprite('resources', 'iron.png');
                        gameContext.drawImage(image, resource.position.x, resource.position.y, 10, 10);
                        break;
                    
                    case 'Cobalt':
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
                // lord forgive me for this switch statement
                switch (robot.color) {
                    case '--robot-gold':
                        gameContext.filter = 'invert(81%) sepia(52%) saturate(447%) hue-rotate(351deg) brightness(98%) contrast(88%)';
                        break;
                    case '--robot-blue':
                        gameContext.filter = 'invert(23%) sepia(69%) saturate(7426%) hue-rotate(240deg) brightness(100%) contrast(96%)';
                        break;
                    case '--robot-green':
                        gameContext.filter = 'invert(70%) sepia(56%) saturate(543%) hue-rotate(88deg) brightness(87%) contrast(98%)';
                        break;
                    case '--robot-orange':
                        gameContext.filter = 'invert(61%) sepia(86%) saturate(3582%) hue-rotate(330deg) brightness(99%) contrast(104%)';
                        break;
                    case '--robot-grey':
                        gameContext.filter = 'invert(50%) sepia(20%) saturate(280%) hue-rotate(179deg) brightness(92%) contrast(86%)';
                        break;
                    case '--robot-lime':
                        gameContext.filter = 'invert(80%) sepia(67%) saturate(335%) hue-rotate(73deg) brightness(101%) contrast(86%)';
                        break;
                }
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
                            type: 'Iron',
                            quota: 10,
                            harvested: 0,
                        }
                    ];

                    store.commit('setLevelRequirements', { requirements });

                    break;
                
                case 'level2':

                    console.log('level 2!');

                    requirements = [
                        {
                            type: 'Iron',
                            quota: 20,
                            harvested: 0
                        },
                        {
                            type: 'Cobalt',
                            quota: 16,
                            harvested: 0,
                        }
                    ]

                    robotUpgrades = {
                        backpackSize: 3,
                    }

                    store.commit('setLevelRequirements', { requirements, robotUpgrades})

                    makeResource(15, 'iron');
                    makeResource(30, 'cobalt');
                    break;

                case 'level3':
                    console.log('level 3!');


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
            gameContext
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