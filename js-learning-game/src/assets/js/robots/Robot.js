import { v4 as uuidv4 } from 'uuid';
import Point from '../maths/Point';
import { lerp, distanceBetweenPoints } from '../maths';
import Vector from '../maths/Vector';
import timeout from '../../../utils/timeout';
import { useStore } from 'vuex'

function Robot(name, color, script, posX, posY, window) {
    this.name = name;
    this.color = color;
    this.script = script || null;
    this.id = uuidv4();

    this.drawDebug = false;

    this.position = new Point(posX, posY);
    this.window = window || null;
    this.on = false;
}

Robot.prototype.toString = function () {
    return `name: ${this.name}, color: ${this.color}`
}

Robot.prototype.findResource = function (type) {
    console.log(`looking for ${type}`);
}

Robot.prototype.turnOn = function () {
    this.on = true;
}

Robot.prototype.turnOff = function () {
    this.on = false;
}

Robot.prototype.collectResource = function () {
    const store = useStore();

    if (store.state.resources.find(resource => resource.position == this.position)) {
        console.log(`found ${resource}!`)
    }
}

Robot.prototype.navigateToLocation = async function (location, startPoint, passedTime) {

    // console.log('running navigation');
    // robots can move at a set speed
    const speed = 20;
    const initialPosition = startPoint || this.position; 
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

        console.log(nextPoint);

        this.position = nextPoint;

        await timeout(16.66);
        return await this.navigateToLocation(location, initialPosition, timeStep);
    } else {
        return true;
    }
}

export default Robot;