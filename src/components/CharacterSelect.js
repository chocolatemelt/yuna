import React from 'react';
import {
	ControlGroup,
	HTMLSelect,
} from '@blueprintjs/core';

import data from '../data/characters.json';

const handleChange = e => console.log(e);

const CharacterSelect = () => (
	<>
		<ControlGroup>
			<HTMLSelect
				options={Object.keys(data).map(k => data[k].name)}
				onChange={handleChange}
			/>
		</ControlGroup>
	</>
);

export default CharacterSelect;
