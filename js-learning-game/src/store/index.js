import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import deepClone from '../utils/clone';
import Point from '../assets/js/maths/Point';

export const store = createStore({
  state () {
    return {
        robotTemplates: [],
        robotInstances: [],
        robotWorkers: [],
        level: 0,
        isPlaying: true,
        missionBrief: "Good Morning commander! Build robots and feed the mothership. If you fail, you'll be replaced as easily as one of your robots. Good Luck.",
        levelRequirements: [],
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

            // copy the robot template and make a new instance. This will
            // contain information used by the game loop for rendering the bot
            let newRobotInstance = deepClone(template);
            newRobotInstance.id = uuidv4();
            newRobotInstance.position = new Point(960, 540);
            state.robotInstances.push(newRobotInstance);

            // push the robot worker and the robot instance ID to link workers with their instance. 
            // This will be used to update all workers of a given template when needed.
            state.robotWorkers.push({
                robotInstance: newRobotInstance.id,
                robotWorker: instance,
            });

            console.log(state.robotInstances, state.robotWorkers);

            // once the instance is added, finish setting it up
            instance.postMessage({
                type: 'setupRobot',
                template: JSON.stringify(newRobotInstance),
                resources: JSON.stringify(state.resources),
            });
        },

        updateRobotInstance(state, robot) {
            let robotInstance = state.robotInstances.findIndex(instance => instance.id === robot.id);

            if (robotInstance !== -1) {
                state.robotInstances[robotInstance].position = robot.position;
                state.robotInstances[robotInstance].backpack = robot.backpack;
                

                // push update back to the worker
                let worker = state.robotWorkers.find(instance => instance.robotInstance === robot.id);
                worker.robotWorker.postMessage({ type: 'updateRobot', robotInstance: JSON.stringify(state.robotInstances[robotInstance]) });
            }
        },

        updateResourceList(state, resources) {
            console.log(state.resources);
            console.log(resources);
            state.resources = resources;

            for (const worker of state.robotWorkers) {
                worker.robotWorker.postMessage({
                    type: 'updateResourceList',
                    resources: JSON.stringify(state.resources)
                });
            }
        },

        doneWork(state, robot) {
            let robotInstanceIndex = state.robotInstances.findIndex(instance => instance.id === robot.id);
            let robotWorkerIndex = state.robotWorkers.findIndex(worker => worker.robotInstance === robot.id);

            if (state.resources.length > 0 && state.isPlaying) { 
                state.robotWorkers[robotWorkerIndex].robotWorker.postMessage({
                    type: 'continueWork',
                    robotInstance: JSON.stringify(state.robotInstances[robotInstanceIndex]),
                    resources: JSON.stringify(state.resources),
                })
            }
        },

        setLevelRequirements(state, requirements) {
            state.levelRequirements = requirements;
        },

        workerUnloadStoredResources(state, robot) {
            let requirements = state.levelRequirements;

            for (const [index, resource] of robot.backpack.entries()) {
                let requirementIndex = requirements.findIndex(requirement => requirement.type === resource.type);


                if (requirementIndex !== -1 && requirements[requirementIndex].harvested < requirements[requirementIndex].quota) {
                    requirements[requirementIndex].harvested += 1;
                    state.levelRequirements = requirements;

                    // remove the element from the robot's backpack if its required;
                    robot.backpack.splice(index, 1);

                    // update the robot
                    this.commit('updateRobotInstance', robot);
                }
            }
        }
    }
})
