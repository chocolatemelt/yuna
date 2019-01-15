export const SET_CHARACTER = 'SET_CHARACTER';

export function setCharacter(character) {
	return {
		type: SET_CHARACTER,
		character,
	};
}
