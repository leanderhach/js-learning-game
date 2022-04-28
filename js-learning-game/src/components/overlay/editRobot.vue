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
import emitter from 'tiny-emitter/instance';

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

        let editor = null;
        let robotID = ref(props.id);


        const chapterContent = async () => {
            const file = await fetch(`/levels/${chapter.value}.md`)
            const content = await file.text();
            chapterText.value = marked(content);
        }

        const saveRobot = () => {
            let robot = robotTemplates.value.find(robot => robot.templateID === robotID.value);

            if (robot) {
                robot.script = editor.getValue();
                store.commit('updateRobotTemplateScript', robot)
            }
        }

        emitter.on('editRobot', (templateID) => {
          robotID.value = templateID;

          let template = robotTemplates.value.find(robot => robot.templateID === templateID);
          editor.setValue(template.script);
        })


        onMounted(() => {
            chapterContent();
            const store = useStore();

            console.log('stuff');

            const container = document.querySelector('#monaco');
            const parentContainer = document.querySelector('#monaco-container');

            // setup monaco
            editor = monaco.editor.create(container, {
                value: 'robot.turnOn()',
                language: 'javascript',
                automaticLayout: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                theme: 'vs-dark',
                padding: { top: 25 },
                readOnly: false,
            })
        })

        return {
            saveRobot,
            chapterText,
            chapterContent,
            store,
            editor,
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
            height:95%;
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
            width: calc(50% - 10px);
            text-align:left;
            margin-left:10px;
        }

        .button-row{
          display: flex;
          flex-direction: row-reverse;
          width:100%;
        }
    }
</style>