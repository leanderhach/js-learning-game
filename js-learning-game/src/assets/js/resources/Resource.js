import Point from '../maths/Point';
import { v4 as uuidv4 } from 'uuid';

function Resource(type, health, posX, posY, color, shape) {
    this.position = new Point(posX, posY);

    this.id = uuidv4();

    this.type = type;
    this.health = health;

    this.color = color;
    this.shape = shape;

    this.hasCollectorAssigned = false;
}

Resource.prototype.getPosition = function() {
    return [this.posX, this.posY];
};

Resource.prototype.getType = function() {
    return this.type;
};

Resource.prototype.toString = function() {
    return this.type;
};

Resource.prototype.getHealth = function () {
    return this.health;
}

Resource.prototype.assignCollector = function () {
    this.hasCollectorAssigned = true;
}

export default Resource;