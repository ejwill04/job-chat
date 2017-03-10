/* eslint no-undef: 0 */
import user from '../../app/reducers/userReducer';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(user(undefined, {})).toEqual({});
  });

  it('SET_ACTIVE_USER should replace undefined state', () => {
    const action = { comment: 'do a thing' };
    expect(user(undefined, action)).toEqual({});
  });
});
