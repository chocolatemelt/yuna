import React from 'react';

import CharacterSheet from '../components/CharacterSheet';
import SkillDisplay from '../components/SkillDisplay';
import StatForm from '../components/StatForm';

const Main = () => (
	<div>
		<CharacterSheet />
		<StatForm />
		<SkillDisplay />
	</div>
);

export default Main;
