import React from 'react';
import PropTypes from 'prop-types';
import { Classes, Label, Tooltip } from '@blueprintjs/core';

import SkillDamageDisplay from '../components/SkillDamageDisplay';

const SkillDisplay = ({ skills, rounding }) => (
  <>
    <Tooltip
      className={Classes.TOOLTIP_INDICATOR}
      content="Final calculated skill data, in order: miss, hit, crushing hit, and crit."
    >
      <Label>Skill Damage</Label>
    </Tooltip>
    <div className="yuna-skill-display">
      <SkillDamageDisplay damageCalc={skills.s1} name="s1" rounding={rounding} />
      <SkillDamageDisplay damageCalc={skills.s2} name="s2" rounding={rounding} />
      <SkillDamageDisplay damageCalc={skills.s3} name="s3" rounding={rounding} />
    </div>
  </>
);

SkillDisplay.propTypes = {
  skills: PropTypes.shape({
    s1: PropTypes.oneOfType([
      PropTypes.shape({
        miss: PropTypes.number,
        hit: PropTypes.number,
        crush: PropTypes.number,
        crit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
      PropTypes.string,
    ]),
    s2: PropTypes.oneOfType([
      PropTypes.shape({
        miss: PropTypes.number,
        hit: PropTypes.number,
        crush: PropTypes.number,
        crit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
      PropTypes.string,
    ]),
    s3: PropTypes.oneOfType([
      PropTypes.shape({
        miss: PropTypes.number,
        hit: PropTypes.number,
        crush: PropTypes.number,
        crit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
      PropTypes.string,
    ]),
  }).isRequired,
  rounding: PropTypes.number.isRequired,
};

export default SkillDisplay;
