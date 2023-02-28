import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const ActionType = {
  SET_THREAD_DETAIL: 'SET_THREAD_DETAIL',
};

function setThreadDetail(thread) {
  return {
    type: ActionType.SET_THREAD_DETAIL,
    payload: {
      thread,
    },
  };
}

function asyncSetThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(setThreadDetail(threadDetail));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncVoteComment(threadId, commentId, voteType) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.voteComment(threadId, commentId, voteType);
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(setThreadDetail(threadDetail));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddComment(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.addComment({ threadId, content });
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(setThreadDetail(threadDetail));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType, setThreadDetail, asyncSetThreadDetail, asyncVoteComment, asyncAddComment,
};
