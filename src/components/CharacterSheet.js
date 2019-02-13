import React from 'react';
import PropTypes from 'prop-types';

import { statNames, getName } from '../utils/misc';

const CharacterSheet = ({ character, modifiers, rounding }) => (
  <div>
    <h1 className="yuna-character-name">{character.name}</h1>
    <ul className="yuna-character-sheet">
      {Object.keys(character).map(
        key =>
          Object.keys(statNames).includes(key) && (
            <li key={`base${key}`}>
              {`${getName(key)}: ${
                typeof character[key] === 'number'
                  ? Number.parseFloat(character[key].toFixed(rounding))
                  : character[key]
              }`}
            </li>
          )
      )}
    </ul>
    <ul className="yuna-character-sheet">
      {Object.keys(modifiers).map(
        key =>
          Object.keys(statNames).includes(key) && (
            <li key={`mod${key}`}>{`Bonus ${getName(key)}: ${modifiers[key]}`}</li>
          )
      )}
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
  rounding: PropTypes.number.isRequired,
};

export default CharacterSheet;
