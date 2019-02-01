/**
 * retrieves a misc_scaling object if it exists in the misc_scaling array, based on the name
 * property
 * @param  Object  skill skill
 * @param  String  scale misc_scaling name
 * @return Object        the misc_scaling object, if it exists
 */
function getMiscScaling(skill, scale) {
	if ('misc_scaling' in skill) {
		// there should only ever be one instance of a particular scaling modifier in misc_scaling
		const ret = skill.misc_scaling.filter(el => el.name === scale)[0];
		return (ret && ret.length === 0) ? false : ret;
	}
	return false;
}

/**
 * calculates damage given a character and a skill
 * @param  Object character
 * @param  Object skill
 * @param  Object configuration
 * @return Object                calculated total damage
 */
export function calculateDamage(character, skill, configuration) {
	// if empty skill (non-damaging), just return N/A
	if (!skill) return 'N/A';

	// calculate flat scaling, if applicable
	let flat = 0;
	if ('flat_scaling' in skill) {
		skill.flat_scaling.forEach((scaling) => {
			flat += scaling.scalar * character[scaling.stat];
		});
	}

	// calculate multiplicative scaling, if applicable
	let mult = 1;
	if ('mult_scaling' in skill) {
		skill.mult_scaling.forEach((scaling) => {
			mult *= scaling.scalar * character[scaling.stat];
		});
	}

	// overall base hit damage
	const hit = (character.attack * skill.att_rate + flat) * mult * skill.pow * 1.871;

	// calculate additional hitTypes
	const miss = hit * 0.75;
	const crush = hit * 1.3;

	// special crit modifier (currently limited to c.dominiel)
	let crit = hit * character.crit_damage / 100;
	const bonusCrit = getMiscScaling(skill, 'bonus_crit');
	if (bonusCrit) {
		crit *= 1 + bonusCrit.scalar;
	}

	return {
		miss,
		hit,
		crush,
		crit,
	};
}
