// linear interpolation between points given progress
export function lerp(initialPoint, finalPoint, progress) {
    return initialPoint + (finalPoint - initialPoint) * progress;
}

// calculate the distance between two Points in space
export function distanceBetweenPoints(initialPoint, destinationPoint) {
    let x1 = initialPoint.x;
    let y1 = initialPoint.y;

    let x2 = destinationPoint.x;
    let y2 = destinationPoint.y;
    
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

export function angleBetweenPoints(initialPoint, destinationPoint) {
    let x = destinationPoint.x = initialPoint.x;
    let y = destinationPoint.y - initialPoint.y;

    return Math.atan(y, x) * 180 / Math.PI;
}