import { ActionType } from './action';

function leaderBoardsReducer(leaderboards = [], action = {}) {
  switch (action.type) {
    case ActionType.SET_LEADERBOARDS:
      return action.payload.leaderboards;
    default:
      return leaderboards;
  }
}

export default leaderBoardsReducer;
