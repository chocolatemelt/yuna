export const CONFIGURATION_SET = 'CONFIGURATION_SET';
export const CONFIGURATION_CLEAR = 'CONFIGURATION_CLEAR';

export function configurationSet(key, value) {
	return {
		type: CONFIGURATION_SET,
		key,
		value,
	};
}

export function configurationClear() {
	return {
		type: CONFIGURATION_CLEAR,
	};
}
