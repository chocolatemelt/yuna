import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Classes, Label, Tooltip } from '@blueprintjs/core';

import {
  calculateReduction,
  calculateEHP,
  calculateDPT,
  calculateTDO,
} from '../utils/calculations';

class CalculationsDisplay extends Component {
  static propTypes = {
    character: PropTypes.shape({}).isRequired,
    skills: PropTypes.shape({
      s1: PropTypes.oneOfType([
        PropTypes.shape({
          miss: PropTypes.number,
          hit: PropTypes.number,
          crush: PropTypes.number,
          crit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
        PropTypes.string,
      ]),
      s2: PropTypes.oneOfType([
        PropTypes.shape({
          miss: PropTypes.number,
          hit: PropTypes.number,
          crush: PropTypes.number,
          crit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
        PropTypes.string,
      ]),
      s3: PropTypes.oneOfType([
        PropTypes.shape({
          miss: PropTypes.number,
          hit: PropTypes.number,
          crush: PropTypes.number,
          crit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
        PropTypes.string,
      ]),
    }).isRequired,
    rounding: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      dpt: 0,
      tdo: 0,
      ehp: 0,
      reduction: 0,
    };
  }

  componentWillReceiveProps = nextProps => {
    const { character, skills } = nextProps;
    const dpt = calculateDPT(character, skills);

    this.setState({
      dpt,
      tdo: calculateTDO(character, dpt),
      ehp: calculateEHP(character),
      reduction: calculateReduction(character),
    });
  };

  render() {
    const { rounding } = this.props;
    const { dpt, tdo, ehp, reduction } = this.state;

    return (
      <>
        <Tooltip className={Classes.TOOLTIP_INDICATOR} content="Other interesting calculations.">
          <Label>Calculations</Label>
        </Tooltip>
        <div>
          <p>
            <Tooltip
              className={Classes.TOOLTIP_INDICATOR}
              content="Estimated damage per turn given optimal skill usage."
            >
              <span>Damage per turn estimate:</span>
            </Tooltip>
            &nbsp;
            {Number.parseFloat(dpt.toFixed(rounding))}
          </p>
          <p>
            <Tooltip
              className={Classes.TOOLTIP_INDICATOR}
              content="Estimated total damage output based on speed and combat readiness."
            >
              <span>Total damage output estimate:</span>
            </Tooltip>
            &nbsp;
            {Number.parseFloat(tdo.toFixed(rounding))}
          </p>
          <p>
            <span>Damage Reduction</span>
            &nbsp;
            {`${Number.parseFloat(((1 - reduction) * 100).toFixed(rounding))}%`}
          </p>
          <p>
            <span>Effective health:</span>
            &nbsp;
            {Number.parseFloat(ehp.toFixed(rounding))}
          </p>
        </div>
      </>
    );
  }
}

export default CalculationsDisplay;
