import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Classes, ControlGroup, FormGroup, Label, NumericInput, Tooltip } from '@blueprintjs/core';

import { characterSetStats } from '../actions/character';
import { getName } from '../utils/misc';

class StatForm extends Component {
  static propTypes = {
    set: PropTypes.func.isRequired,
    stats: PropTypes.shape({}).isRequired,
  };

  handleStatChange = stat => value => {
    const { set } = this.props;
    const change = {
      [stat]: value,
    };

    set(change);
  };

  render() {
    const { stats } = this.props;

    return (
      <div style={{ width: '30%' }}>
        <FormGroup>
          <Tooltip
            className={Classes.TOOLTIP_INDICATOR}
            content="As a quick way to calculate DPS, you can directly add flat stats here."
          >
            <Label>Stat Sheet</Label>
          </Tooltip>
          {Object.keys(stats).map(key => (
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

const mapStateToProps = state => ({
  stats: state.character.stats,
});

const mapDispatchToProps = dispatch => ({
  set: stats => dispatch(characterSetStats(stats)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatForm);
