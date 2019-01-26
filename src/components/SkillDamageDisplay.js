import React from 'react';
import PropTypes from 'prop-types';

const SkillDamageDisplay = ({ damageCalc, name }) => (
	<div>
		<h3>{name}</h3>
		{damageCalc === 'N/A'
			? <p>N/A</p>
			: (
				<>
					<p>{damageCalc.miss}</p>
					<p>{damageCalc.hit}</p>
					<p>{damageCalc.crush}</p>
					<p>{damageCalc.crit}</p>
				</>
			)
		}
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
};

export default SkillDamageDisplay;
