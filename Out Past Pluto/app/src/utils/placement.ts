import type { Point } from '../types/point';

export function generatePointInArea(dimensions: Point): Point {
	const x = Math.floor(0 + Math.random() * dimensions.x);
	const y = Math.floor(0 + Math.random() * dimensions.y);

	return {
		x: x,
		y: y
	};
}

export function generatePointInAreaWithOffset(offset: Point, range: number): Point {
	const xRange = [offset.x + range, offset.x - range];
	const yRange = [offset.y + range, offset.y - range];

	const xPoint = Math.random() * (xRange[0] - xRange[1]) + xRange[1];
	const yPoint = Math.random() * (yRange[0] - yRange[1]) + yRange[1];

	return {
		x: xPoint,
		y: yPoint
	};
}
