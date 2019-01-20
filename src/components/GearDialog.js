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
		data: PropTypes.shape({
			main: PropTypes.array,
			sub: PropTypes.array,
		}).isRequired,
		isOpen: PropTypes.bool.isRequired,
		onClose: PropTypes.func.isRequired,
		type: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);

		const mainstat = props.data.main[0];
		const main = remove(props.data.main, props.data.main[0]);

		this.state = {
			pool: main.concat(props.data.sub),
			substats: [mainstat],
		};
	}

	isLeft = type => (type === 'weapon' || type === 'helmet' || type === 'armor');

	addSubstat = () => {
		const {
			pool,
			substats,
		} = this.state;

		const nextSubstat = pool[0];
		if (substats.length < 5) {
			this.setState(prevState => ({
				pool: remove(prevState.pool, nextSubstat).sort(),
				substats: add(prevState.substats, nextSubstat),
			}));
		}
	}

	removeSubstat = (idx) => {
		const {
			substats,
		} = this.state;

		const removedSubstat = substats[idx];
		this.setState(prevState => ({
			pool: add(prevState.pool, removedSubstat).sort(),
			substats: remove(prevState.substats, removedSubstat),
		}));
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

		this.setState({
			pool: newPool,
			substats: newSubstats,
		});
	}

	render() {
		const {
			substats,
			pool,
		} = this.state;

		const {
			isOpen,
			onClose,
			type,
		} = this.props;

		const lefty = index => (index === 0 && this.isLeft(type));

		return (
			<Dialog
				isOpen={isOpen}
				onClose={onClose}
				title={type}
			>
				{substats.map((substat, idx) => (
					<ControlGroup>
						<HTMLSelect
							key={substat}
							options={(lefty(idx)) ? [substat] : add(pool, substat).sort()}
							onChange={this.handleChange(idx)}
							value={substat}
						/>
						<NumericInput
							clampValueOnBlur
							min={0}
						/>
						{
							lefty(idx)
								? (
									<Button
										icon="plus"
										onClick={this.addSubstat}
									/>
								) : (
									<Button
										icon="minus"
										onClick={() => this.removeSubstat(idx)}
									/>
								)
						}
					</ControlGroup>
				))}
			</Dialog>
		);
	}
}

export default GearDialog;
