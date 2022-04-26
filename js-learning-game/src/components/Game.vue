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
                case 'doneWork':
                    console.log('called done');
                    store.commit('doneWork', e.data.robot);
                    break;
                
                case 'unloadStoredResources':
                    store.commit('workerUnloadStoredResources', e.data.robot);
                    break;
                case 'log':
                    console.log(e.data.message);
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
                        gameContext.drawImage(image, resource.position.x, resource.position.y, 20, 20);
                        break;
                    
                    case 'Cobalt':
                        image = await getSprite('resources', 'cobalt.png');
                        gameContext.drawImage(image, resource.position.x, resource.position.y, 20, 20);
                        break;
                }
            }
        }

        const drawBots = async () => {
            for (let robot of store.state.robotInstances) {
                let image = await getSprite('robots', 'basic_robot.png');
                gameContext.drawImage(image, robot.position.x, robot.position.y, 15, 15);
            }
        }

        const initGame = () => {
            gameContext = gameCanvas.value.getContext('2d');
            gameLoop();
        }

        const changeLevel = () => {
            let requirements;
            switch (currentLevel.value) {
                case 'level1':
                    console.log('level 1!');
                    makeResource(10, 'iron');

                    // set the resource requirements for this level
                    requirements = [
                        {
                            type: 'Iron',
                            quota: 10,
                            harvested: 0,
                        }
                    ];

                    store.commit('setLevelRequirements', requirements);

                    break;
                
                case 'level2':

                    console.log('spawning cobalt...');
                    const resourcesLeft = resources;
                    let ironLeft = resources.filter(resource => resource.type === 'Iron').length;

                    if(ironLeft < 3) {
                        makeResource(15, 'iron');
                    }

                    makeResource(30, 'cobalt');
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