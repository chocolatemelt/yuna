import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ControlGroup, HTMLSelect } from '@blueprintjs/core';

import { setCharacterData } from '../actions/character';
import data from '../data/characters.json';

class CharacterSelect extends Component {
  static propTypes = {
    setCharacter: PropTypes.func.isRequired,
  };

  handleChange = e => {
    const { setCharacter } = this.props;

    // get identifier
    const id = e.target.value.replace(/ /g, '_').toLowerCase();
    setCharacter(id);
  };

  render() {
    return (
      <>
        <ControlGroup>
          <HTMLSelect
            options={Object.keys(data).map(k => data[k].name)}
            onChange={this.handleChange}
          />
        </ControlGroup>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCharacter: character => dispatch(setCharacterData(character)),
});

export default connect(
  null,
  mapDispatchToProps
)(CharacterSelect);
