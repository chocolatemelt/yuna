import data from '../data/characters.json';

export const CHARACTER_SET = 'CHARACTER_SET';
export const CHARACTER_LOAD = 'CHARACTER_LOAD';
export const CHARACTER_SET_STATS = 'CHARACTER_SET_STATS';

export function characterSet(character) {
	return {
		type: CHARACTER_SET,
		character,
	};
}

export function characterLoad(characterData) {
	return {
		type: CHARACTER_LOAD,
		characterData,
	};
}

export function characterSetStats(stat) {
	return {
		type: CHARACTER_SET_STATS,
		stat,
	};
}

export const loadCharacterData = character => (dispatch) => {
	dispatch(characterLoad(data[character]));
};

export const setCharacterData = character => (dispatch) => {
	dispatch(characterSet(character));
	dispatch(characterLoad(data[character]));
};
