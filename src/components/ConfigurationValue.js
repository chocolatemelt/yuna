import React from 'react';
import PropTypes from 'prop-types';
import { Classes, ControlGroup, Label, NumericInput, Tooltip } from '@blueprintjs/core';

const ConfigurationValue = ({ description, value, label, max, min, onChange }) => (
  <ControlGroup>
    {description !== '' ? (
      <Tooltip className={Classes.TOOLTIP_INDICATOR} content={description}>
        <Label>{label}</Label>
      </Tooltip>
    ) : (
      <Label>{label}</Label>
    )}
    <NumericInput clampValueOnBlur max={max} min={min} onValueChange={onChange} value={value} />
  </ControlGroup>
);

ConfigurationValue.defaultProps = {
  description: '',
  min: 0
};

ConfigurationValue.propTypes = {
  description: PropTypes.string,
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default ConfigurationValue;
