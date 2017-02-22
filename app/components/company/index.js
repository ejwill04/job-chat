import React from 'react';
import CompanyContainer from '../../containers/CompanyContainer';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import data from '../../data';

export class Company extends React.Component {


  render() {
    return (
      <div>
        <h3>company:{data.company}</h3>
      </div>
    )
  }
}

export default CompanyContainer(Company);
