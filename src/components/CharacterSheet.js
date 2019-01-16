import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { characterLoad } from '../actions/character';

class CharacterSheet extends Component {
	static propTypes = {
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
		loadCharacter: PropTypes.func.isRequired,
	};

	componentWillMount = () => {
		const {
			loadCharacter,
		} = this.props;

		loadCharacter();
	}

	render() {
		const {
			character,
		} = this.props;

		const {
			name,
			element,
			attack,
			health,
			speed,
			defense,
			crit_chance,
			crit_damage,
			effectiveness,
			effect_res,
		} = character;

		return (
			<div>
				<h1>{name}</h1>
				<ul>
					<li>{`Element: ${element}`}</li>
					<li>{`Attack: ${attack}`}</li>
					<li>{`Health: ${health}`}</li>
					<li>{`Speed: ${speed}`}</li>
					<li>{`Defense: ${defense}`}</li>
					<li>{`Crit Chance: ${crit_chance}%`}</li>
					<li>{`Crit Damage: ${crit_damage}%`}</li>
					<li>{`Effectiveness: ${effectiveness}%`}</li>
					<li>{`Eff. Resistance: ${effect_res}%`}</li>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	character: state.character.data,
});

const mapDispatchToProps = {
	loadCharacter: () => characterLoad(),
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSheet);
