import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Classes, ControlGroup, Dialog, HTMLSelect, NumericInput } from '@blueprintjs/core';

import { add, remove } from '../utils/misc';
import sets from '../data/sets.json';

class GearDialog extends Component {
  static propTypes = {
    data: PropTypes.shape({
      main: PropTypes.array,
      sub: PropTypes.array,
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    store: PropTypes.shape({
      dialogState: PropTypes.shape({}),
    }).isRequired,
    type: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const mainstat = props.data.main[0];
    const main = remove(props.data.main, props.data.main[0]);
    const sub = remove(props.data.sub, props.data.main[0]);
    const defaultSet = Object.keys(sets)[0];

    // i was incredibly lazy here and decided to save the dialog state directly into localStorage...
    // but it's probably less complex than reverse-engineering the true dialog state from the given
    // gear state. on the other hand, this makes loading from persisted state very easy!
    this.state = Object.assign(
      {
        mainpool: main,
        subpool: sub,
        stats: [mainstat], // the 0th index is the main stat
        values: new Array(5).fill(0),
        set: defaultSet,
      },
      props.store.dialogState // sorry pt.1
    );
  }

  addSubstat = () => {
    const { subpool, stats } = this.state;
    const nextSubstat = subpool[0]; // we only "add" substats from the sub pool

    if (stats.length < 5) {
      this.setState(prevState => ({
        mainpool: remove(prevState.mainpool, nextSubstat).sort(),
        subpool: remove(prevState.subpool, nextSubstat).sort(),
        stats: add(prevState.stats, nextSubstat),
      }));
    }
  };

  removeSubstat = idx => {
    const { stats } = this.state;
    const { data } = this.props;
    const removedSubstat = stats[idx];

    this.setState(prevState => ({
      subpool: add(prevState.subpool, removedSubstat).sort(),
      stats: remove(prevState.stats, removedSubstat),
    }));
    if (data.main.includes(removedSubstat)) {
      this.setState(prevState => ({
        mainpool: add(prevState.mainpool, removedSubstat).sort(),
      }));
    }
  };

  handleChange = index => e => {
    // this should only execute for right hand gear!
    const { mainpool, subpool, stats } = this.state;
    const { data } = this.props;
    const removedSubstat = stats[index];
    const nextSubstat = e.currentTarget.value;
    const newSubPool = remove(add(subpool, removedSubstat), nextSubstat).sort();
    const newMainPool = remove(add(mainpool, removedSubstat), nextSubstat).sort();
    const newSubstats = Object.assign([], stats, {
      [index]: nextSubstat,
    });

    this.setState({
      subpool: newSubPool,
      stats: newSubstats,
    });
    // only remove from the main stat pool if it was part of it to begin with
    if (data.main.includes(removedSubstat)) {
      this.setState({
        mainpool: newMainPool,
      });
    }
  };

  handleSets = e => {
    this.setState({
      set: e.target.value,
    });
  };

  handleValueChange = index => val => {
    const { values } = this.state;

    values[index] = val;
    this.setState({
      values,
    });
  };

  clear = () => {
    const { data } = this.props;
    const mainstat = data.main[0];
    const main = remove(data.main, data.main[0]);
    const sub = remove(data.sub, data.main[0]);

    this.setState({
      mainpool: main,
      subpool: sub,
      stats: [mainstat],
      values: new Array(5).fill(0),
    });
  };

  save = () => {
    const { onClose, onSave } = this.props;
    const { stats, values, set } = this.state;
    const gearData = stats.reduce((obj, key, idx) => ({ ...obj, [key]: values[idx] }), {});
    gearData.set = set;
    gearData.dialogState = this.state; // sorry pt.2, see above

    onSave(gearData);
    onClose();
  };

  render() {
    const { stats, mainpool, subpool, values, set } = this.state;
    const { isOpen, onClose, type } = this.props;
    const selectMainPool = add(mainpool, stats[0]).sort();

    return (
      <Dialog isOpen={isOpen} onClose={onClose} title={type}>
        <div className={Classes.DIALOG_BODY}>
          <ControlGroup>
            {selectMainPool.length > 1 ? (
              <HTMLSelect
                className="yuna-select"
                options={selectMainPool}
                onChange={this.handleChange(0)}
                value={stats[0]}
              />
            ) : (
              <HTMLSelect
                className="yuna-select"
                options={selectMainPool}
                onChange={this.handleChange(0)}
                value={stats[0]}
                disabled
              />
            )}
            <NumericInput
              clampValueOnBlur
              min={0}
              onValueChange={this.handleValueChange(0)}
              value={values[0]}
            />
            <Button icon="plus" onClick={this.addSubstat} />
          </ControlGroup>
          {stats.map(
            (substat, idx) =>
              idx > 0 && (
                <ControlGroup key={`${substat}group`}>
                  <HTMLSelect
                    className="yuna-select"
                    key={`${substat}select`}
                    options={add(subpool, substat).sort()}
                    onChange={this.handleChange(idx)}
                    value={substat}
                  />
                  <NumericInput
                    key={`${substat}input`}
                    clampValueOnBlur
                    min={0}
                    onValueChange={this.handleValueChange(idx)}
                    value={values[idx]}
                  />
                  <Button key={`${substat}add`} icon="plus" onClick={this.addSubstat} />
                  <Button
                    key={`${substat}minus`}
                    icon="minus"
                    onClick={() => this.removeSubstat(idx)}
                  />
                </ControlGroup>
              )
          )}
          <ControlGroup>
            <HTMLSelect
              className="yuna-select"
              options={Object.keys(sets)}
              onChange={this.handleSets}
              value={set}
            />
          </ControlGroup>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <ControlGroup>
            <Button onClick={this.clear}>Clear</Button>
            <Button onClick={this.save}>Save</Button>
          </ControlGroup>
        </div>
      </Dialog>
    );
  }
}

export default GearDialog;
