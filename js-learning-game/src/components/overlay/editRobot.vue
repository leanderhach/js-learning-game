<template>
  <div id="overlay-body">
    <div
      id="#monaco-container"
      class="editor"
    >
      <div id="monaco" />
    </div>
    <div class="instructions">
      <div
        class="chapter-text"
        v-html="chapterText"
      />
    </div>
    <div class="button-row">
      <stateButton :text="'Save'" @clicked="saveRobot"/>
    </div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';
import { useStore } from 'vuex';
import { computed, onMounted, ref } from '@vue/runtime-core';
import { marked } from 'marked';
import stateButton from '../uiElements/stateButton.vue';

export default {
    name: 'EditRobot',
    components: {
      stateButton
    },
    props: {
        id: {
          type: String,
          default: '',
        }
    },
    setup(props) {
        const store = useStore();
        const chapter = computed(() => store.state.chapterFile);
        const robotTemplates = computed(() => store.state.robotTemplates);

        let chapterText = ref('');
        let editor = ref(null);

        const chapterContent = async () => {
            const file = await fetch(`/levels/${chapter.value}.md`)
            const content = await file.text();
            chapterText.value = marked(content);
        }

        const saveRobot = () => {
          console.log('saved!');
            let robot = robotTemplates.value.find(robot => robot.id === props.id);

            if (robot) {
                robot.script = JSON.stringify(editor.getValue());
                store.commit('updateRobotTemplateScript', robot)
            }
        }


        onMounted(() => {
            chapterContent();
            const store = useStore();

            const container = document.querySelector('#monaco');
            const parentContainer = document.querySelector('#monaco-container');
            
            const codePreset = `robot.turnOn();\nlet resourcePosition = robot.findResource(/*TODO: specify resource*/);
            \nawait robot.navigateTo(/*TODO: where? */);\nrobot.collectResource();\nrobot.returnHome();`

            // setup monaco
            editor = monaco.editor.create(container, {
                value: store.state.robotTemplates.find(robot => robot.id === props.id).script || codePreset,
                language: 'javascript',
                automaticLayout: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                theme: 'vs-dark',
                padding: { top: 25 }
            })
        })

        return {
            saveRobot,
            chapterText,
            chapterContent,
            store,
            editor
        }
    },
}
</script>

<style lang="scss" scoped>
    #overlay-body {
        display:flex;
        flex-direction:row;
        flex-wrap: wrap;
        width:70%;
        height:65%;

        .editor{
            height:100%;
            width: calc(50% - 10px);
            margin-right:10px;
        }

        #monaco{
            height:100%;
            text-align: left;
            border-radius:15px;
            overflow:hidden;
        }

        .instructions {
            height:100%;
            width: calc(50% - 10px);
            text-align:left;
            margin-left:10px;
        }

        .button-row{
            width:100%;
        }
    }
</style>