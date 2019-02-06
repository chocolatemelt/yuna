import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Button,
	ControlGroup,
	FormGroup,
	Label,
} from '@blueprintjs/core';

import {
	configurationSet,
	configurationClear,
} from '../actions/configuration';
import StatusDialog from '../components/StatusDialog';
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

	constructor(props) {
		super(props);

		this.state = {
			selfStatusDialog: false,
			targetStatusDialog: false,
		};
	}

	handleCheck = key => (e) => {
		const {
			setConfiguration,
		} = this.props;

		setConfiguration(key, e.target.checked);
	}

	handleSelfDialog = () => {
		this.setState(prevState => ({
			selfStatusDialog: !prevState.selfStatusDialog,
		}));
	}

	handleTargetDialog = () => {
		this.setState(prevState => ({
			targetStatusDialog: !prevState.targetStatusDialog,
		}));
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
			targetHealthMax,
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
						label="Target Max Health"
						onChange={this.handleValueChange('targetHealthMax')}
						value={targetHealthMax}
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
					<ControlGroup>
						<Label>Buffs / Debuffs</Label>
						<Button
							onClick={this.handleSelfDialog}
						>
							Self
						</Button>
						<Button
							onClick={this.handleTargetDialog}
						>
							Target
						</Button>
					</ControlGroup>
					<Button
						onClick={clearConfiguration}
					>
						Clear
					</Button>
				</FormGroup>
				<>
					<StatusDialog
						isOpen={this.state.selfStatusDialog}
						onClose={this.handleSelfDialog}
						onSave={e => console.log(e)}
						type="self"
					/>
					<StatusDialog
						isOpen={this.state.targetStatusDialog}
						onClose={this.handleTargetDialog}
						onSave={e => console.log(e)}
						type="xd"
					/>
				</>
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
