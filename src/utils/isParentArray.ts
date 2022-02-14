export function isParentArray(parent: string[], child: string[]) {
	for (var c of child) {
		if (!parent.includes(c)) {
			return false;
		}
	}
	return true;
}
