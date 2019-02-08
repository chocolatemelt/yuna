import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ControlGroup,
  Dialog,
  HTMLSelect
  // NumericInput,
} from '@blueprintjs/core';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { add, remove } from '../utils/misc';
import buffData from '../data/buffs.json';
import debuffData from '../data/debuffs.json';

class StatusDialog extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const buffList = Object.keys(buffData).sort();
    const debuffList = Object.keys(debuffData).sort();

    this.state = {
      buffs: [],
      debuffs: [],
      burn: 0,
      bleed: 0,
      poison: 0,
      total: 0,
      buffList,
      debuffList,
      buffpool: buffList,
      debuffpool: debuffList
    };
  }

  addBuff = () => {
    const { buffpool, total } = this.state;
    if (buffpool.length > 0 && total < 10) {
      const nextBuff = buffpool[0]; // only the remaining buffs from the buff pool

      this.setState(prevState => ({
        buffpool: remove(prevState.buffpool, nextBuff).sort(),
        buffs: add(prevState.buffs, nextBuff),
        total: prevState.total + 1
      }));
    }
  };

  addDebuff = () => {
    const { debuffpool, total } = this.state;
    if (debuffpool.length > 0 && total < 10) {
      const nextDebuff = debuffpool[0]; // only the remaining buffs from the buff pool

      this.setState(prevState => ({
        debuffpool: remove(prevState.debuffpool, nextDebuff).sort(),
        debuffs: add(prevState.debuffs, nextDebuff),
        total: prevState.total + 1
      }));
    }
  };

  removeBuff = idx => {
    const { buffs } = this.state;
    const removedBuff = buffs[idx];

    this.setState(prevState => ({
      buffpool: add(prevState.buffpool, removedBuff).sort(),
      buffs: remove(prevState.buffs, removedBuff),
      total: prevState.total - 1
    }));
  };

  removeDebuff = idx => {
    const { debuffs } = this.state;
    const removedDebuff = debuffs[idx];

    this.setState(prevState => ({
      debuffpool: add(prevState.debuffpool, removedDebuff).sort(),
      debuffs: remove(prevState.debuffs, removedDebuff),
      total: prevState.total - 1
    }));
  };

  handleBuffChange = index => e => {
    // this should only execute for right hand gear!
    const { buffpool, buffs } = this.state;
    const removedBuff = buffs[index];
    const nextBuff = e.currentTarget.value;
    const newBuffPool = remove(add(buffpool, removedBuff), nextBuff);
    const newBuffs = Object.assign([], buffs, {
      [index]: nextBuff
    });

    this.setState({
      buffs: newBuffs,
      buffpool: newBuffPool
    });
  };

  handleDebuffChange = index => e => {
    // this should only execute for right hand gear!
    const { debuffpool, debuffs } = this.state;
    const removedDebuff = debuffs[index];
    const nextDebuff = e.currentTarget.value;
    const newDebuffPool = remove(add(debuffpool, removedDebuff), nextDebuff);
    const newDebuffs = Object.assign([], debuffs, {
      [index]: nextDebuff
    });

    this.setState({
      debuffs: newDebuffs,
      debuffpool: newDebuffPool
    });
  };

  // handleValueChange = index => (val) => {
  // 	const {
  // 		values,
  // 	} = this.state;
  //
  // 	values[index] = val;
  // 	this.setState({
  // 		values,
  // 	});
  // }

  clear = () => {
    this.setState(prevState => ({
      buffs: [],
      debuffs: [],
      burn: 0,
      bleed: 0,
      poison: 0,
      total: 0,
      buffpool: prevState.buffList,
      debuffpool: prevState.debuffList
    }));
  };

  save = () => {
    const { onClose, onSave } = this.props;
    const { buffs, debuffs, burn, bleed, poison, total } = this.state;

    onSave({
      buffs,
      debuffs,
      burn,
      bleed,
      poison,
      total
    });
    onClose();
  };

  render() {
    const { buffs, debuffs, buffpool, debuffpool } = this.state;

    const { isOpen, onClose, type } = this.props;

    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title={type === 'self' ? 'Self Statuses' : 'Target Statuses'}
      >
        <Grid fluid>
          <Row>
            <Col xs>
              <p>Buffs</p>
              <ControlGroup>
                <Button icon="plus" onClick={this.addBuff} />
              </ControlGroup>
              {buffs.map((buff, idx) => (
                <ControlGroup key={`${buff}group`}>
                  <HTMLSelect
                    key={`${buff}select`}
                    options={add(buffpool, buff).sort()}
                    onChange={this.handleBuffChange(idx)}
                    value={buff}
                  />
                  <Button key={`${buff}minus`} icon="minus" onClick={() => this.removeBuff(idx)} />
                </ControlGroup>
              ))}
            </Col>
            <Col xs>
              <p>Debuffs</p>
              <ControlGroup>
                <Button icon="plus" onClick={this.addDebuff} />
              </ControlGroup>
              {debuffs.map((debuff, idx) => (
                <ControlGroup key={`${debuff}group`}>
                  <HTMLSelect
                    key={`${debuff}select`}
                    options={add(debuffpool, debuff).sort()}
                    onChange={this.handleDebuffChange(idx)}
                    value={debuff}
                  />
                  <Button
                    key={`${debuff}minus`}
                    icon="minus"
                    onClick={() => this.removeDebuff(idx)}
                  />
                </ControlGroup>
              ))}
            </Col>
          </Row>
          <Row>
            <Col xs>
              <ControlGroup>
                <Button onClick={this.clear}>Clear</Button>
                <Button onClick={this.save}>Save</Button>
              </ControlGroup>
            </Col>
          </Row>
        </Grid>
      </Dialog>
    );
  }
}

export default StatusDialog;
