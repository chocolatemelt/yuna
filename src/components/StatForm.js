import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	ControlGroup,
	FormGroup,
	Label,
	NumericInput,
} from '@blueprintjs/core';

class StatForm extends Component {
	static propTypes = {
	};

	constructor(props) {
		super(props);

		this.state = {
			attack: 0,
			health: 0,
			// speed: 0,
			// defense: 0,
			crit_chance: 0,
			crit_damage: 0,
			// effectiveness: 0,
			// effect_res: 0,
		};
	}

	handleStatChange = stat => (value) => {
		this.setState({
			[stat]: value,
		});
	}

	render() {
		const {
			attack,
			health,
			// speed,
			// defense,
			crit_chance,
			crit_damage,
			// effectiveness,
			// effect_res,
		} = this.state;

		return (
			<div style={{ width: '20%' }}>
				<p>pardon the bare minimal look.</p>
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
				</FormGroup>
			</div>
		);
	}
}

const mapDispatchToProps = {
};

export default connect(null, mapDispatchToProps)(StatForm);
