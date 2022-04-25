import Resource from './Resource';

function Cobalt(posX, posY) {
    Resource.call(this, 'Cobalt', 200, posX, posY, 'blue', 'square');
}

Cobalt.prototype = Object.create(Resource.prototype);
Cobalt.prototype.constructor = Cobalt;

Cobalt.prototype.isCobalt = function () {
    return true;
}

export default Cobalt;