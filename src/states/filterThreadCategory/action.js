const ActionType = {
  SET_FILTER_CATEGORY: 'SET_FILTER_CATEGORY',
};

function setFilterThreadCategory(category) {
  return {
    type: ActionType.SET_FILTER_CATEGORY,
    payload: {
      category,
    },
  };
}

export {
  ActionType,
  setFilterThreadCategory,
};
