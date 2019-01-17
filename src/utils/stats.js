export const base = {
	attack: 0,
	health: 0,
	speed: 0,
	defense: 0,
	crit_chance: 0,
	crit_damage: 0,
	effectiveness: 0,
	effect_res: 0,
};

/**
 * add two stat objects together
 * @param Object s1
 * @param Object s2
 */
export function add(s1, s2) {
	// shallow reduce since we're only concerned with numbers
	const ret = Object.assign({}, s1);
	Object.keys(s1).forEach((k) => {
		if (Object.prototype.hasOwnProperty.call(s2, k)) {
			ret[k] = (s1[k] || 0) + s2[k];
		}
	});
	return ret;
}
