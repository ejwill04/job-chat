import React from 'react';
import AppContainer from '../../containers/AppContainer';
import { Link } from 'react-router';

const renderCompany = (props) => props.companies.map(obj => {
  return (
    <Link to={`/${obj.name}`} key={obj._id}>
      <div>{obj.name} <span>({obj.city})</span></div>
    </Link>
  );
});

export class Companies extends React.Component {
  render() {
    return (
      <div className='app-body'>
        <h3>Companies page</h3>
        {renderCompany(this.props)}
      </div>
    );
  }
}

Companies.propTypes = {
  companies: React.PropTypes.array,
};

export default AppContainer(Companies);
