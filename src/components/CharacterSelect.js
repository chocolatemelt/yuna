import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ControlGroup, HTMLSelect } from '@blueprintjs/core';

import { setCharacterData } from '../actions/character';
import data from '../data/characters.json';
import { getIdentifier, getCharacterName } from '../utils/misc';

class CharacterSelect extends Component {
  static propTypes = {
    current: PropTypes.string.isRequired,
    setCharacter: PropTypes.func.isRequired,
  };

  handleChange = e => {
    const { setCharacter } = this.props;

    setCharacter(getIdentifier(e.target.value));
  };

  render() {
    const { current } = this.props;

    return (
      <>
        <ControlGroup>
          <HTMLSelect
            options={Object.keys(data).map(k => data[k].name)}
            onChange={this.handleChange}
            value={getCharacterName(current)}
          />
        </ControlGroup>
      </>
    );
  }
}

const mapStateToProps = state => ({
  current: state.character.current,
});

const mapDispatchToProps = dispatch => ({
  setCharacter: character => dispatch(setCharacterData(character)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterSelect);
