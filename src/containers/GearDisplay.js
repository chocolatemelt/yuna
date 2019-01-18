import React, { Component } from 'react';
import {
	Button,
	Dialog,
} from '@blueprintjs/core';

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
			[dialog]: prevState[dialog],
		}));
	}

	render() {
		const {
			weaponDialog,
		} = this.state;

		return (
			<div>
				<Dialog
					isOpen={weaponDialog}
					title="Palantir"
					onClose={() => this.handleDialogFor('weapon')}
				>
					???
				</Dialog>
				<Button onClick={() => this.handleDialogFor('weapon')}>woopeen</Button>
			</div>
		);
	}
}

export default GearDisplay;
