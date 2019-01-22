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

const isNamedStat = stat => (stat === 'crit_chance' || stat === 'crit_damage' || stat === 'effect_res');

/**
 * calculates final stats from base stats and gear modifiers
 * @param  Object stats     base character stats
 * @param  Object modifiers gear modifiers
 * @return Object           final stats
 */
export function calculateStats(stats, modifiers) {
	const ret = Object.assign({}, stats);
	Object.keys(modifiers).forEach((k) => {
		// this code sucks
		const namedStat = isNamedStat(k) ? k : k.split('_')[0];
		let result = modifiers[k];

		if (k.endsWith('mult')) {
			result = stats[namedStat] * (modifiers[k] / 100);
		}

		ret[namedStat] += result;
	});
	return ret;
}
