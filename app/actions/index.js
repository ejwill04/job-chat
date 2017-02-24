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
