import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Label, Classes, Tooltip } from '@blueprintjs/core';

import { updateGear, gearClearAll } from '../actions/gear';
import GearDialog from '../components/GearDialog';
import data from '../data/gear.json';

class GearDisplay extends Component {
  static propTypes = {
    clearAllGear: PropTypes.func.isRequired,
    gear: PropTypes.shape({}).isRequired,
    setGear: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: {
        weapon: false,
        helmet: false,
        armor: false,
        necklace: false,
        ring: false,
        boots: false,
      },
    };
  }

  handleDialogFor = gear => {
    this.setState(prevState => ({
      dialogOpen: Object.assign(prevState.dialogOpen, {
        [gear]: !prevState.dialogOpen[gear],
      }),
    }));
  };

  render() {
    const { gear, setGear, clearAllGear } = this.props;
    const { dialogOpen } = this.state;

    return (
      <div className="yuna-gear">
        <Tooltip
          className={Classes.TOOLTIP_INDICATOR}
          content="Gear is calculated on base stats alone; stat sheet is treated as flat bonuses."
        >
          <Label>Gear</Label>
        </Tooltip>
        <div>
          {Object.keys(data).map(key => (
            <Fragment key={`${key}group`}>
              <GearDialog
                key={`${key}dialog`}
                isOpen={dialogOpen[key]}
                onClose={() => this.handleDialogFor(key)}
                onSave={e => setGear(key, e)}
                store={gear[key]}
                type={key}
                data={data[key]}
              />
              <Button key={`${key}button`} onClick={() => this.handleDialogFor(key)}>
                {key}
              </Button>
            </Fragment>
          ))}
        </div>
        <Button onClick={clearAllGear}>Clear All</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gear: state.gear,
});

const mapDispatchToProps = dispatch => ({
  setGear: (gear, stats) => dispatch(updateGear(gear, stats)),
  clearAllGear: () => dispatch(gearClearAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GearDisplay);
