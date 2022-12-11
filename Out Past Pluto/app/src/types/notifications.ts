/* eslint-disable @typescript-eslint/ban-types */

export type NotificationButton = {
	text: string;
	action: Function | string;
};

export type PopupNotification = {
	title: string;
	message: string;
	buttons: NotificationButton[];
};

export type PushNotification = {
	title: string;
	message: string;
	icon: string;
};
