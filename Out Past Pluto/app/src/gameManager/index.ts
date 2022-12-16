import { AsteroidField } from '../classes/Asteroid';
import { getRandomCelestialName, getRandomInRange } from '../utils/generators';
import { get, writable } from 'svelte/store';
import { generatePointInArea } from '../utils/placement';
import type { Point } from '../types/point';

export const friendlyDrones = writable();
export const enemyDrones = writable();
export const asteroidFields = writable<AsteroidField[]>();
export const rawMaterialTypes = writable<string[]>(['iron']);

export function initializeGame(canvasDimensions: Point) {
	for (let index = 0; index < 4; index++) {
		const field = new AsteroidField({
			name: getRandomCelestialName(),
			position: generatePointInArea(canvasDimensions),
			size: getRandomInRange(90, 150),
			generationSettings: {
				count: 20,
				abundance: getRandomInRange(50, 90)
			}
		});
		if (get(asteroidFields) && get(asteroidFields).length > 0) {
			asteroidFields.set([...get(asteroidFields), field]);
		} else {
			asteroidFields.set([field]);
		}
	}
}
