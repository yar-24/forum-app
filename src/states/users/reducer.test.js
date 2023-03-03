/**
 * test scenario for userReducer
 * - should return the initial state when given by unknown action
 * - should return the users when given by SET_USERS action
 */

import usersReducer from './reducer';

describe('usersReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the users when given by SET_USERS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'SET_USERS',
      payload: {
        users: [
          {
            id: 'user-Dz6EWnbSELlZWX_Z',
            name: 'timbrin',
            email: 'timbrin@gmail.com',
            avatar: 'https://ui-avatars.com/api/?name=timbrin&background=random',
          },
        ],
      },
    };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.users);
  });
});
