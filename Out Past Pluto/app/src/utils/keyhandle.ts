import { gameState } from '../store';
import { get } from 'svelte/store';

function handleEscape() {
	if (get(gameState) === 3) {
		gameState.set(4);
	} else if (get(gameState) === 4) {
		gameState.set(3);
	}
}

export function keyPressHandler(keyEvent: KeyboardEvent & { currentTarget: EventTarget & Window }) {
	const key = keyEvent.key;

	switch (key) {
		case 'Escape':
			handleEscape();
			break;
	}
}
