import { store } from '../store';

export default function robotMessageHandler(e) {

    switch(e.data.type) {
        case 'updateRobot':
            store.commit('updateRobotInstance',  { instance: e.data.robot });
            break;
        case 'resourceListUpdate':
            store.commit('updateResourceList', e.data.resources);
            break;
        case 'collectResource':
            store.commit('collectResource', e.data.resource);
            break;
        case 'updateResource':
            store.commit('updateResource', { resourceID: e.data.resourceID, resource: e.data.resource});
            break;
        case 'doneWork':
            store.commit('doneWork', e.data.robot);
            break;
        case 'unloadStoredResources':
            store.commit('workerUnloadStoredResources', e.data.robot);
        case 'dumpBackpack':
            store.commit('dumpBackpack', e.data.robot)
            break;
        case 'log':
            store.commit('addMessageToConsole', { ...e.data });
            break;
        case 'debug':
            console.log(e.data.message);
            break;
    }
}