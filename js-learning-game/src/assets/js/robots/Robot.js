import { v4 as uuidv4 } from 'uuid';
import Point from '../maths/Point';
import { lerp, distanceBetweenPoints } from '../maths';
import Vector from '../maths/Vector';
import timeout from '../../../utils/timeout';
import { useStore } from 'vuex'

function Robot(name, color, script, posX, posY) {
    this.name = name;
    this.color = color;
    this.script = script || null;
    this.templateID = uuidv4();
    this.id = null;

    this.drawDebug = false;

    this.position = new Point(posX, posY);
    this.on = false;

    this.backpack = [];
    this.backpackSize = 1;
}


Robot.prototype.toString = function () {
    return `name: ${this.name}, color: ${this.color}`
}

export default Robot;