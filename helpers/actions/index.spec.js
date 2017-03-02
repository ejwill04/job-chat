/* eslint no-undef: 0 */
import * as actions from '../../app/actions/index';

describe('actions', () => {
  it('should create an action ADD_COMPANIES', () => {
    const data = { value: ['hello', 'world'] };
    const action = {
      type: 'ADD_COMPANIES',
      data,
    };

    expect(actions.addCompanies(data)).toEqual(action);
  });

  it('should create an action SET_ACTIVE_USER', () => {
    const data = { user: ['hello', 'world'] };
    const action = {
      type: 'SET_ACTIVE_USER',
      data,
    };

    expect(actions.setActiveUser(data)).toEqual(action);
  });

  it('should create an action SET_LOGIN_ERROR_MESSAGE', () => {
    const data = { user: ['hello', 'world'] };
    const action = {
      type: 'SET_LOGIN_ERROR_MESSAGE',
      data,
    };

    expect(actions.setLoginErrorMessage(data)).toEqual(action);
  });

  it('should create an action ADD_COMMENT', () => {
    const data = { user: ['hello', 'world'] };
    const action = {
      type: 'ADD_COMMENT',
      data,
    };

    expect(actions.addComment(data)).toEqual(action);
  });

  it('should create an action DELETE_COMMENT', () => {
    const data = { user: ['hello', 'world'] };
    const action = {
      type: 'DELETE_COMMENT',
      data,
    };

    expect(actions.deleteComment(data)).toEqual(action);
  });

  it('should create an action UPDATE_COMMENT', () => {
    const data = { user: ['hello', 'world'] };
    const action = {
      type: 'UPDATE_COMMENT',
      data,
    };

    expect(actions.updateComment(data)).toEqual(action);
  });
});
