function Vector(magnitude, angle) {
   var angleRadians = (angle * Math.PI) / 180;

   this.magnitudeX = magnitude * Math.cos(angleRadians);
   this.magnitudeY = magnitude * Math.sin(angleRadians);
}

Vector.prototype.toString = function () {
    return `(${this.magnitudeX}, ${this.magnitudeY})`;
}

export default Vector;