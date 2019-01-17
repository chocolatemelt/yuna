import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { calculateDamage } from '../utils/calculations';

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
	};

	constructor(props) {
		super(props);

		this.state = {
			s1: 0,
			s2: 0,
			s3: 0,
		};
	}

	componentWillReceiveProps = (nextProps) => {
		const {
			character,
		} = nextProps;

		const {
			s1,
			s2,
			s3,
		} = character;

		this.setState({
			s1: calculateDamage(character, s1),
			s2: calculateDamage(character, s2),
			s3: calculateDamage(character, s3),
		});
	}

	render() {
		const {
			s1,
			s2,
			s3,
		} = this.state;

		return (
			<div>
				<ul>
					<li>{`s1: ${s1}`}</li>
					<li>{`s2: ${s2}`}</li>
					<li>{`s3: ${s3}`}</li>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	character: state.character.data,
});

export default connect(mapStateToProps)(CharacterSheet);
