import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CharacterSelect from '../components/CharacterSelect';
import CharacterSheet from '../components/CharacterSheet';
import ConfigurationDisplay from './ConfigurationDisplay';
import SkillDisplay from './SkillDisplay';
import StatForm from './StatForm';
import GearDisplay from './GearDisplay';
import { loadCharacterData } from '../actions/character';
import { calculateStats } from '../utils/stats';

class Main extends Component {
  static propTypes = {
    configuration: PropTypes.shape({}).isRequired,
    character: PropTypes.shape({}).isRequired,
    modifiers: PropTypes.shape({}).isRequired,
    loadCharacter: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      character: props.character,
    };
  }

  componentWillMount = () => {
    const { loadCharacter } = this.props;
    const { character } = this.state;

    loadCharacter(character.current);
  };

  componentWillReceiveProps = nextProps => {
    const { character, configuration, modifiers } = nextProps;

    this.setState({
      character: calculateStats(character.base, character.stats, modifiers, configuration.self),
    });
  };

  render() {
    const { configuration, modifiers } = this.props;
    const { character } = this.state;

    return (
      <div>
        <CharacterSelect />
        <CharacterSheet
          character={character}
          modifiers={modifiers}
          rounding={configuration.rounding}
        />
        <StatForm />
        <ConfigurationDisplay />
        <GearDisplay />
        <SkillDisplay configuration={configuration} data={character} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  character: state.character,
  configuration: state.configuration,
  modifiers: state.gear.modifiers,
});

const mapDispatchToProps = {
  loadCharacter: character => loadCharacterData(character),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
