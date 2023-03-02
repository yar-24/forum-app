/**
 * Test skenario for authUserReducer
 * - should return the initial state when given by unknown action
 * - should return the authUser when given by SET_AUTH_USER action
 */

import authUserReducer from './reducer';

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser when given by SET_AUTH_USER action', () => {
    const initialState = null;
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: JSON.parse(`
        {
            "id": "user-123",
            "name": "John Doe",
            "email": "john@example.com",
            "avatar": "https://generated-image-url.jpg"
        }
        `),
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });
});
