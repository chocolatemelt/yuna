import React from 'react';
import PropTypes from 'prop-types';
import {
	ControlGroup,
	Label,
	NumericInput,
} from '@blueprintjs/core';

const ConfigurationValue = ({
	value,
	label,
	max,
	min,
	onChange,
}) => (
	<ControlGroup>
		<Label>{label}</Label>
		<NumericInput
			clampValueOnBlur
			max={max}
			min={min}
			onValueChange={onChange}
			value={value}
		/>
	</ControlGroup>
);

ConfigurationValue.defaultProps = {
	max: 100,
	min: 0,
};

ConfigurationValue.propTypes = {
	value: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
	max: PropTypes.number,
	min: PropTypes.number,
	onChange: PropTypes.func.isRequired,
};

export default ConfigurationValue;
