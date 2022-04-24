import { createStore } from 'vuex';

export const store = createStore({
  state () {
    return {
        robots: [],
        level: 0,
        isPlaying: true,
        missionBrief: "Good Morning commander! Build robots and feed the mothership. If you fail, you'll be replaced as easily as one of your robots. Good Luck.",
        currentResourceDemands: [],
        chapterFile: 'level1',
    }
    },
    mutations: {
        addRobot(state, robot) {
            state.robots.push(robot);
        },
        removeRobot(state, robotID) {
            let index = state.robots.findIndex(robot => robot.id === robotID);
            state.robots.splice(index, 1);
        },
        togglePlaying(state) {
            state.isPlaying = !state.isPlaying;
        },
        changeChapterFile(state, name) {
            state.chapterFile = name;
        }
    }
})
