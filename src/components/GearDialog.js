import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	ControlGroup,
	Dialog,
	HTMLSelect,
	NumericInput,
} from '@blueprintjs/core';

import { add, remove } from '../utils/misc';

class GearDialog extends Component {
	static propTypes = {
		data: PropTypes.shape({}).isRequired,
		isOpen: PropTypes.bool.isRequired,
		onClose: PropTypes.func.isRequired,
		type: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);

		const main = remove(props.data.main, props.data.main[0]);

		this.state = {
			pool: main.concat(props.data.sub),
			substats: [],
		};
	}

	addSubstat = () => {
		const {
			pool,
			substats,
		} = this.state;

		const nextSubstat = pool[0];
		if (substats.length < 4) {
			this.setState(prevState => ({
				pool: remove(prevState.pool, nextSubstat),
				substats: add(prevState.substats, nextSubstat),
			}));
		}
	}

	handleChange = index => (e) => {
		const {
			pool,
			substats,
		} = this.state;

		const removedSubstat = substats[index];
		const nextSubstat = e.currentTarget.value;
		const newPool = remove(add(pool, removedSubstat), nextSubstat);
		const newSubstats = Object.assign([], substats, {
			[index]: nextSubstat,
		});
		this.setState(prevState => ({
			pool: newPool,
			substats: newSubstats,
		}));
	}

	render() {
		const {
			data,
			isOpen,
			onClose,
			type,
		} = this.props;

		return (
			<Dialog
				isOpen={isOpen}
				onClose={onClose}
				title={type}
			>
				<ControlGroup>
					<HTMLSelect
						options={data.main}
					/>
					<NumericInput
						clampValueOnBlur
						min={0}
					/>
					<Button
						icon="plus"
						onClick={this.addSubstat}
					/>
				</ControlGroup>
				{this.state.substats.map((substat, idx) => (
					<HTMLSelect
						key={substat}
						options={add(this.state.pool, substat)}
						onChange={this.handleChange(idx)}
						value={substat}
					/>
				))}
			</Dialog>
		);
	}
}

export default GearDialog;
