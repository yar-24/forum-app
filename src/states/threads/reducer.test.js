/**
 * Test Skenario for threadReducer
 *  - should return the initial state when given by unknown action
 *  - should return the talks when given by SET_THREADS action
 *  - should return the talks with the new talk when given by ADD_THREAD action
 *  - should return the talks with the toggled like talk when given by VOTE_THREAD action
 */

import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
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

  it('should return the talks when given by SET_THREADS action', () => {
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

  it('should return the talks with the new talk when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        body: '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dum…ext of the printing and typesetting industry.</p>',
        category: 'lorem',
        createdAt: '2023-03-01T05:06:18.685Z',
        downVotesBy: [],
        id: 'thread-EtRM-DLppDV6oU45',
        ownerId: 'user-Dz6EWnbSELlZWX_Z',
        title: 'lorem ipsum',
        totalComments: 0,
        upVotesBy: [],
      },
      {
        body: '<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>',
        category: 'lorem ipsum',
        createdAt: '2023-03-02T03:04:20.675Z',
        downVotesBy: [],
        id: 'thread-EpPDYN8OhfpZcUSj',
        ownerId: 'user-Dz6EWnbSELlZWX_Z',
        title: 'Lorem',
        totalComments: 0,
        upVotesBy: [],
      },
    ];
    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          body: '<p>lorem tambahan</p>',
          category: 'add',
          createdAt: '2023-03-02T05:05:10.650Z',
          downVotesBy: [],
          id: 'thread-EpPDYN8Oh3HuKdi',
          ownerId: 'user-Dz6EWnbSELlZWX_Z',
          title: 'lorem add',
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

  it('should return the talks with the toggled like talk when given by VOTE_THREAD action', () => {
    // Like

    // arrange
    const initialState = [
      {
        body: '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dum…ext of the printing and typesetting industry.</p>',
        category: 'lorem',
        createdAt: '2023-03-01T05:06:18.685Z',
        downVotesBy: [],
        id: 'thread-EtRM-DLppDV6oU45',
        ownerId: 'user-Dz6EWnbSELlZWX_Z',
        title: 'lorem ipsum',
        totalComments: 0,
        upVotesBy: [],
      },
    ];
    const action = {
      type: 'VOTE_THREAD',
      payload: {
        threadId: 'thread-EtRM-DLppDV6oU45',
        userId: 'user-Dz6EWnbSELlZWX_Z',
        voteType: 1,
      },
    };

    // action
    const nextStateLike = threadsReducer(initialState, action);

    // assert
    const threadsLiked = nextStateLike.find(
      (state) => state.id === action.payload.threadId,
    );
    expect(threadsLiked).toEqual({
      ...threadsLiked,
      upVotesBy: [action.payload.userId],
    });

    // Netral

    // arrange
    action.payload.voteType = 0;

    // action: netral vote
    const nextStateNetral = threadsReducer(nextStateLike, action);

    // assert
    const threadsNetral = nextStateNetral.find(
      (state) => state.id === action.payload.threadId,
    );
    expect(threadsNetral).toEqual({
      ...threadsLiked,
      upVotesBy: [],
    });

    // Dislike

    // arrange
    action.payload.voteType = -1;

    // action: dislike vote
    const nextStateDislike = threadsReducer(nextStateNetral, action);

    // assert
    const threadsDisliked = nextStateDislike.find(
      (state) => state.id === action.payload.threadId,
    );
    expect(threadsDisliked).toEqual({
      ...threadsDisliked,
      downVotesBy: [action.payload.userId],
    });
  });
});
