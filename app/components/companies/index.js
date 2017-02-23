import React from 'react';
import CompaniesContainer from '../../containers/CompaniesContainer';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import data from '../../data';

export class Companies extends React.Component {
  render() {
      const companies = this.props.companies.map(obj => {
        return (
          <Link to={`/${obj.name}`} key={obj._id}>
            <div>{obj.name} <span>({obj.city})</span></div>
          </Link>
        )
      })

    return (
      <div>
        <h3>Companies page</h3>
        {companies}
      </div>
    )
  }
}

export default CompaniesContainer(Companies);
