const ActionType = {
  SET_USERS: 'SET_USERS',
};

function setUsers(users) {
  return {
    type: ActionType.SET_USERS,
    payload: {
      users,
    },
  };
}

export { ActionType, setUsers };
