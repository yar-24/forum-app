/**
 * Test skenario for filterThreadCategoryReducer
 * - should return the initial state when given by unknown action
 * - should return the category when given by SET_FILTER_CATEGORY action
 */

import filterThreadCategoryReducer from './reducer';

describe('filterThreadCategoryReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = filterThreadCategoryReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the category when given by SET_FILTER_CATEGORY action', () => {
    const initialState = null;
    const action = {
      type: 'SET_FILTER_CATEGORY',
      payload: {
        category: 'lorem',
      },
    };

    // action
    const nextState = filterThreadCategoryReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.category);
  });
});
