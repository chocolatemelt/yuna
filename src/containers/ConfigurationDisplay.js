import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ConfigurationOption from '../components/ConfigurationOption';

class ConfigurationDisplay extends Component {
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
			s1: {},
			s2: {},
			s3: {},
		};
	}

	render() {
		return (
			<div>
				<ConfigurationOption checked={false} label="xd" />
			</div>
		);
	}
}

export default ConfigurationDisplay;
