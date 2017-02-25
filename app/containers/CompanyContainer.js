import { connect } from 'react-redux';
import { addCompanies, addComment } from '../actions';
import Company from '../components/company';

const mapStateToProps = (state) => {
  return { companies: state.companies, comment: state.comment };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (data) => {
      dispatch(addComment(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
