import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SkillDamageDisplay from '../components/SkillDamageDisplay';
import calculateDamage from '../utils/calculations';

class SkillDisplay extends Component {
	static propTypes = {
		configuration: PropTypes.shape({}).isRequired,
		data: PropTypes.shape({
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
			s1: {},
			s2: {},
			s3: {},
		};
	}

	componentWillReceiveProps = (nextProps) => {
		const {
			configuration,
			data,
		} = nextProps;

		const {
			s1,
			s2,
			s3,
		} = data;

		this.setState({
			s1: calculateDamage(data, s1, configuration),
			s2: calculateDamage(data, s2, configuration),
			s3: calculateDamage(data, s3, configuration),
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
				<SkillDamageDisplay
					damageCalc={s1}
					name="s1"
				/>
				<SkillDamageDisplay
					damageCalc={s2}
					name="s2"
				/>
				<SkillDamageDisplay
					damageCalc={s3}
					name="s3"
				/>
			</div>
		);
	}
}

export default SkillDisplay;
