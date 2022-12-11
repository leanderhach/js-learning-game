import type { PopupNotification, PushNotification } from '../types/notifications';
import { get, writable } from 'svelte/store';

export const popup = writable<PopupNotification | null>();
export const push = writable<PushNotification[] | null>();

export function createPopupNotification(notification: PopupNotification) {
	popup.set(null);
	popup.set(notification);
}

export function createPushNotification(notification: PushNotification) {
	const existingPushNotifications = get(push);

	if (existingPushNotifications != null) {
		push.set([...existingPushNotifications, notification]);
	} else {
		push.set([notification]);
	}
}
