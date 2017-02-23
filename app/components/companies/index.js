import React from 'react';
import CompaniesContainer from '../../containers/CompaniesContainer';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import data from '../../data';

export class Companies extends React.Component {

  // componentDidMount() {
  //   fetch('http://localhost:3000/companies', {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     method: 'GET',
  //   }).then(response => response.json())
  //   .then(payload => console.log(payload));
  // }

  render() {
      // const companies = data.map(obj => {
      //   return (
      //     <Link to={`/${obj.company}`}>
      //       <div key={obj.response_id}>{obj.company}</div>
      //     </Link>
      //   )
      // })

    return (
      <div>
        <h3>Companies page</h3>
        {/* {companies} */}
      </div>
    )
  }
}

export default CompaniesContainer(Companies);
