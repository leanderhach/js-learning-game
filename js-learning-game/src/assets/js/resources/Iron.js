import Resource from './Resource';

function Iron(posX, posY) {
    Resource.call(this, 'Iron', 200, posX, posY, 'orange', 'triangle');
}

Iron.prototype = Object.create(Resource.prototype);
Iron.prototype.constructor = Iron;

Iron.prototype.isIron = function () {
    return true;
}

export default Iron;