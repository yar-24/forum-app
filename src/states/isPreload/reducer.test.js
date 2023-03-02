/**
 * Test Skenario for isPreloadReducer
 * - should return the initial state when given by unknown action
 * - should return the isPrelaod when given by SET_IS_PRELOAD action
 */

import isPreloadReducer from './reducer';

describe('isPreloadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the isPreload when given by SET_IS_PRELOAD action', () => {
    const initialState = null;
    const action = {
      type: 'SET_IS_PRELOAD',
      payload: {
        isPreload: false,
      },
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.isPreload);
  });
});
