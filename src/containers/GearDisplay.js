import React, { Component } from 'react';
import {
	Button,
} from '@blueprintjs/core';

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
					/>
				</>
				<Button onClick={() => this.handleDialogFor('weapon')}>woopeen</Button>
			</div>
		);
	}
}

export default GearDisplay;
