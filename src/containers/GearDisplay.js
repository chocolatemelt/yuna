import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Button,
} from '@blueprintjs/core';

import { updateGear } from '../actions/gear';
import GearDialog from '../components/GearDialog';
import data from '../data/gear.json';

class GearDisplay extends Component {
	static propTypes = {
		setGear: PropTypes.func.isRequired,
	}

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

	handleDialogFor = (gear) => {
		this.setState(prevState => ({
			dialogOpen: Object.assign(prevState.dialogOpen, {
				[gear]: !prevState.dialogOpen[gear],
			}),
		}));
	}

	render() {
		const {
			setGear,
		} = this.props;
		const {
			dialogOpen,
		} = this.state;

		return (
			<div>
				{Object.keys(data).map(key => (
					<Fragment key={`${key}group`}>
						<GearDialog
							key={`${key}dialog`}
							isOpen={dialogOpen[key]}
							onClose={() => this.handleDialogFor(key)}
							onSave={e => setGear(key, e)}
							type={key}
							data={data[key]}
						/>
						<Button
							key={`${key}button`}
							onClick={() => this.handleDialogFor(key)}
						>
							{key}
						</Button>
					</Fragment>
				))}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	setGear: (gear, stats) => dispatch(updateGear(gear, stats)),
});

export default connect(null, mapDispatchToProps)(GearDisplay);
