import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Classes,
	ControlGroup,
	FormGroup,
	Label,
	NumericInput,
	Tooltip,
} from '@blueprintjs/core';

import { characterSetStats } from '../actions/character';
import { getName } from '../utils/misc';

class StatForm extends Component {
	static propTypes = {
		set: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			attack: 0,
			health: 0,
			speed: 0,
			defense: 0,
			crit_chance: 0,
			crit_damage: 0,
			effectiveness: 0,
			effect_res: 0,
		};
	}

	handleStatChange = stat => (value) => {
		const {
			set,
		} = this.props;
		const change = {
			[stat]: value,
		};

		this.setState(change);
		set(change);
	}

	render() {
		const stats = this.state;

		return (
			<div style={{ width: '30%' }}>
				<FormGroup>
					<Tooltip
						className={Classes.TOOLTIP_INDICATOR}
						content="As a quick way to calculate DPS, you can directly add flat stats here."
					>
						<Label>Stat Sheet</Label>
					</Tooltip>
					{Object.keys(this.state).map(key => (
						<ControlGroup key={`statform${key}`}>
							<Label>{getName(key)}</Label>
							<NumericInput
								clampValueOnBlur
								min={0}
								onValueChange={this.handleStatChange(key)}
								value={stats[key]}
							/>
						</ControlGroup>
					))}
				</FormGroup>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	set: stats => dispatch(characterSetStats(stats)),
});

export default connect(null, mapDispatchToProps)(StatForm);
