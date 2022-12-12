export type OmitFunctions<T> = {
	[P in keyof T as T[P] extends Function ? never : P]: T[P];
};
