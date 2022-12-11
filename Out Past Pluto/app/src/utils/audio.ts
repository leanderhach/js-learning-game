import { Howl, Howler } from 'howler';

export function playOneShot(clip: string) {
	const sound = new Howl({
		src: [clip]
	});

	sound.play();
}
