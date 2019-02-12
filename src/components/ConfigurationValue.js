import React from 'react';
import PropTypes from 'prop-types';
import { Classes, ControlGroup, Label, NumericInput, Tooltip } from '@blueprintjs/core';

const ConfigurationValue = ({
  description,
  value,
  label,
  max,
  min,
  onChange,
  stepSize,
  majorStepSize,
  minorStepSize,
}) => (
  <ControlGroup>
    {description !== '' ? (
      <Tooltip className={Classes.TOOLTIP_INDICATOR} content={description}>
        <Label>{label}</Label>
      </Tooltip>
    ) : (
      <Label>{label}</Label>
    )}
    <NumericInput
      clampValueOnBlur
      majorStepSize={majorStepSize}
      max={max}
      min={min}
      minorStepSize={minorStepSize}
      onValueChange={onChange}
      stepSize={stepSize}
      value={value}
    />
  </ControlGroup>
);

ConfigurationValue.defaultProps = {
  description: '',
  majorStepSize: 10,
  min: 0,
  minorStepSize: 0.1,
  stepSize: 1,
};

ConfigurationValue.propTypes = {
  description: PropTypes.string,
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  majorStepSize: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  minorStepSize: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  stepSize: PropTypes.number,
};

export default ConfigurationValue;
