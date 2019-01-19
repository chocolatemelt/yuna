import React, { Component } from 'react';
import {
	Button,
} from '@blueprintjs/core';

import data from '../data/gear.json';
import GearDialog from '../components/GearDialog';

class GearDisplay extends Component {
	constructor(props) {
		super(props);

		this.state = {
			weaponDialog: false,
		};
	}

	handleDialogFor = (gear) => {
		const dialog = `${gear}Dialog`;
		this.setState(prevState => ({
			[dialog]: !prevState[dialog],
		}));
	}

	render() {
		const {
			weaponDialog,
		} = this.state;

		return (
			<div>
				<>
					<GearDialog
						isOpen={weaponDialog}
						onClose={() => this.handleDialogFor('weapon')}
						type="weapon"
						data={data.weapon}
					/>
				</>
				<Button onClick={() => this.handleDialogFor('weapon')}>weapon</Button>
			</div>
		);
	}
}

export default GearDisplay;
