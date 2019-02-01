import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
		} = this.props;
		const {
			selfHealthPerc,
			soulburn,
			stacks,
			targetHealthPerc,
		} = configuration;

		return (
			<div>
				<ConfigurationValue
					label="Stacks"
					onChange={this.handleValueChange('stacks')}
					value={stacks}
				/>
				<ConfigurationValue
					label="Self Health %"
					onChange={this.handleValueChange('selfHealthPerc')}
					value={selfHealthPerc}
				/>
				<ConfigurationValue
					label="Target Health %"
					onChange={this.handleValueChange('targetHealthPerc')}
					value={targetHealthPerc}
				/>
				<ConfigurationOption
					checked={soulburn}
					label="Soulburned"
					onChange={this.handleCheck('soulburn')}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	configuration: state.configuration,
});

const mapDispatchToProps = dispatch => ({
	setConfiguration: (key, value) => dispatch(configurationSet(key, value)),
	clearConfiguration: () => dispatch(configurationClear),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationDisplay);
