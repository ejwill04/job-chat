import { connect } from 'react-redux';
import { addCompanies } from '../actions';
import App from '../components/app';

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

export default connect(mapStateToProps, mapDispatchToProps);
