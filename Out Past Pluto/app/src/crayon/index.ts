import type { DisplayObject } from 'pixi.js';
import * as PIXI from 'pixi.js';
import type { Point } from 'src/types/point';

export type RenderObject = {
	_id: string;
	position: Point;
};

export type RenderableObject = {
	position: Point;
	size: number;
	_displayObject: DisplayObject;
};

export type UnRenderableObject = {
	position: Point;
	size: number;
};

export default class Crayon {
	canvas: PIXI.Application;
	drawCache: RenderableObject[][] = [[], [], []];
	currentCache = 0;

	drawLoop() {
		if (this.canvas) {
			// ---- DRAW LOOP ---- //
			this.canvas.ticker.add((delta) => {
				let cacheToRender = 0;

				// increment the render cache index
				if (this.currentCache < 2) {
					cacheToRender = this.currentCache;
					this.currentCache += 1;
				} else {
					cacheToRender = this.drawCache.length - 1;
					this.currentCache = 0;
				}

				for (const cachedObject of this.drawCache[cacheToRender]) {
					// try to find the child on the canvas. If not present, render it for the first time
					try {
						// the index of the display object on the canvas
						const canvasIndex = this.canvas.stage.getChildIndex(cachedObject._displayObject);

						// get the displayObject current painted on the canvas
						const canvasObject = this.canvas.stage.getChildAt(canvasIndex);

						if (canvasObject) {
							if (
								canvasObject.position.x != cachedObject.position.x ||
								canvasObject.position.y != cachedObject.position.y
							) {
								this.canvas.stage.removeChild(canvasObject);
								cachedObject._displayObject.position.x = cachedObject.position.x;
								cachedObject._displayObject.position.y = cachedObject.position.y;

								this.canvas.stage.addChild(cachedObject._displayObject);
							}
						}
					} catch (e) {
						this.canvas.stage.addChild(cachedObject._displayObject);
					}
				}

				// clear the cache
				this.drawCache[cacheToRender] = [];
			});
		}
	}

	makeObjectRenderable(obj: UnRenderableObject) {
		const newSprite = PIXI.Sprite.from(PIXI.Texture.WHITE);

		newSprite.position.x = obj.position.x;
		newSprite.position.y = obj.position.y;

		newSprite.height = obj.size;
		newSprite.width = obj.size;

		return newSprite;
	}

	drawOnce(obj: RenderableObject) {
		this.drawCache[this.currentCache].push(obj);
	}

	constructor(
		opts: Omit<
			Crayon,
			'drawLoop' | 'makeObjectRenderable' | 'drawOnce' | 'drawCache' | 'currentCache'
		>
	) {
		this.canvas = opts.canvas;
		this.drawLoop();
	}
}
