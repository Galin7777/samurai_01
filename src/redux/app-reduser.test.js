import { appReducer } from './app-reduser';
import { initializedSuccess } from './app-reduser';

describe('appReducer', () => {
  let state;

  beforeEach(() => {
    state = { initialized: false };
  });

  it('should set initialized to true when INITIALIZED_SUCCESS is dispatched', () => {
  //1. test data
    const action = initializedSuccess();
    //2.action
    const newState = appReducer(state, action);
    //3.expectation
    expect(newState.initialized).toBe(true);
  });

  it('should return the same state for unknown action type', () => {
  //1. test data
    const action = { type: 'UNKNOWN_ACTION' };
    //2.action
    const newState = appReducer(state, action);
    //3.expectation
    expect(newState).toBe(state);
  });
});
