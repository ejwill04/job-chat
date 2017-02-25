const company = (state=[], action) => {
  console.log('reducer state:',state, 'reducer action', action )
  switch (action.type) {
    case 'ADD_COMMENT':
      return action.data;
    case 'DELETE_COMMENT':
      return action.data;
    default:
      return state;
  }
};

export default company;
