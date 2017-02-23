import { connect } from 'react-redux';
import { addCompanies } from '../actions';
import Company from '../components/company';

const mapStateToProps = (state) => {
  return { companies: state.companies };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCompanies: (data) => {
      dispatch(addMovies(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
