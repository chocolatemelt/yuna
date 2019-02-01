import React from 'react';
import PropTypes from 'prop-types';
import {
	Checkbox,
	ControlGroup,
	Label,
} from '@blueprintjs/core';

const ConfigurationOption = ({ checked, label, onChange }) => (
	<ControlGroup>
		<Label>{label}</Label>
		<Checkbox
			checked={checked}
			onChange={onChange}
		/>
	</ControlGroup>
);

ConfigurationOption.propTypes = {
	checked: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default ConfigurationOption;
