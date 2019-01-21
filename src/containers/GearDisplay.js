import React, { Component, Fragment } from 'react';
import {
	Button,
} from '@blueprintjs/core';

import data from '../data/gear.json';
import GearDialog from '../components/GearDialog';

class GearDisplay extends Component {
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
							onSave={(e) => console.log(e)}
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

export default GearDisplay;
