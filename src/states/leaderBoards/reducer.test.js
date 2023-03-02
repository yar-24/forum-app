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
                  "id": "users-1",
                  "name": "John Doe",
                  "email": "john@example.com",
                  "avatar": "https://generated-image-url.jpg"
                },
                "score": 10
              },
              {
                "user": {
                  "id": "users-2",
                  "name": "Jane Doe",
                  "email": "jane@example.com",
                  "avatar": "https://generated-image-url.jpg"
                },
                "score": 5
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
