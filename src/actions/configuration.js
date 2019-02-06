export const CONFIGURATION_SET = 'CONFIGURATION_SET';
export const CONFIGURATION_CLEAR = 'CONFIGURATION_CLEAR';
export const CONFIGURATION_STATUS_SET = 'CONFIGURATION_STATUS_SET';
export const CONFIGURATION_STATUS_CLEAR = 'CONFIGURATION_STATUS_CLEAR';

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

export function configurationStatusSet(target, status) {
	return {
		type: CONFIGURATION_STATUS_SET,
		target,
		status,
	};
}

export function configurationStatusClear(target) {
	return {
		type: CONFIGURATION_STATUS_CLEAR,
		target,
	};
}
