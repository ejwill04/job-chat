import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';

import mapDispatchToProps from '../../app/containers/AppContainer';

describe('mapStateToProps', () => {

  it.skip('should be a function', () => {
    assert.isFunction(mapStateToProps)
  })

})

describe('mapDispatchToProps', () => {

  it.skip('should be a function', () => {
    expect(mapDispatchToProps).toEqual(1);
  })

})
