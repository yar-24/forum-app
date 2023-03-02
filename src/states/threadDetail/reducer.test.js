/**
 * Test Skenario for threadDetailReducer
 *  - should return the initial state when given by unknown action
 *  - should return the thread when given by SET_THREAD_DETAIL action
 */

import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread when given by SET_THREAD_DETAIL action', () => {
    const initialState = null;
    const action = {
      type: 'SET_THREAD_DETAIL',
      payload: {
        body: '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dum…ext of the printing and typesetting industry.</p>',
        category: 'lorem',
        comments: [],
        createdAt: '023-03-01T05:06:18.685Z',
        downVotesBy: [],
        id: 'thread-EtRM-DLppDV6oU45',
        ownerId: 'user-Dz6EWnbSELlZWX_Z',
        title: 'lorem ipsum',
        upVoteBy: [],
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.thread);
  });
});
