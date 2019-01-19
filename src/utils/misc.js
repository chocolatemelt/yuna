export function add(a, e) {
	return a.concat([e]);
}

export function remove(a, e) {
	return a.filter(el => el !== e);
}
