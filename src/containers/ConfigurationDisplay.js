import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Classes, ControlGroup, FormGroup, Label, Tooltip } from '@blueprintjs/core';

import { configurationSet, configurationClear } from '../actions/configuration';
import StatusDialog from '../components/StatusDialog';
import ConfigurationOption from '../components/ConfigurationOption';
import ConfigurationValue from '../components/ConfigurationValue';

class ConfigurationDisplay extends Component {
  static propTypes = {
    configuration: PropTypes.shape({
      soulburn: PropTypes.bool
    }).isRequired,
    setConfiguration: PropTypes.func.isRequired,
    clearConfiguration: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      selfStatusDialog: false,
      targetStatusDialog: false
    };
  }

  handleCheck = key => e => {
    const { setConfiguration } = this.props;

    setConfiguration(key, e.target.checked);
  };

  handleSelfDialog = () => {
    this.setState(prevState => ({
      selfStatusDialog: !prevState.selfStatusDialog
    }));
  };

  handleTargetDialog = () => {
    this.setState(prevState => ({
      targetStatusDialog: !prevState.targetStatusDialog
    }));
  };

  handleValueChange = key => value => {
    const { setConfiguration } = this.props;

    setConfiguration(key, value);
  };

  render() {
    const { configuration, clearConfiguration } = this.props;
    const {
      elementalAdvantage,
      rounding,
      selfHealthPerc,
      soulburn,
      stacks,
      targetDefense,
      targetHealthPerc,
      targetHealthMax,
      numTargets
    } = configuration;
    const { selfStatusDialog, targetStatusDialog } = this.state;

    return (
      <div>
        <FormGroup label="Configuration">
          <ConfigurationValue
            description="Miscellaneous stacking modifier for characters such as C. Dominiel."
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
            description="As a quick endgame estimate, Wyvern 11 boss has about 1260."
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
            <Tooltip
              className={Classes.TOOLTIP_INDICATOR}
              content="Statuses cover both buffs and debuffs. You can have a maximum of 10 at a time."
            >
              <Label>Statuses</Label>
            </Tooltip>
            <Button onClick={this.handleSelfDialog}>Self</Button>
            <Button onClick={this.handleTargetDialog}>Target</Button>
          </ControlGroup>
          <Button onClick={clearConfiguration}>Clear</Button>
        </FormGroup>
        <>
          <StatusDialog
            isOpen={selfStatusDialog}
            onClose={this.handleSelfDialog}
            onSave={this.handleValueChange('self')}
            type="self"
          />
          <StatusDialog
            isOpen={targetStatusDialog}
            onClose={this.handleTargetDialog}
            onSave={this.handleValueChange('target')}
            type="xd"
          />
        </>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  configuration: state.configuration
});

const mapDispatchToProps = dispatch => ({
  setConfiguration: (key, value) => dispatch(configurationSet(key, value)),
  clearConfiguration: () => dispatch(configurationClear())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationDisplay);
