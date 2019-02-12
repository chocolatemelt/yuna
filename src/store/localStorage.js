export const loadState = initialState => {
  try {
    const serializedState = localStorage.state;
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return initialState;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ...well, nothing should happen anyway
  }
};
