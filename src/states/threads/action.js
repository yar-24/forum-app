import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { setUsers } from '../users/action';
import { setThreadDetail, asyncSetThreadDetail } from '../threadDetail/action';

const ActionType = {
  SET_THREADS: 'SET_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  VOTE_THREAD: 'VOTE_THREAD',
};

function setThreads(threads) {
  return {
    type: ActionType.SET_THREADS,
    payload: {
      threads,
    },
  };
}

function addThread(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function voteThread({ threadId, userId, voteType }) {
  return {
    type: ActionType.VOTE_THREAD,
    payload: {
      threadId,
      userId,
      voteType,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const createThread = await api.addThread({ title, body, category });
      dispatch(addThread(createThread));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUserAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      dispatch(setUsers(users));
      dispatch(setThreads(threads));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncVoteThread(threadId, userId, voteType, voteTypeBefore) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    dispatch(voteThread({ threadId, userId, voteType }));
    const { threads, threadDetail } = getState();
    if (threadDetail) {
      const findThread = threads.find((thread) => thread.id === threadId);
      dispatch(setThreadDetail({
        ...findThread,
        comments: threadDetail.comments,
        owner: threadDetail.owner,
      }));
    }

    try {
      await api.voteThread(threadId, voteType);
      if (threadDetail) {
        dispatch(asyncSetThreadDetail(threadId));
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(voteThread({ threadId, userId, voteTypeBefore }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType, setThreads, asyncAddThread, asyncUserAndThreads, asyncVoteThread,
};
