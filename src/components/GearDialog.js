import React from 'react';
import PropTypes from 'prop-types';
import {
	ControlGroup,
	Dialog,
	HTMLSelect,
	NumericInput,
} from '@blueprintjs/core';

const GearDialog = ({
	isOpen,
	onClose,
	type,
}) => (
	<Dialog
		isOpen={isOpen}
		onClose={onClose}
		title={type}
	>
		<ControlGroup>
			<HTMLSelect
				options={['x', 'd']}
			/>
			<NumericInput
				clampValueOnBlur
				min={0}
			/>
		</ControlGroup>
	</Dialog>
);

GearDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
};

export default GearDialog;
