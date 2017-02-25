import React from 'react';
import AppContainer from '../../containers/AppContainer';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import data from '../../data';

export class Cities extends React.Component {
  render() {
      const cities = this.props.companies.map(obj => {
        return (
          <Link to={`/${obj.city}`} key={obj._id}>
            <div>{obj.city}</div>
          </Link>
        )
      })

    return (
      <div>
        <h3>Cities page</h3>
        {cities}
      </div>
    )
  }
}

export default AppContainer(Cities);
