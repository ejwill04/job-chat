const errorMessage = (state = '', action) => {
  switch (action.type) {
    case 'SET_LOGIN_ERROR_MESSAGE':
      return action.data;
    default:
      return state;
  }
};

export default errorMessage;
