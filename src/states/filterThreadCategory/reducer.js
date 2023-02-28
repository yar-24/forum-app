import { ActionType } from './action';

function filterThreadCategoryReducer(category = '', action = {}) {
  switch (action.type) {
    case ActionType.SET_FILTER_CATEGORY:
      return action.payload.category;
    default:
      return category;
  }
}

export default filterThreadCategoryReducer;
