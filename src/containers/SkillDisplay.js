import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { calculateDamage } from '../utils/calculations';

class SkillDisplay extends Component {
	static propTypes = {
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
			s1: 0,
			s2: 0,
			s3: 0,
		};
	}

	componentWillReceiveProps = (nextProps) => {
		const {
			data,
		} = nextProps;

		const {
			s1,
			s2,
			s3,
		} = data;

		this.setState({
			s1: calculateDamage(data, s1),
			s2: calculateDamage(data, s2),
			s3: calculateDamage(data, s3),
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

export default SkillDisplay;
