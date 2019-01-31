import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Checkbox,
	ControlGroup,
} from '@blueprintjs/core';

class ConfigurationOption extends Component {
  static propTypes = {
  	checked: PropTypes.bool.isRequired,
  	label: PropTypes.string.isRequired,
  }

  render() {
  	const {
  		checked,
  		label,
  	} = this.props;

  	return (
 	    <ControlGroup>
	      <Checkbox
    			checked={checked}
    		>
  			   {label}
  			</Checkbox>
  		</ControlGroup>
  	);
  }
}

export default ConfigurationOption;
