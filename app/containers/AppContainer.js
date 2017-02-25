import { connect } from 'react-redux';
import { addCompanies, addComment, setActiveUser, setLoginErrorMessage, deleteComment } from '../actions';

const mapStateToProps = (state) => {
  console.log('containers mapStateToProps', state)
  return { companies: state.companies, comment: state.comment, user: state.user, errorMessage: state.error };
};

const mapDispatchToProps = (dispatch) => {
  console.log('mapDispatchToProps', dispatch)
  return {
    addCompanies: (data) => {
      dispatch(addCompanies(data));
    },
    addComment: (data) => {
      dispatch(addComment(data));
    },
    setActiveUser: (data) => {
      dispatch(setActiveUser(data));
    },
    setLoginErrorMessage: (data) => {
      dispatch(setLoginErrorMessage(data));
    },
    deleteComment: (data) => {
      dispatch(deleteComment(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
