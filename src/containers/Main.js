import React from 'react';

import CharacterSheet from './CharacterSheet';
import SkillDisplay from './SkillDisplay';
import StatForm from './StatForm';
import GearDisplay from './GearDisplay';

const Main = () => (
	<div>
		<CharacterSheet />
		<StatForm />
		<GearDisplay />
		<SkillDisplay />
	</div>
);

export default Main;
