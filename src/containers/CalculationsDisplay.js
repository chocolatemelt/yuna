import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Classes, Dialog, Label, Tooltip } from '@blueprintjs/core';

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
      dptDialog: false,
      tdoDialog: false,
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

  handleDialog = dialogName => {
    const key = `${dialogName}Dialog`;

    this.setState(prevState => ({
      [key]: !prevState[key],
    }));
  };

  render() {
    const { rounding } = this.props;
    const { dpt, tdo, ehp, reduction, dptDialog, tdoDialog } = this.state;

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
            <button
              className="btn btn-link yuna-more-info"
              onClick={() => this.handleDialog('dpt')}
              type="button"
            >
              what's this?
            </button>
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
            <button
              className="btn btn-link yuna-more-info"
              onClick={() => this.handleDialog('tdo')}
              type="button"
            >
              what's this?
            </button>
          </p>
          <p>
            <span>Damage Reduction</span>
            &nbsp;
            {`${Number.parseFloat(((1 - reduction) * 100).toFixed(rounding))}%`}
          </p>
          <p>
            <span>Effective Health:</span>
            &nbsp;
            {Number.parseFloat(ehp.toFixed(rounding))}
          </p>
        </div>
        <Dialog
          isOpen={dptDialog}
          onClose={() => this.handleDialog('dpt')}
          title="How is damage per turn calculated?"
        >
          <div className={Classes.DIALOG_BODY}>xd</div>
        </Dialog>
        <Dialog
          isOpen={tdoDialog}
          onClose={() => this.handleDialog('tdo')}
          title="How is total damage output calculated?"
        >
          <div className={Classes.DIALOG_BODY}>xd</div>
        </Dialog>
      </>
    );
  }
}

export default CalculationsDisplay;
