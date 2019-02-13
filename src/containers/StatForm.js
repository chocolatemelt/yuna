import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Classes,
  ControlGroup,
  FormGroup,
  Label,
  NumericInput,
  Tooltip,
} from '@blueprintjs/core';

import { characterSetStats, characterStatsClearAll } from '../actions/character';
import { getName } from '../utils/misc';

class StatForm extends Component {
  static propTypes = {
    clearAll: PropTypes.func.isRequired,
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
    const { clearAll, stats } = this.props;

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
          <Button onClick={clearAll}>Clear</Button>
        </FormGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stats: state.character.stats,
});

const mapDispatchToProps = dispatch => ({
  clearAll: () => dispatch(characterStatsClearAll()),
  set: stats => dispatch(characterSetStats(stats)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatForm);
