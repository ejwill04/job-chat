const company = (state=[], action) => {
  console.log(action.data)
  switch (action.type) {
    case 'ADD_COMMENT':
      return action.data;
    default:
      return state;
  }
};

export default company;
