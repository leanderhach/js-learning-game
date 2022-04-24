import { v4 as uuidv4 } from 'uuid';

function ResourceDemand(type, quantity) {
    this.type = type;
    this.quantity = quantity;
    this.id = uuidv4();
}

ResourceDemand.prototype.toString = function () {
    return `################# \n Demand \n ${this.quantity} ${this.type} \n ${this.id} \n #################`
}

export default ResourceDemand;