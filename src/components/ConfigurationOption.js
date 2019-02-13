import React from 'react';
import PropTypes from 'prop-types';
import { Classes, Checkbox, ControlGroup, Label, Tooltip } from '@blueprintjs/core';

const ConfigurationOption = ({ description, checked, label, onChange }) => (
  <ControlGroup>
    {description !== '' ? (
      <Tooltip className={Classes.TOOLTIP_INDICATOR} content={description}>
        <Label className="yuna-form-label">{label}</Label>
      </Tooltip>
    ) : (
      <Label className="yuna-form-label">{label}</Label>
    )}
    <Checkbox checked={checked} onChange={onChange} />
  </ControlGroup>
);

ConfigurationOption.defaultProps = {
  description: '',
};

ConfigurationOption.propTypes = {
  description: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ConfigurationOption;
