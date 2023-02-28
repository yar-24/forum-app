import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.SET_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          let upVotesBy = [...thread.upVotesBy];
          let downVotesBy = [...thread.downVotesBy];
          if (action.payload.voteType === 0) {
            upVotesBy = upVotesBy.filter((id) => id !== action.payload.userId);
            downVotesBy = downVotesBy.filter((id) => id !== action.payload.userId);
          } else if (action.payload.voteType === 1) {
            upVotesBy.push(action.payload.userId);
            downVotesBy = downVotesBy.filter((id) => id !== action.payload.userId);
          } else {
            upVotesBy = upVotesBy.filter((id) => id !== action.payload.userId);
            downVotesBy.push(action.payload.userId);
          }
          return {
            ...thread,
            upVotesBy,
            downVotesBy,
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
