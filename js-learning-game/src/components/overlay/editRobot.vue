<template>
    <div id="overlay-body">
        <div class="editor" id="#monaco-container">
            <div id="monaco"></div>
        </div>
        <div class="instructions">
            <div class="chapter-text" v-html="chapterText"></div>
        </div>
        <div class="button-row">
            <button class="button" @click="saveRobot">Save</button>
        </div>
    </div>
</template>

<script>
import * as monaco from 'monaco-editor';
import { useStore } from 'vuex';
import { computed, onMounted, ref } from '@vue/runtime-core';
import { marked } from 'marked';

export default {
    name: 'editRobot',
    props: {
        id: String,
    },
    setup(props) {
        const store = useStore();
        const chapter = computed(() => store.state.chapterFile);
        const robots = computed(() => store.state.robots);

        let chapterText = ref('');
        let editor = ref(null);

        const chapterContent = async () => {
            const file = await fetch(`/levels/${chapter.value}.md`)
            const content = await file.text();
            chapterText.value = marked(content);
        }

        const saveRobot = () => {
            let robot = robots.value.find(robot => robot.id === props.id);
            let position = robots.value.findIndex(robot => robot.id === props.id);

            if (robot) {
                robot.script = JSON.stringify(editor.getValue());
                robots.value.splice(position, 1, robot);
            }
        }


        onMounted(() => {
            chapterContent();
            const store = useStore();

            const container = document.querySelector('#monaco');
            const parentContainer = document.querySelector('#monaco-container');
            
            const codePreset = `this.turnOn();\nlet resourcePosition = this.findResource(/*TODO: specify resource*/);
            \nawait this.navigateTo(/*TODO: where? */);\nthis.collectResource();\nthis.returnHome();`

            // setup monaco
            editor = monaco.editor.create(container, {
                value: store.state.robots.find(robot => robot.id === props.id).script || codePreset,
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