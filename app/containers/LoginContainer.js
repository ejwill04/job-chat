import { connect } from 'react-redux';
import Login from '../components/login';

const mapStateToProps = (state) => {
  console.log('a thing')
};

const mapDispatchToProps = (dispatch) => {
  console.log('another thing')
};

export default connect(null, null)(Login);
