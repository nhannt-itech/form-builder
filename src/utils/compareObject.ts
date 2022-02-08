export function CompareObjects(object1: any, object2: any) {
	const keysObject1 = Object.keys(object1);
	const keysObject2 = Object.keys(object2);

	if (keysObject1.length !== keysObject2.length) {
		return false;
	}

	for (var key of keysObject1) {
		const value1 = object1[key];
		const value2 = object2[key];
		const areObjects = isObject(value1) && isObject(value2);
		if ((areObjects && !CompareObjects(value1, value2)) || (!areObjects && value1 !== value2)) {
			return false;
		}
	}

	return true;
}

function isObject(object: any) {
	return typeof object === "object" && object !== null;
}
