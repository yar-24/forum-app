/**
 * Test skenario for leaderBoardsReducer
 * - should return the initial state when given by unknown action
 * - should return the leaderboard when given by SET_LEADERBOARDS action
 */

import leaderBoardsReducer from './reducer';

describe('leaderBoardsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = leaderBoardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread when given by SET_LEADERBOARDS action', () => {
    const initialState = null;
    const action = {
      type: 'SET_LEADERBOARDS',
      payload: {
        leaderboards: JSON.parse(`
        [
            {
                "user": {
                  "id": "users-k8YTjuIns",
                  "name": "timbrin1",
                  "email": "timbrin1n@example.com",
                  "avatar": "https://ui-avatars.com/api/?name=timbrin1&background=random"
                },
                "score": 150
              },
              {
                "user": {
                  "id": "users-UHnsadj0V",
                  "name": "timbrin2",
                  "email": "timbrin2@example.com",
                  "avatar": "https://ui-avatars.com/api/?name=timbrin2&background=random"
                },
                "score": 50
              }
        ]
        `),
      },
    };

    // action
    const nextState = leaderBoardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
