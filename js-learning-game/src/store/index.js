import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export const store = createStore({
  state () {
    return {
        robotTemplates: [],
        robotInstances: [],
        level: 0,
        isPlaying: true,
        missionBrief: "Good Morning commander! Build robots and feed the mothership. If you fail, you'll be replaced as easily as one of your robots. Good Luck.",
        currentResourceDemands: [],
        chapterFile: 'level1',
        resources: [],
    }
    },
    mutations: {
        addRobotTemplate(state, template) {
            state.robotTemplates.push(template);
        },
        removeRobotTemplate(state, templateID) {
            let index = state.robotTemplates.findIndex(template => template.id === templateID);
            state.robotTemplates.splice(index, 1);
        },
        togglePlaying(state) {
            state.isPlaying = !state.isPlaying;
        },
        changeChapterFile(state, name) {
            state.chapterFile = name;
        },
        addResources(state, resources) {
            if (resources instanceof Array) {
                state.resources = state.resources.concat(resources);
            } else {
                state.resources.push(resources);
            }
        },
        createRobotWorkerAndInstance(state, { instance, template }) {
            let newRobotInstance = template;
            newRobotInstance.id = uuidv4();
            console.log(newRobotInstance);
            state.robotInstances.push(newRobotInstance);

            // once the instance is added, finish setting it up
            instance.postMessage({ type: 'setupRobot', template: JSON.stringify(newRobotInstance), resources: JSON.stringify(state.resources)});
        }
    }
})
