export const GEAR_SET = 'GEAR_SET';
export const GEAR_CLEAR = 'GEAR_CLEAR';

export function gearSet(gear, stats) {
	return {
		type: GEAR_SET,
		gear,
		stats,
	};
}

export function gearClear(gear) {
	return {
		type: GEAR_CLEAR,
		gear,
	};
}
