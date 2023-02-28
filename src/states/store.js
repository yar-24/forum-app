/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import usersReducer from './users/reducer';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import filterCategoryReducer from './filterThreadCategory/reducer';
import threadDetailReducer from './threadDetail/reducer';
import leaderBoardsReducer from './leaderBoards/reducer';

const store = configureStore({
  reducer: {
    users: usersReducer,
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    filterCategory: filterCategoryReducer,
    leaderBoards: leaderBoardsReducer,
  },
});

export default store;
