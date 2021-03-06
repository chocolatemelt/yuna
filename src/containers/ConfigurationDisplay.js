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
      soulburn: PropTypes.bool,
    }).isRequired,
    setConfiguration: PropTypes.func.isRequired,
    clearConfiguration: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      selfStatusDialog: false,
      targetStatusDialog: false,
    };
  }

  handleCheck = key => e => {
    const { setConfiguration } = this.props;

    setConfiguration(key, e.target.checked);
  };

  handleSelfDialog = () => {
    this.setState(prevState => ({
      selfStatusDialog: !prevState.selfStatusDialog,
    }));
  };

  handleTargetDialog = () => {
    this.setState(prevState => ({
      targetStatusDialog: !prevState.targetStatusDialog,
    }));
  };

  handleValueChange = key => value => {
    const { setConfiguration } = this.props;

    setConfiguration(key, value);
  };

  render() {
    const { configuration, clearConfiguration } = this.props;
    const {
      self,
      target,
      elementalAdvantage,
      rounding,
      selfHealthPerc,
      soulburn,
      stacks,
      targetDefense,
      targetHealthPerc,
      targetHealthMax,
      lunaMultiHit,
      numTargets,
    } = configuration;
    const { selfStatusDialog, targetStatusDialog } = this.state;

    return (
      <div>
        <FormGroup>
          <Label>Configuration</Label>
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
            majorStepSize={1000}
            minorStepSize={10}
            onChange={this.handleValueChange('targetHealthMax')}
            stepSize={100}
            value={targetHealthMax}
          />
          <ConfigurationValue
            description="As a quick endgame estimate, Wyvern 11 boss has about 1260."
            label="Target Defense"
            majorStepSize={100}
            minorStepSize={1}
            onChange={this.handleValueChange('targetDefense')}
            stepSize={10}
            value={targetDefense}
          />
          <ConfigurationValue
            description="Luna's S1 has a multihit att_rate modifier, which goes up with the number of attacks."
            label="Luna Multihit"
            max={3}
            min={1}
            onChange={this.handleValueChange('lunaMultiHit')}
            value={lunaMultiHit}
          />
          <ConfigurationValue
            label="Number of Enemies"
            max={5}
            min={1}
            onChange={this.handleValueChange('numTargets')}
            value={numTargets}
          />
          <ConfigurationValue
            description="Everything is rounded in post. This doesn't affect calculations."
            label="Rounding"
            max={5}
            onChange={this.handleValueChange('rounding')}
            value={rounding}
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
          <ControlGroup>
            <div className="yuna-form-label">
              <Tooltip
                className={Classes.TOOLTIP_INDICATOR}
                content="Statuses cover both buffs and debuffs. You can have a maximum of 10 at a time."
              >
                <Label>Statuses</Label>
              </Tooltip>
            </div>
            <ControlGroup>
              <Button onClick={this.handleSelfDialog}>Self</Button>
              <Button onClick={this.handleTargetDialog}>Target</Button>
            </ControlGroup>
          </ControlGroup>
          <Button onClick={clearConfiguration}>Clear</Button>
        </FormGroup>
        <>
          <StatusDialog
            isOpen={selfStatusDialog}
            onClose={this.handleSelfDialog}
            onSave={this.handleValueChange('self')}
            store={self}
            type="self"
          />
          <StatusDialog
            isOpen={targetStatusDialog}
            onClose={this.handleTargetDialog}
            onSave={this.handleValueChange('target')}
            store={target}
            type="target"
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigurationDisplay);
