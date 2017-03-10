/* eslint no-undef: 0 */
import company from '../../app/reducers/companyReducer';

describe('company reducer', () => {
  it('should return the initial state', () => {
    expect(company(undefined, {})).toEqual([]);
  });

  it('ADD_COMMENT should replace undefined state', () => {
    const action = { comment: 'do a thing' };
    expect(company(undefined, action)).toEqual([]);
  });
});
