import type { Point } from '../types/point';
import { v4 as uuidv4 } from 'uuid';
import { generatePointInArea, generatePointInAreaWithOffset } from '../utils/placement';
import {
	getActualAbundance,
	getRandomAsteroidSize,
	getRandomCelestialName,
	getRandomValidComposition
} from '../utils/generators';
import type { DisplayObject } from 'pixi.js';
import { RenderStore } from '../store';
import { get } from 'svelte/store';

export class Asteroid {
	_id: string;
	_displayObject: DisplayObject;
	composition: string;
	size: number;
	abundance: number;
	name: string;
	position: Point;

	constructor(asteroid: Omit<Asteroid, '_displayObject' | '_id'>) {
		this.composition = asteroid.composition;
		this.size = asteroid.size;
		this.abundance = asteroid.abundance;
		this.name = asteroid.name;
		this.position = asteroid.position;
		this._id = uuidv4();
		this._displayObject = get(RenderStore).makeObjectRenderable(this);
		get(RenderStore).drawOnce(this);
	}
}

export class AsteroidField {
	_id: string = uuidv4();
	asteroids: Asteroid[] = [];
	position: Point;
	name: string;
	size: number;
	generationSettings: {
		count: number;
		abundance: number;
	};

	private generateAsteroids() {
		this.asteroids = [];

		for (let i = 0; i < this.generationSettings.count; i++) {
			const actualAbundance = getActualAbundance(this.generationSettings.abundance);
			this.asteroids.push(
				new Asteroid({
					composition: getRandomValidComposition(),
					size: getRandomAsteroidSize(actualAbundance),
					abundance: actualAbundance,
					position: generatePointInAreaWithOffset(
						{
							x: this.position.x,
							y: this.position.y
						},
						this.size
					),
					name: getRandomCelestialName()
				})
			);
		}
	}

	constructor(opts: Omit<AsteroidField, '_id' | 'asteroids' | 'generateAsteroids'>) {
		this.position = opts.position;
		this.name = opts.name;
		this.size = opts.size;
		this.generationSettings = opts.generationSettings;
		this.generateAsteroids();
	}
}
