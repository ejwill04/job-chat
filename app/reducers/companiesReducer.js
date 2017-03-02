const companies = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMPANIES':
      return action.data;
    default:
      return state;
  }
};

export default companies;
