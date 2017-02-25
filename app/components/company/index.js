import React from 'react';
import AppContainer from '../../containers/AppContainer';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import moment from 'moment';

export class Company extends React.Component {
  constructor() {
    super();
    this.state = {
      commentInput: '',
      thisCompany: '',
      users: [],
    };
  }

  componentDidMount() {
    const company = this.props.companies.find(co => co.name === this.props.params.name) || [];
    this.setState({ thisCompany: company });
    this.fetchAllUsers()
  }

  handleSubmit(e) {
    e.preventDefault();
    const companyId = this.props.companies.filter(obj => obj.name === this.props.params.name)[0]._id;
    const getStorage = JSON.parse(localStorage.getItem('activeUserId'));
    const { email, password, _id } = getStorage;
    fetch(`http://localhost:3000/companies/${companyId}/comments`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': email + ":" + password,
      },
      method: 'POST',
      body: JSON.stringify({ comment: this.state.commentInput, user: _id })
    })
    .then(response => response.json()).then((data) => {
      this.props.addComment(data)
      this.setState({ thisCompany: data.company })
      this.fetchCompanies()
      this.clearCommentInput()
    })
    .catch((err)=> console.log('props', this.props))
  }

  clearCommentInput() {
    document.querySelector('.input-comment').value = '';
  }

  fetchCompanies() {
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

  fetchAllUsers() {
    const getStorage = JSON.parse(localStorage.getItem('activeUserId'));
    const { email, password } = getStorage;
    fetch('http://localhost:3000/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': email + ":" + password,
      },
      method: 'GET',
    }).then(response => response.json())
    .then(payload => this.setState({ users: payload.users }))
  }

  render() {
    const company = this.state.thisCompany;
    const comments = company.comments ?
     company.comments.map(commentObj =>
       <div key={commentObj._id}>
         <p className='company-comment'>{commentObj.comment}</p>
         <div>{moment(commentObj.createdAt).format('MMMM do, h:mma')}</div>
       </div>
     ) : null;

    return (
      <div className='app-body'>
        <h3>company: {company.name}</h3>
        <h4>location: {company.city}, {company.state}</h4>
        <p>comments:</p>
        {comments}
        <form
          className='comment-form'
          onSubmit={this.handleSubmit.bind(this)}
          >
          <TextField
            className='input-comment'
            type='text'
            ref='comment'
            floatingLabelText="Comment"
            onChange={(e) => this.setState({ commentInput: e.target.value })}
          />
          <RaisedButton
            className='btn btn-comment'
            type='submit'
            label='Comment'
          />
        </form>
      </div>
    )
  }
}

export default AppContainer(Company);
