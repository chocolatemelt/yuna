import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Button,
	FormGroup,
} from '@blueprintjs/core';

import {
	configurationSet,
	configurationClear,
} from '../actions/configuration';
import ConfigurationOption from '../components/ConfigurationOption';
import ConfigurationValue from '../components/ConfigurationValue';

class ConfigurationDisplay extends Component {
	static propTypes = {
		configuration: PropTypes.shape({
			soulburn: PropTypes.bool,
		}).isRequired,
		setConfiguration: PropTypes.func.isRequired,
		clearConfiguration: PropTypes.func.isRequired,
	}

	handleCheck = key => (e) => {
		const {
			setConfiguration,
		} = this.props;

		setConfiguration(key, e.target.checked);
	}

	handleValueChange = key => (value) => {
		const {
			setConfiguration,
		} = this.props;

		setConfiguration(key, value);
	}

	render() {
		const {
			configuration,
			clearConfiguration,
		} = this.props;
		const {
			elementalAdvantage,
			rounding,
			selfHealthPerc,
			soulburn,
			stacks,
			targetDefense,
			targetHealthPerc,
			targetHealthCurrent,
			numTargets,
		} = configuration;

		return (
			<div>
				<FormGroup
					label="Configuration"
				>
					<ConfigurationValue
						label="Stacks"
						max={100}
						onChange={this.handleValueChange('stacks')}
						value={stacks}
					/>
					<ConfigurationValue
						label="Self Health %"
						max={100}
						onChange={this.handleValueChange('selfHealthPerc')}
						value={selfHealthPerc}
					/>
					<ConfigurationValue
						label="Target Health %"
						max={100}
						onChange={this.handleValueChange('targetHealthPerc')}
						value={targetHealthPerc}
					/>
					<ConfigurationValue
						label="Target Current Health"
						onChange={this.handleValueChange('targetHealthCurrent')}
						value={targetHealthCurrent}
					/>
					<ConfigurationValue
						label="Target Defense"
						onChange={this.handleValueChange('targetDefense')}
						value={targetDefense}
					/>
					<ConfigurationValue
						label="Number of Enemies"
						max={5}
						min={1}
						onChange={this.handleValueChange('numTargets')}
						value={numTargets}
					/>
					<ConfigurationOption
						checked={elementalAdvantage}
						label="Elemental Advantage"
						onChange={this.handleCheck('elementalAdvantage')}
					/>
					<ConfigurationOption
						checked={soulburn}
						label="Soulburned"
						onChange={this.handleCheck('soulburn')}
					/>
					<ConfigurationValue
						label="Rounding"
						max={5}
						onChange={this.handleValueChange('rounding')}
						value={rounding}
					/>
					<Button
						onClick={clearConfiguration}
					>
						Clear
					</Button>
				</FormGroup>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	configuration: state.configuration,
});

const mapDispatchToProps = dispatch => ({
	setConfiguration: (key, value) => dispatch(configurationSet(key, value)),
	clearConfiguration: () => dispatch(configurationClear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationDisplay);
