/* eslint no-undef: 0 */
import companies from '../../app/reducers/companiesReducer';

describe('companies reducer', () => {
  it('should return the initial state', () => {
    expect(companies(undefined, {})).toEqual([]);
  });

  it('ADD_COMPANIES should replace undefined state', () => {
    const action = { companies: 'Amazon' };
    expect(companies(undefined, action)).toEqual([]);
  });
});
