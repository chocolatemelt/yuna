import React from 'react';
import PropTypes from 'prop-types';

const CharacterSheet = ({ character, modifiers }) => (
	<div>
		<h1>{character.name}</h1>
		<ul>
			<li>{`Element: ${character.element}`}</li>
			<li>{`Attack: ${character.attack}`}</li>
			<li>{`Health: ${character.health}`}</li>
			<li>{`Speed: ${character.speed}`}</li>
			<li>{`Defense: ${character.defense}`}</li>
			<li>{`Crit Chance: ${character.crit_chance}%`}</li>
			<li>{`Crit Damage: ${character.crit_damage}%`}</li>
			<li>{`Effectiveness: ${character.effectiveness}%`}</li>
			<li>{`Eff. Resistance: ${character.effect_res}%`}</li>
		</ul>
		<ul>
			<li>{`Bonus Attack: ${modifiers.attack_flat}`}</li>
			<li>{`Bonus Attack %: ${modifiers.attack_mult}%`}</li>
			<li>{`Bonus Health: ${modifiers.health_flat}`}</li>
			<li>{`Bonus Health %: ${modifiers.health_mult}%`}</li>
			<li>{`Bonus Speed: ${modifiers.speed}`}</li>
			<li>{`Bonus Defense: ${modifiers.defense_flat}`}</li>
			<li>{`Bonus Defense %: ${modifiers.defense_mult}%`}</li>
			<li>{`Bonus Crit Chance: ${modifiers.crit_chance}%`}</li>
			<li>{`Bonus Crit Damage: ${modifiers.crit_damage}%`}</li>
			<li>{`Bonus Effectiveness: ${modifiers.effectiveness}%`}</li>
			<li>{`Bonus Eff. Resistance: ${modifiers.effect_res}%`}</li>
		</ul>
	</div>
);

CharacterSheet.propTypes = {
	character: PropTypes.shape({
		name: PropTypes.string,
		element: PropTypes.string,
		attack: PropTypes.number,
		health: PropTypes.number,
		speed: PropTypes.number,
		defense: PropTypes.number,
		crit_chance: PropTypes.number,
		crit_damage: PropTypes.number,
		effectiveness: PropTypes.number,
		effect_res: PropTypes.number,
	}).isRequired,
	modifiers: PropTypes.shape({
		attack_flat: PropTypes.number,
		attack_mult: PropTypes.number,
		health_flat: PropTypes.number,
		health_mult: PropTypes.number,
		speed: PropTypes.number,
		defense_flat: PropTypes.number,
		defense_mult: PropTypes.number,
		crit_chance: PropTypes.number,
		crit_damage: PropTypes.number,
		effect_res: PropTypes.number,
		effectiveness: PropTypes.number,
	}).isRequired,
};

export default CharacterSheet;
