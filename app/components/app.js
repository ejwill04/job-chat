import React, { Component } from 'react';
import { Link } from 'react-router';
import AppContainer from '../containers/AppContainer';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
    };
  }

  handleUpdateInput(searchText) {
    this.setState({
      searchText: searchText,
    }, () => browserHistory.push(`/${this.state.searchText}`));
  };

  componentWillMount() {
    if (localStorage.length === 0) {
      browserHistory.push('/login');
    }
  }

  componentDidMount() {
    if (localStorage.length > 0) {
      const getStorage = JSON.parse(localStorage.getItem('activeUserId'));
      const { email, password } = getStorage;
      fetch('http://localhost:3000/companies', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': email + ":" + password,
        },
        method: 'GET',
      }).then(response => response.json())
      .then(payload => this.props.addCompanies(payload.companies));
    }
  }

  toggleCityBtnPath() {
    return (
      <Link to='/cities'>
        <RaisedButton
          className='btn'
          type='submit'
          label='Cities'
        />
      </Link>
    )
  }

  toggleCompaniesBtnPath() {
    return (
      <Link to='/companies'>
        <RaisedButton
          className='btn'
          type='submit'
          label='Companies'
        />
      </Link>
    )
  }

  toggleLogoutBtn() {
    return (
      <RaisedButton
        className='btn logout-btn'
        type='submit'
        label='Logout'
        onClick={() => this.clearLocalStorage()}
      />
    )
  }

  clearLocalStorage() {
    localStorage.clear();
    browserHistory.push('/login');
  }

  toggleSearchField(allCompanies) {
    return (
      <AutoComplete
        hintText="Search for a company"
        searchText={this.state.searchText}
        onUpdateInput={this.handleUpdateInput.bind(this)}
        dataSource={allCompanies}
        filter={(searchText, key) => (key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)}
        openOnFocus={true}
      />
    )
  }

  render () {
    const allCompanies = this.props.companies.map(obj => obj.name);
    return (
      <MuiThemeProvider >
        <div className='app-header'>
          <h1>Neumann</h1>
          {/* {localStorage.length > 0 ? this.toggleCityBtnPath() : null} */}
          {localStorage.length > 0 ? this.toggleCompaniesBtnPath() : null}
          {localStorage.length > 0 ? this.toggleSearchField(allCompanies) : null}
          {localStorage.length > 0 ? this.toggleLogoutBtn() : null}
          {window.location.pathname === '/' ? <p>begin by browsing or searching for companies</p> : null}
          {this.props.children}
        </div>
      </MuiThemeProvider>

    )
  }
}

export default AppContainer(App);
