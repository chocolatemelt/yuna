export const GEAR_RECALCULATE = 'GEAR_RECALCULATE';
export const GEAR_SET = 'GEAR_SET';
export const GEAR_CLEAR = 'GEAR_CLEAR';
export const GEAR_CLEAR_ALL = 'GEAR_CLEAR_ALL';

export function gearRecalculate() {
  return {
    type: GEAR_RECALCULATE,
  };
}

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

export function gearClearAll() {
  return {
    type: GEAR_CLEAR_ALL,
  };
}

export const updateGear = (gear, stats) => dispatch => {
  dispatch(gearSet(gear, stats));
  dispatch(gearRecalculate());
};
