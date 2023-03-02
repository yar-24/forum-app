/**
 * Test Skenario for threadReducer
 *  - should return the initial state when given by unknown action
 *  - should return the talks when given by RECEIVE_TALKS action
 *  - should return the talks with the new talk when given by ADD_TALK action
 *  - should return the talks with the toggled like talk when given by TOGGLE_LIKE_TALK action
 */

import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('Return initial state jika unknown action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('Return data threads jika action SET_THREADS', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'SET_THREADS',
      payload: {
        threads: [
          {
            body: '# jsx-a11y/label-has-associated-control',
            category: 'a11y',
            createdAt: '2022-12-04T08:17:38.100Z',
            downVotesBy: [],
            id: 'thread-acPpqFqvZ47jfpM9',
            ownerId: 'user-ry7WkBEJl2WHUpEy',
            title: 'jsx',
            totalComments: 0,
            upVotesBy: [],
          },
          {
            body: 'adalah pasti bisa<div>',
            category: 'coba lagi',
            createdAt: '2022-12-04T06:55:58.650Z',
            downVotesBy: [],
            id: 'thread-EpPDYN8OhfpZcUSj',
            ownerId: 'user-ry7WkBEJl2WHUpEy',
            title: 'Berikut ini',
            totalComments: 0,
            upVotesBy: [],
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('Return data threads dan thread yang ditambah jika action ADD_THREAD', () => {
    // arrange
    const initialState = [
      {
        body: '# jsx-a11y/label-has-associated-control',
        category: 'a11y',
        createdAt: '2022-12-04T08:17:38.100Z',
        downVotesBy: [],
        id: 'thread-acPpqFqvZ47jfpM9',
        ownerId: 'user-ry7WkBEJl2WHUpEy',
        title: 'jsx',
        totalComments: 0,
        upVotesBy: [],
      },
      {
        body: 'adalah pasti bisa<div>',
        category: 'coba lagi',
        createdAt: '2022-12-04T06:55:58.650Z',
        downVotesBy: [],
        id: 'thread-EpPDYN8OhfpZcUSj',
        ownerId: 'user-ry7WkBEJl2WHUpEy',
        title: 'Berikut ini',
        totalComments: 0,
        upVotesBy: [],
      },
    ];
    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          body: 'Tambah',
          category: 'Test',
          createdAt: '2022-12-04T06:55:58.650Z',
          downVotesBy: [],
          id: 'thread-EpPDYN8Oh8Ujh7G',
          ownerId: 'user-ry7WkBEJl2WHUpEy',
          title: 'Tambah Test',
          totalComments: 0,
          upVotesBy: [],
        },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('Return data threads dengan vote yang sudah diubah jika action TOGGLE_VOTE_THREAD', () => {
    // Like

    // arrange
    const initialState = [
      {
        body: '# jsx-a11y/label-has-associated-control',
        category: 'a11y',
        createdAt: '2022-12-04T08:17:38.100Z',
        downVotesBy: [],
        id: 'thread-acPpqFqvZ47jfpM9',
        ownerId: 'user-ry7WkBEJl2WHUpEy',
        title: 'jsx',
        totalComments: 0,
        upVotesBy: [],
      },
    ];
    const action = {
      type: 'VOTE_THREAD',
      payload: {
        threadId: 'thread-acPpqFqvZ47jfpM9',
        userId: 'user-ry7WkBEJl2WHUpEy',
        voteType: 1,
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    const threadsLiked = nextState.find(
      (state) => state.id === action.payload.threadId,
    );
    expect(threadsLiked).toEqual({
      ...threadsLiked,
      upVotesBy: [action.payload.userId],
    });

    // Netral

    // arrange
    action.payload.voteType = 0;

    // action: neutralize vote
    const nextState2 = threadsReducer(nextState, action);

    // assert
    const threadsNeutralize = nextState2.find(
      (state) => state.id === action.payload.threadId,
    );
    expect(threadsNeutralize).toEqual({
      ...threadsLiked,
      upVotesBy: [],
    });

    // Dislike

    // arrange
    action.payload.voteType = -1;

    // action: dislike vote
    const nextState3 = threadsReducer(nextState2, action);

    // assert
    const threadsDisliked = nextState3.find(
      (state) => state.id === action.payload.threadId,
    );
    expect(threadsDisliked).toEqual({
      ...threadsDisliked,
      downVotesBy: [action.payload.userId],
    });
  });
});
