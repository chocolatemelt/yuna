import React from 'react';
import PropTypes from 'prop-types';

const SkillDamageDisplay = ({ damageCalc, name, rounding }) => (
  <div>
    <h3>{name}</h3>
    {damageCalc === 'N/A' ? (
      <p>N/A</p>
    ) : (
      <>
        <p>{Number.parseFloat(damageCalc.miss.toFixed(rounding))}</p>
        <p>{Number.parseFloat(damageCalc.hit.toFixed(rounding))}</p>
        <p>{Number.parseFloat(damageCalc.crush.toFixed(rounding))}</p>
        <p>{Number.parseFloat(damageCalc.crit.toFixed(rounding))}</p>
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
      crit: PropTypes.number,
    }),
    PropTypes.string,
  ]),
  name: PropTypes.string.isRequired,
  rounding: PropTypes.number.isRequired,
};

export default SkillDamageDisplay;
