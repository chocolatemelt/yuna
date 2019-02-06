import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	ControlGroup,
	Dialog,
	HTMLSelect,
	// NumericInput,
} from '@blueprintjs/core';

import { add, remove } from '../utils/misc';
import buffData from '../data/buffs.json';
import debuffData from '../data/debuffs.json';

class StatusDialog extends Component {
	static propTypes = {
		isOpen: PropTypes.bool.isRequired,
		onClose: PropTypes.func.isRequired,
		type: PropTypes.string.isRequired,
		onSave: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		const buffList = Object.keys(buffData).sort();
		const debuffList = Object.keys(debuffData).sort();

		this.state = {
			buffs: [],
			debuffs: [],
			buffList,
			debuffList,
			buffpool: buffList,
			debuffpool: debuffList,
		};
	}

	addBuff = () => {
		const {
			buffpool,
		} = this.state;
		if (buffpool.length > 0) {
			const nextBuff = buffpool[0]; // only the remaining buffs from the buff pool

			this.setState(prevState => ({
				buffpool: remove(prevState.buffpool, nextBuff).sort(),
				buffs: add(prevState.buffs, nextBuff),
			}));
		}
	}

	removeBuff = (idx) => {
		const {
			buffs,
		} = this.state;
		const removeBuff = buffs[idx];

		this.setState(prevState => ({
			buffpool: add(prevState.buffpool, removeBuff).sort(),
			buffs: remove(prevState.buffs, removeBuff),
		}));
	}

	handleChange = index => (e) => {
		// this should only execute for right hand gear!
		const {
			buffpool,
			buffs,
		} = this.state;
		const removedBuff = buffs[index];
		const nextBuff = e.currentTarget.value;
		const newBuffPool = remove(add(buffpool, removedBuff), nextBuff).sort();
		const newBuffs = remove(add(buffs, nextBuff), removedBuff).sort();

		this.setState({
			buffs: newBuffs,
			buffpool: newBuffPool,
		});
	}

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
			buffpool: prevState.buffList,
			debuffpool: prevState.debuffList,
		}));
	}

	save = () => {
		const {
			onClose,
			onSave,
		} = this.props;
		const {
			buffs,
		} = this.state;

		onSave(buffs);
		onClose();
	}

	render() {
		const {
			buffs,
			buffpool,
			buffList,
		} = this.state;

		const {
			isOpen,
			onClose,
			type,
		} = this.props;

		return (
			<Dialog
				isOpen={isOpen}
				onClose={onClose}
				title={(type === 'self') ? 'Self Statuses' : 'Target Statuses'}
			>
				<ControlGroup>
					<Button
						icon="plus"
						onClick={this.addBuff}
					/>
				</ControlGroup>
				{buffs.map((buff, idx) => (
					<ControlGroup key={`${buff}group`}>
						<HTMLSelect
							key={`${buff}select`}
							options={add(buffpool, buff).sort()}
							onChange={this.handleChange(idx)}
							value={buff}
						/>
						{buffpool.length > 0 && (
							<Button
								key={`${buff}add`}
								icon="plus"
								onClick={this.addBuff}
							/>
						)}
						<Button
							key={`${buff}minus`}
							icon="minus"
							onClick={() => this.removeBuff(idx)}
						/>
					</ControlGroup>
				))}
				<ControlGroup>
					<Button
						onClick={this.clear}
					>
						Clear
					</Button>
					<Button
						onClick={this.save}
					>
						Save
					</Button>
				</ControlGroup>
			</Dialog>
		);
	}
}

export default StatusDialog;
