import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CalculationsDisplay from './CalculationsDisplay';
import CharacterSelect from '../components/CharacterSelect';
import CharacterSheet from '../components/CharacterSheet';
import ConfigurationDisplay from './ConfigurationDisplay';
import SkillDisplay from './SkillDisplay';
import StatForm from './StatForm';
import GearDisplay from './GearDisplay';
import { loadCharacterData } from '../actions/character';
import { calculateDamage } from '../utils/calculations';
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
      s1: {
        hit: 0,
        miss: 0,
        crit: 0,
        crush: 0,
      },
      s2: {
        hit: 0,
        miss: 0,
        crit: 0,
        crush: 0,
      },
      s3: {
        hit: 0,
        miss: 0,
        crit: 0,
        crush: 0,
      },
    };
  }

  componentWillMount = () => {
    const { loadCharacter } = this.props;
    const { character } = this.state;

    loadCharacter(character.current);
  };

  componentWillReceiveProps = nextProps => {
    const { character, configuration, modifiers } = nextProps;
    const newCharacter = calculateStats(
      character.base,
      character.stats,
      modifiers,
      configuration.self
    );

    this.setState({
      character: newCharacter,
      s1: calculateDamage(newCharacter, newCharacter.s1, configuration),
      s2: calculateDamage(newCharacter, newCharacter.s2, configuration),
      s3: calculateDamage(newCharacter, newCharacter.s3, configuration),
    });
  };

  render() {
    const { configuration, modifiers } = this.props;
    const { character, s1, s2, s3 } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <CharacterSelect />
            <CharacterSheet
              character={character}
              modifiers={modifiers}
              rounding={configuration.rounding}
            />
            <StatForm />
          </div>
          <div className="col-md-4">
            <SkillDisplay skills={{ s1, s2, s3 }} rounding={configuration.rounding} />
            <CalculationsDisplay
              character={character}
              skills={{ s1, s2, s3 }}
              rounding={configuration.rounding}
            />
          </div>
          <div className="col-md-4">
            <GearDisplay />
            <ConfigurationDisplay />
          </div>
        </div>
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
