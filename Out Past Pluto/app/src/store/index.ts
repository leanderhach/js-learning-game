import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

// Game States
/*
0 - Entrance Screen
1 - Main Menu
2 - Loading
3 - Playing
4 - Paused
*/

export const gameState = writable<number>(0);
export const userStore = writable<null | User>(null);
