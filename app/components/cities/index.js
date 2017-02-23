import React from 'react';
import CitiesContainer from '../../containers/CitiesContainer';
import { browserHistory } from 'react-router';
import data from '../../data';

export class Cities extends React.Component {


  render() {
      // const cities = data.map(obj => {
      //   return (
      //     <div key={obj.response_id}>{obj.city}</div>
      //   )
      // })

    return (
      <div>
        <h3>Cities page</h3>
        {/* {cities} */}
      </div>
    )
  }
}

export default CitiesContainer(Cities);
