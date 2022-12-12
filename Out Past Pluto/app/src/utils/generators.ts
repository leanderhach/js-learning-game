import { rawMaterialTypes } from '../gameManager';
import { get } from 'svelte/store';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function getRandomCelestialName() {
	const letters =
		'N' +
		characters.charAt(Math.floor(Math.random() * characters.length)) +
		characters.charAt(Math.floor(Math.random() * characters.length));

	const firstNumber = Math.floor(1000 + Math.random() * 9000);
	const secondNumber = Math.floor(1000 + Math.random() * 9000);

	return `${letters}-${firstNumber}-${secondNumber}`;
}

export function getActualAbundance(abundanceMultiplier: number) {
	// abundance is a measure of resources that the asteroid has
	// asteroids are generated with an abundance value in mind,
	// which must be converted to an actual abundance figure, which is random
	const max = abundanceMultiplier + 50;
	const min = abundanceMultiplier - 50;

	return Math.random() * (max - min) + min;
}

export function getRandomValidComposition() {
	// get a random composition from the list of raw material types
	// ensure that only materials currently in demand are spawned
	const materials = get(rawMaterialTypes);
	return materials[Math.floor(Math.random() * materials.length)];
}

export function getRandomAsteroidSize(abundance: number) {
	const sizeBasis = abundance / 100;

	const max = sizeBasis * 5;
	const min = sizeBasis * 2;

	return Math.random() * (max - min) + min;
}

export function getRandomInRange(min: number, max: number) {
	return Math.random() * (max - min) + min;
}
