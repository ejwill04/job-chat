import React from 'react';
import CompanyContainer from '../../containers/CompanyContainer';
import { browserHistory } from 'react-router';

export class Company extends React.Component {
  constructor() {
    super();
    this.state = {
      commentInput: '',
      comment: {},
    };
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
      console.log(data)
      this.props.addComment(data)
    })
    .catch((err)=> console.log('props', this.props))
  }

  render() {
    console.log('props', this.props)
    const company = this.props.companies.find(co => co.name === this.props.params.name) || [];
    // this.setState({ comments: company.comments })
    const comments = company.comments ? company.comments.map(commentObj => <p key={commentObj._id}>{commentObj.comment}</p>) : null;
    return (
      <div>
        <h3>company: {company.name}</h3>
        <h4>location: {company.city}, {company.state}</h4>
        <p>comments:</p>
        {comments}
        <form
          className='login-form'
          onSubmit={this.handleSubmit.bind(this)}
          >
          <input
            className='input-comment'
            type='text'
            placeholder='comment'
            ref='comment'
            onChange={(e) => this.setState({ commentInput: e.target.value })}
          />
          <input
            className='btn btn-comment'
            type='submit'
            value='Comment'
          />
        </form>
      </div>
    )
  }
}

export default CompanyContainer(Company);
