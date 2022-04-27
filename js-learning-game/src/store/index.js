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
        upgradables: {
            backpackSize: 1,
            speed: 160,
        },
        consoleMessages: [],
    }
    },
    getters: {
        upgradables: state => state.upgradables,
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

            // inform each worker of the change in active play status
            for (let worker of state.robotWorkers) {
                worker.workerInstance.pushMessage({type: 'changePlayState', state: state.isPlaying})
            }
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

            // push the new resource list to the workers
            this.commit('updateResourceList');
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

        collectResource(state, resourceID) {
            let indexOfResource = state.resources.findIndex(resource => resource.id === resourceID);

            state.resources.splice(indexOfResource, 1);

            this.commit('updateResourceList');
        },

        updateResourceList(state, resources) {

            if (resources) {
                state.resources = resources;
            }

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
            } else if (state.resources.length <= 0) {
                state.robotWorkers[robotWorkerIndex].robotWorker.postMessage({
                    type: 'outOfResources',
                    resources: JSON.stringify(state.resources),
                })
            }
        },

        sendContinueWork(state, robot) {
            // simple reusable interface to send a continue work order to a given worker
            const worker = state.robotWorkers.find(worker => worker.robotInstance === robot.id);
            const robotInstance = state.robotInstances.find(instance => instance.id === robot.id);

            worker.robotWorker.postMessage({
                type: 'continueWork',
                robotInstance: JSON.stringify(robotInstance),
                resources: JSON.stringify(state.resources),
            });
        },

        setLevelRequirements(state, { requirements, robotUpgrades}) {
            state.levelRequirements = requirements;

            // check if the level change also upgrades the robots
            if (robotUpgrades) {
                Object.keys(robotUpgrades).forEach(key => {
                    state.upgradables[key] = robotUpgrades[key];

                    for (let robotTemplate of state.robotTemplates) {
                        robotTemplate[key] = state.upgradables[key];
                    }

                    for (let robotInstance of state.robotInstances) {
                        robotInstance[key] = state.upgradables[key];

                        // update the robot workers, which may have stopped
                        // working if they ran out of resources
                        this.commit('sendContinueWork', robotInstance);
                    }
                })
            }
        },

        checkLevelRequirements(state) {
            let requirements = state.levelRequirements;

            for (let requirement of requirements) {
                if (requirement.quota === requirement.harvested) {
                    continue;
                }

                return;
            }

            // if all requirements have been satisfied
            let level = state.chapterFile.match(/[0-9]/);
            this.commit('changeChapterFile', `level${(parseInt(level[0]) + 1)}`);
        },

        workerUnloadStoredResources(state, robot) {

            console.log('unloading resources')
            let requirements = state.levelRequirements;

            console.log(requirements);

            for (const [index, resource] of robot.backpack.entries()) {
                let requirementIndex = requirements.findIndex(requirement => requirement.type === resource.type);


                if (requirementIndex !== -1 && requirements[requirementIndex].harvested < requirements[requirementIndex].quota) {

                    console.log('stashing resource...')
                    requirements[requirementIndex].harvested += 1;
                    state.levelRequirements = requirements;

                    // remove the element from the robot's backpack if its required;
                    robot.backpack.splice(index, 1);

                    // check if all requirements have been satisfied
                    this.commit('checkLevelRequirements');
                }
            }

            // update the robot
            this.commit('updateRobotInstance', robot);
        },

        updateResource(state, { resourceID, resource }) {
            console.log('updating resource....')
            // updates a resource, usually to revert a collectorAssigned status from bots that have a full backpack
            let resourceIndex = state.resources.findIndex(resource => resource.id === resourceID);
            console.log(resourceID)
            console.log(resourceIndex)

            if (resourceIndex) {
                state.resources[resourceIndex] = resource;
            }

            // update the resource list for all bots
            this.commit('updateResourceList');
        },

        dumpBackpack(state, robot) {
            robot.backpack = []

            this.commit('updateRobotInstance', robot);

        },

        addMessageToConsole(state, {type, level, heading, message}) {
            let newMessage = {
                id: uuidv4(),
                body: {
                    level: level,
                    heading: heading,
                    message: message,
                },
            };
            state.consoleMessages.push(newMessage);
        },

        removeMessageFromConsole(state, messageID) {
            let messageIndex = state.consoleMessages.findIndex(message => message.id === messageID);
            state.consoleMessages.splice(messageIndex, 1);
        },

        clearMessageConsole(state) {
            state.consoleMessages = [];
        }
    }
})
