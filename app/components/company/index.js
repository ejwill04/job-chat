import React from 'react';
import AppContainer from '../../containers/AppContainer';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';

export class Company extends React.Component {
  constructor() {
    super();
    this.state = {
      commentInput: '',
      thisCompany: '',
      users: [],
    };
  }

  componentWillMount() {
    this.fetchAllUsers()
    this.fetchCompanies()
  }

  handleSubmitComment(e) {
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
    this.setState({ commentInput: '' })
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
      .then(payload => this.props.addCompanies(payload.companies))
      .then(() => {
        const company = this.props.companies.find(co => co.name === this.props.params.name) || [];
        this.setState({ thisCompany: company });
      })
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

  renderUser(userId) {
    if (this.state.users.length > 0) {
      return (
        <span className='comment-username'>
          {this.state.users.find(userObj => userObj._id === userId).name}
        </span>
      )
    }
  }

  deleteComment(commentId, commentUserId) {
    const companyId = this.state.thisCompany._id;
    const getStorage = JSON.parse(localStorage.getItem('activeUserId'));
    const { email, password } = getStorage;
    if(getStorage._id === commentUserId) {
      fetch(`http://localhost:3000/companies/${companyId}/comments/${commentId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': email + ":" + password,
        },
        method: 'DELETE',
      })
      .then(response => response.json()).then((data) => {
        this.props.deleteComment(data)
        this.setState({ thisCompany: data.company })
        this.fetchCompanies()
      })
    }
  }

  // updateComment(commentId) {
  //   const companyId = this.state.thisCompany._id;
  //   const getStorage = JSON.parse(localStorage.getItem('activeUserId'));
  //   const { email, password } = getStorage;
  //   fetch(`http://localhost:3000/companies/${companyId}/comments/${commentId}`, {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': email + ":" + password,
  //     },
  //     method: 'PUT',
  //   })
  //   .then(response => response.json()).then((data) => {
  //     this.props.updateComment(data)
  //     this.setState({ thisCompany: data.company })
  //     this.fetchCompanies()
  //   })
  // }

  renderIconMenu(commentId, commentUserId) {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem
          primaryText="Delete"
          onClick={() => this.deleteComment(commentId, commentUserId)}
         />
        {/* <MenuItem
          primaryText="Update"
          onClick={() => this.updateComment(commentId)}
        /> */}
      </IconMenu>
    )
  }

  render() {
    const company = this.state.thisCompany;
    const comments = company.comments ?
     company.comments.map(commentObj =>
       <div key={commentObj._id}>
         {this.renderUser(commentObj.user)}
         <span className='comment-submit-date'>{moment(commentObj.createdAt).format('MMMM do, h:mma')}</span>
         {this.renderIconMenu(commentObj._id, commentObj.user)}
         <p className='company-comment'>{commentObj.comment}</p>
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
          onSubmit={this.handleSubmitComment.bind(this)}
          >
          <TextField
            className='input-comment'
            type='text'
            ref='comment'
            floatingLabelText="Comment"
            value={ this.state.commentInput }
            onChange={(e) => this.setState({ commentInput: e.target.value }) }
            // onNewRequest={(e) => this.setState({ commentInput: '' })}
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
