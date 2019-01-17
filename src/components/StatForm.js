import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	ControlGroup,
	FormGroup,
	Label,
	NumericInput,
} from '@blueprintjs/core';

import { setStats } from '../actions/character';

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
		const {
			attack,
			health,
			speed,
			defense,
			crit_chance,
			crit_damage,
			effectiveness,
			effect_res,
		} = this.state;

		return (
			<div style={{ width: '30%' }}>
				<p>put in the values in orange on your character below</p>
				<FormGroup
					label="Stat Sheet"
				>
					<ControlGroup>
						<Label>Attack</Label>
						<NumericInput
							onValueChange={this.handleStatChange('attack')}
							value={attack}
						/>
					</ControlGroup>
					<ControlGroup>
						<Label>Health</Label>
						<NumericInput
							onValueChange={this.handleStatChange('health')}
							value={health}
						/>
					</ControlGroup>
					<ControlGroup>
						<Label>Speed</Label>
						<NumericInput
							onValueChange={this.handleStatChange('speed')}
							value={speed}
						/>
					</ControlGroup>
					<ControlGroup>
						<Label>Defense</Label>
						<NumericInput
							onValueChange={this.handleStatChange('defense')}
							value={defense}
						/>
					</ControlGroup>
					<ControlGroup>
						<Label>Crit Chance %</Label>
						<NumericInput
							onValueChange={this.handleStatChange('crit_chance')}
							value={crit_chance}
						/>
					</ControlGroup>
					<ControlGroup>
						<Label>Crit Damage %</Label>
						<NumericInput
							onValueChange={this.handleStatChange('crit_damage')}
							value={crit_damage}
						/>
					</ControlGroup>
					<ControlGroup>
						<Label>Effectiveness %</Label>
						<NumericInput
							onValueChange={this.handleStatChange('effectiveness')}
							value={effectiveness}
						/>
					</ControlGroup>
					<ControlGroup>
						<Label>Effect Resistance %</Label>
						<NumericInput
							onValueChange={this.handleStatChange('effect_res')}
							value={effect_res}
						/>
					</ControlGroup>
				</FormGroup>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	set: stats => dispatch(setStats(stats)),
});

export default connect(null, mapDispatchToProps)(StatForm);
