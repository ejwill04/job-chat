export const addCompanies = (data) => {
  return {
    type: 'ADD_COMPANIES',
    data,
  }
};

export const setActiveUser = (data) => {
  return {
    type: 'SET_ACTIVE_USER',
    data,
  };
};

export const setLoginErrorMessage = (data) => {
  return {
    type: 'SET_LOGIN_ERROR_MESSAGE',
    data,
  };
};

export const addComment = (data) => {
  return {
    type: 'ADD_COMMENT',
    data,
  };
};

export const deleteComment = (data) => {
  console.log('deleteCommentAction', data)
  return {
    type: 'DELETE_COMMENT',
    data,
  };
};
