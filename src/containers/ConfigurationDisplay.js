import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
	configurationSet,
	configurationClear,
} from '../actions/configuration';
import ConfigurationOption from '../components/ConfigurationOption';

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

	render() {
		const {
			configuration,
		} = this.props;
		const {
			soulburn,
		} = configuration;

		return (
			<div>
				<ConfigurationOption
					checked={soulburn}
					label="Soulburned"
					onChange={this.handleCheck('soulburn')}
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
