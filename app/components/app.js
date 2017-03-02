import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import AppContainer from '../containers/AppContainer';
import { getLocalStorage, clearLocalStorage, localStorageEmpty } from './helperFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  handleUpdateInput(searchText) {
    this.setState({
      searchText: searchText,
    }, () => browserHistory.push(`/${this.state.searchText}`));
  };

  componentWillMount() {
    if (localStorageEmpty()) {
      browserHistory.push('/login');
    }
  }

  componentDidMount() {
    if (localStorage.length > 0) {
      const { email, password } = getLocalStorage();
      fetch('http://localhost:3000/companies', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': email + ':' + password,
        },
        method: 'GET',
      }).then(response => response.json())
      .then(payload => this.props.addCompanies(payload.companies));
    }
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
    );
  }

  toggleLogoutBtn() {
    return (
      <RaisedButton
        className='btn logout-btn'
        type='submit'
        label='Logout'
        onClick={() => clearLocalStorage()}
      />
    );
  }

  toggleSearchField(allCompanies) {
    return (
      <AutoComplete
        hintText='Search for a company'
        searchText={this.state.searchText}
        onUpdateInput={this.handleUpdateInput}
        dataSource={allCompanies}
        filter={(searchText, key) => (key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)}
        openOnFocus
      />
    );
  }

  render() {
    const allCompanies = this.props.companies.map(obj => obj.name);
    return (
      <MuiThemeProvider >
        <div className='app-header'>
          <h1>Neumann</h1>
          {localStorage.length > 0 ? this.toggleCompaniesBtnPath() : null}
          {localStorage.length > 0 ? this.toggleSearchField(allCompanies) : null}
          {localStorage.length > 0 ? this.toggleLogoutBtn() : null}
          {window.location.pathname === '/' ? <p>begin by browsing or searching for companies</p> : null}
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  companies: React.PropTypes.array,
  children: React.PropTypes.object,
  addCompanies: React.PropTypes.func,
  setActiveUser: React.PropTypes.func,
  deleteComment: React.PropTypes.func,
};

export default AppContainer(App);
