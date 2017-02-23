import React from 'react';
// import CompanyContainer from '../../containers/CompanyContainer';
import { browserHistory } from 'react-router';
// import { Link } from 'react-router';

class Company extends React.Component {

  submitComment(e) {
    fetch('http://localhost:3000/companies', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ comment: e })
    });
  }

  render() {
    const company = this.props.companies.find(co => co.name === this.props.params.name) || [];
    console.log(company)
    return (
      <div>
        <h3>company: {company.name}</h3>
        <h4>location: {company.city}, {company.state}</h4>
        <p>comments: {company.comments}</p>
        <input
          onChange={(e) => {this.submitComment(e)}}
        />
      </div>
    )
  }
}

export default Company;
