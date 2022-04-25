// define the robot that the worker will be in charge of
let robot = null;

// define a store for resources, this will be used for navigation calculations
let resources = null;

// resource the bot is going towards
let targetResource = null;


// robot work functions (these need to be here so the robot can communicate via the worker)
findResource = function (type) {
    console.log(`looking for ${type}`);
}

turnOn = function () {
    this.on = true;
}

turnOff = function () {
    this.on = false;
}

collectResource = function () {
    const store = useStore();

    if (store.state.resources.find(resource => resource.position == robot.position)) {
        console.log(`found ${resource}!`)
    }
}

navigateToLocation = async function (location, startPoint, passedTime) {

    // console.log('running navigation');
    // robots can move at a set speed
    const speed = 20;
    const initialPosition = startPoint || robot.position; 
    let timeStep = 1 + (passedTime || 0); //Loop counter

  
    // calculate distance between start and end
    let distance = distanceBetweenPoints(initialPosition, location);  
    let finalTime = 60 * distance / speed; // 100 because 1/10ms is 100. Adjust to 1/Execution frequency
  
    let progress = timeStep / finalTime;

    if ( timeStep < finalTime ) {

        let nextPoint = new Point(
            lerp(initialPosition.x, location.x, progress),
            lerp(initialPosition.y, location.y, progress)
        )

        robot.position = nextPoint;

        // 
        postMessage('movedRobot', robot);
        await timeout(16.66);
        return await navigateToLocation(location, initialPosition, timeStep);
    } else {
        return true;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////
async function mainLoop() {
    // only run the robot's script if robot setup has been completed
    if (robot.name && robot.on && resources) {
        await Object.getPrototypeOf(async function () { }).constructor(robot.script);
        
        // report back that the main loop has been cycled. Should return either continueWork or returnHome
        postMessage('doneWork', robot);
    } else {
        postMessage('doneWork', robot);
    }
}

// define onmessage tasks
self.onmessage = function (e) {

    self.postMessage(e.data);

    // check to make sure its the right robot
    switch (e.type) {

        // case for the worker completing setup. This should happen close to the worker
        // being created.
        case 'setupRobot':
            robot = JSON.parse();
            // resources = e.data[2];
            postMessage({ message: 'setup complete', response: e.payload/*, robot: robot, resources: resources */ });
            //mainLoop();
            break;

        // case for the bot completing all tasks and returning home, calling done 
        // and there still being resources avaliable
        case 'notOutOfResources':
            robot = e.data[1];
            resources = e.data[2];
            mainLoop();
            break;

        // case for the resource list being updated
        case 'resourceListUpdated':
            resources = e.data[1];
            break;

        // case for ordering the robot home
        case 'returnHome':
            navigateToLocation(new Point(100, 50));
            break;

        // default return to 'workcomplete' message sent from worker
        case 'continueWork':
            robot = e.data[1];
            resources = e.data[2];
            mainLoop();
            break;
        
        // case for the robot being updated on the frontend
        case 'updateRobot':
            robot = e.data[1];
            break;

    }
}
