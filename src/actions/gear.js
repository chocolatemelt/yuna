export const GEAR_SET = 'GEAR_SET';
export const GEAR_CLEAR = 'GEAR_CLEAR';

export function setGear(gear, modifiers) {
	return {
		type: GEAR_SET,
		gear,
		modifiers,
	};
}

export function clearGear(gear) {
	return {
		type: GEAR_CLEAR,
		gear,
	};
}
