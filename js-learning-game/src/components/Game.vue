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
import Iron from '../assets/js/resources/Iron';
import Robot from '../assets/js/robots/Robot';

export default {
    name: 'Game',
    setup(props, { expose }) {
        const gameCanvas = ref(null);
        let gameContext = ref(null);

        console.log(gameCanvas);

        const store = useStore();

        let currentLevel = computed(() => store.state.chapterFile);
        let oldLevel = ref(null);

        let resources = [];

        const drawMothership = () => {
            // draw the mothership. This will remain the same the entire game.
            gameContext.value.fillStyle = 'red';
            gameContext.value.fillRect(1920/2, 1080/2, 50, 50);
        }

        const drawResources = async () => {
            for (let resource of resources) {
                console.log(resource)
                switch (resource.type) {
                    case 'Iron':
                        console.log('drawing iron')
                        // let image = await getSprite('resources', 'iron.svg');
                        // console.log('got sprite');
                        // console.log(image);

                        var image = new Image();

                        let img = await fetch('/sprites/resources/iron.svg');
                        await img.blob();

                        console.log(img);

                        image.onload = () => {
                            console.log('image')
                            console.log(image)
                            gameContext.value.drawImage(image, resource.position.x, resource.position.y, 20, 20);
                        }
                        image.src = '/sprites/resources/iron.svg';
                }
            }
        }

        const initGame = () => {
            gameContext = gameCanvas.value.getContext('2d');
            gameLoop();
        }

        const changeLevel = () => {
            switch (currentLevel.value) {
                case 'level1':
                    console.log('spawning rocks...');
                    //spawn 10 iron rocks
                    for(let i = 0; i < 10; i++) {
                        let posX = getRandomInt(gameCanvas.value.width - 100);
                        let posY = getRandomInt(gameCanvas.value.height - 100);
                        resources.push(new Iron(posX, posY));
                    }
            }

            oldLevel.value = currentLevel.value;
        }

        const gameLoop = async () => {

            // check if the level needs to be changed
            console.log('Starting game loop');
            if (currentLevel.value !== oldLevel.value) {

                console.log('changing level');
                changeLevel();
            }

            // clear the canvas

            console.log('clearing canvas')
            gameContext.value.clearRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);

            console.log('drawing mothership')
            drawMothership();

            console.log('drawing resources')
            drawResources();
        }

        onMounted(() => {
            initGame();
        });

        onUpdated(() => {
            gameLoop();
        })

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