import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@blueprintjs/core';

const SkillDamageDisplay = ({ damageCalc, name, rounding }) => (
  <div className="yuna-skill-damage-display">
    <Label className="yuna-skill-name">{name}</Label>
    {damageCalc === 'N/A' ? (
      <p>N/A</p>
    ) : (
      <>
        <p className="yuna-skill yuna-miss">
          {Number.parseFloat(damageCalc.miss.toFixed(rounding))}
        </p>
        <p className="yuna-skill yuna-hit">{Number.parseFloat(damageCalc.hit.toFixed(rounding))}</p>
        <p className="yuna-skill yuna-crush">
          {Number.parseFloat(damageCalc.crush.toFixed(rounding))}
        </p>
        {typeof damageCalc.crit === 'number' && (
          <p className="yuna-skill yuna-crit">
            {Number.parseFloat(damageCalc.crit.toFixed(rounding))}
          </p>
        )}
      </>
    )}
  </div>
);

SkillDamageDisplay.propTypes = {
  damageCalc: PropTypes.oneOfType([
    PropTypes.shape({
      miss: PropTypes.number,
      hit: PropTypes.number,
      crush: PropTypes.number,
      crit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    PropTypes.string,
  ]),
  name: PropTypes.string.isRequired,
  rounding: PropTypes.number.isRequired,
};

export default SkillDamageDisplay;
