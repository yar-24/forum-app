import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const ActionType = {
  SET_LEADERBOARDS: 'SET_LEADERBOARDS',
};

function setLeaderBoards(leaderboards) {
  return {
    type: ActionType.SET_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncLeaderBoards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderBoards();
      dispatch(setLeaderBoards(leaderboards));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

export { ActionType, setLeaderBoards, asyncLeaderBoards };
