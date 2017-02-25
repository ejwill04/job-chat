import { connect } from 'react-redux';
import { addCompanies, addComment, setActiveUser, setLoginErrorMessage } from '../actions';

const mapStateToProps = (state) => {
  return { companies: state.companies, comment: state.comment, user: state.user, errorMessage: state.error };
};

const mapDispatchToProps = (dispatch) => {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
