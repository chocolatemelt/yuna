import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	ControlGroup,
	FormGroup,
	Label,
	NumericInput,
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
		return (
			<div style={{ width: '30%' }}>
				<p>put in the values in orange on your character below</p>
				<FormGroup
					label="Stat Sheet"
				>
					{Object.keys(this.state).map(key => (
						<ControlGroup>
							<Label>{getName(key)}</Label>
							<NumericInput
								clampValueOnBlur
								min={0}
								onValueChange={this.handleStatChange(key)}
								value={this.state[key]}
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
