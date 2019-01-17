export function calculate(character, items) {
	// collect modifiers
	// const modifiers = {};

	// for item in items
	// put modifiers in

	// calculate flats and normal (eff, crit)
	// calculate multipliers
}

export function calculateDamage(character, skill) {
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

	// overall damage
	return (character.attack * skill.att_rate + flat) * mult * skill.pow * 1.871;
}
