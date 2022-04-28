import Resource from './Resource';

function Silicon(posX, posY) {
    Resource.call(this, 'silicon', 200, posX, posY, 'blue', 'square');
}

Silicon.prototype = Object.create(Resource.prototype);
Silicon.prototype.constructor = Silicon;

Silicon.prototype.isSilicon = function () {
    return true;
}

export default Silicon;