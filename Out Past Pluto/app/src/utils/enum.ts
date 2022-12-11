export default function createEnum(values: (string | number)[]) {
	const enumObject = {};
	for (const val of values) {
		enumObject[val] = val;
	}
	return Object.freeze(enumObject);
}
