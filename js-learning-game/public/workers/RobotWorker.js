// define the robot that the worker will be in charge of
let robot = null;
let robotWorker = null;

// define a store for resources, this will be used for navigation calculations
let resources = null;

// resource the bot is going towards
let targetResource = null;
let collectedResource = null;

// runtime check variables
let running = false;
let mapHasResources = true;
let shouldRunAgain = true;
let isPlaying = true;

// count the number of instant execution loops
let instantLoops = 0

//-------------------------------------------------------------------------//
// Point class
//------------------------------------------------------------------------//
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {
    return `(${this.x}, ${this.y})`;
};

Point.prototype.isSameAs = function (point) {
    if (
        this.x == point.x &&
        this.y == point.y
    ) {
        return true;
    }

    return false;
}


//-------------------------------------------------------------------------//
// Macros
//------------------------------------------------------------------------//
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;


//-------------------------------------------------------------------------//
// Math functions
//------------------------------------------------------------------------//

// linear interpolation between points given progress
function lerp(initialPoint, finalPoint, progress) {
    return initialPoint + (finalPoint - initialPoint) * progress;
}

// calculate the distance between two Points in space
function distanceBetweenPoints(initialPoint, destinationPoint) {
    let x1 = initialPoint.x;
    let y1 = initialPoint.y;

    let x2 = destinationPoint.x;
    let y2 = destinationPoint.y;
    
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

//-------------------------------------------------------------------------//
// Print to console function
//------------------------------------------------------------------------//
function printMessageToConsole(level, heading, message) {
    postMessage({ type: 'log', level: level, heading: heading || `${robot.name}:${robot.id}`, message: JSON.stringify(message) });
}

//-------------------------------------------------------------------------//
// Robot worker class
//------------------------------------------------------------------------//

function RobotWorker(id) {
    this.id = id;
}

RobotWorker.prototype.findResource = function (type) {
    let resourcesOfType = resources.filter(resource => resource.type === type && !resource.hasCollectorAssigned);

    if (resourcesOfType.length > 0) {
        rand = Math.floor(Math.random() * resourcesOfType.length);
        targetResource = resourcesOfType[rand];
        
        // set the targetResource position to be a point, since this was stripped when the object
        // was sent to the worker the first time
        targetResource.position = new Point(targetResource.position.x, targetResource.position.y);


        // update resource array to reflect that a collector has been assigned
        let pos = resources.map(function (e) { return e.id; }).indexOf(targetResource.id);
        resources[pos].hasCollectorAssigned = true;

        postMessage({type: 'resourceListUpdate', resources: resources });
        return targetResource;
    }

    printMessageToConsole('warn', null, 'Can\'t find any new resources!');
    return null;
}

RobotWorker.prototype.turnOn = function () {
    robot.on = true;
}

RobotWorker.prototype.turnOff = function () {
    robot.on = false;
}

RobotWorker.prototype.collectResource = function () {
    

    // extrapolate the robot's position. it may be off by += 5
    let lowX = robot.position.x - 5;
    let highX = robot.position.x + 5;

    let lowY = robot.position.y - 5;
    let highY = robot.position.y + 5;
    
    if (targetResource.position.x >= lowX
        && targetResource.position.x <= highX
        && targetResource.position.y >= lowY
        && targetResource.position.y <= highY
    ) {
        collectedResource = JSON.parse(JSON.stringify(targetResource));

        if (robot.backpack.length <= robot.backpackSize) {
            robot.backpack.push(collectedResource);

            postMessage({ type: 'collectResource', resource: targetResource.id });
            postMessage({ type: 'updateRobot', robot: robot, instance: robotWorker.id });
            return true;
        } else {

            targetResource.hasCollectorAssigned = false;
            // if backpack is full, release the resource back to not having a collector
            postMessage({ type: 'updateResource', resourceID: targetResource.id, resource: targetResource });
            postMessage({ type: 'updateRobot', robot: robot, instance: robotWorker.id });
            printMessageToConsole('danger', null, 'Backpack full, cannot collect resource.');
        }
    }

    return false;
}

RobotWorker.prototype.navigateToLocation = async function (location, startPoint, passedTime) {

    // if location is null, return home
    if (!location) {
        return true;
    }

    // robots can move at a set speed
    const speed = 160;
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
        );

        robot.position = nextPoint;

        postMessage({type: 'updateRobot', robot: robot, instance: robotWorker.id});
        await timeout(16.66);
        return await this.navigateToLocation(location, initialPosition, timeStep);
    } else {
        return true;
    }
}

RobotWorker.prototype.returnHome = async function () {
    return await this.navigateToLocation(new Point(960, 540));
}

RobotWorker.prototype.unloadResources = function () {
    postMessage({ type: 'unloadStoredResources', robot: robot });
}

RobotWorker.prototype.checkBackpack = function() {
    return robot.backpack;
}

RobotWorker.prototype.getBackpackSize = function () {
    return robot.backpack.length;
}

RobotWorker.prototype.getName = function () {
    return `${robot.name}:${robot.id}`;
}

RobotWorker.prototype.getPosition = function () {
    return robot.position;
}

RobotWorker.prototype.toggleDebug = function () {
    robot.drawDebug = true;
}

RobotWorker.prototype.getColor = function () {
    return robot.color;
}

RobotWorker.prototype.sendLogMessage = function (message) {
    printMessageToConsole('log', null, message);
}
//-------------------------------------------------------------------------//
// Main Loop
//------------------------------------------------------------------------//

async function mainLoop() {

    // if (instantLoops >= 10) {
    //     printMessageToConsole('danger', null, 'infinite loop, stopping bot');
    // }

    // only run the robot's script if robot setup has been completed, and no other game conditions are breached
    if (robot.name && robot.script && robotWorker && resources && !running && shouldRunAgain && isPlaying && mapHasResources && instantLoops <= 10) {

        running = true;

        var startTime = performance.now()
        let mainFunc = await new AsyncFunction('robot', 'print', robot.script)(robotWorker, robotWorker.sendLogMessage);
        // report back that the main loop has been cycled. Should return either continueWork or returnHome
        postMessage({ type: 'doneWork', robot: robot });

        var endTime = performance.now()

        if ((endTime - startTime) < 20) {
            printMessageToConsole('danger', null, `danger: infinite loop detected. Iterations before forced stop: ${10 - instantLoops}`)
            instantLoops += 1;
        } else {
            instantLoops = 0;
        }

        mainFunc = null;

        running = false;
        return true;
    } else {
        postMessage({ type: 'doneWork', robot: robot });

        return true;
    }
}


// define onmessage tasks
self.onmessage = function (e) {

    // check to make sure its the right robot
    switch (e.data.type) {

        // case for the worker completing setup. This should happen close to the worker
        // being created.
        case 'setupRobot':

            // create local copy of the robot object that can be safely modified
            robot = JSON.parse(e.data.template);
            robot.script = `${JSON.parse(robot.script)}`

            // instantiate robotWorker class
            robotWorker = new RobotWorker(robot.id);
            resources = JSON.parse(e.data.resources);
            postMessage({ message: 'setup complete'});
            mainLoop();
            break;

        // case for the bot completing all tasks and returning home, calling done 
        // and there still being resources avaliable
        case 'outOfResources':
            resources = JSON.parse(e.data.resources);
            mapHasResources = false;
            break;

        // case for the resource list being updated
        case 'updateResourceList':
            resources = JSON.parse(e.data.resources);

            // if there are resources in the map, set var to true
            if (resources.length > 0) {
                mapHasResources = true;
            }

            break;

        // case for ordering the robot home
        case 'returnHome':
            robotWorker.returnToHome();
            break;

        // default return to 'doneWork' message sent from worker
        case 'continueWork':
            if (mapHasResources) {
                robot = JSON.parse(e.data.robotInstance);
                robot.script = `${JSON.parse(robot.script)}`;
                resources = JSON.parse(e.data.resources);
                mainLoop();
            }
            break;
        
        // case for the robot being updated on the frontend
        case 'updateRobot':
            robot = JSON.parse(e.data.robotInstance);
            break;
        
        // case for playstate being changed
        case 'changePlayState':
            isPlaying = e.data.state;

    }
}
