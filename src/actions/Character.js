import data from '../data/characters.json';

export const SET_CHARACTER = 'SET_CHARACTER';
export const LOAD_CHARACTER = 'LOAD_CHARACTER';

export const SET_STATS = 'SET_STATS';

export function setCharacter(character) {
	return {
		type: SET_CHARACTER,
		character,
	};
}

export function loadCharacter(characterData) {
	return {
		type: LOAD_CHARACTER,
		characterData,
	};
}

export function setStats(stat) {
	return {
		type: SET_STATS,
		stat,
	};
}

export const characterLoad = () => (dispatch, getState) => {
	const character = getState().character.current;
	dispatch(loadCharacter(data[character]));
};
