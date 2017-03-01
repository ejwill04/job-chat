import React from 'react';
import { mount, shallow } from 'enzyme';

import AppContainer from '../../app/containers/AppContainer';
import Companies from '../../app/components/companies';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
const fakeStore = configureMockStore()({companies: []});

const setup = () => {
  const props = {
    companies: ['company': 'co1'],
    // companies: jest.fn(),
  }

  const wrapper = mount(
    <Provider store={fakeStore}>
      <Companies {...props} />
    </Provider>


  )

  const Component = wrapper.find(Companies)

  return {
    props,
    Component
  }
}

describe('components', () => {
  describe('Companies', () => {

  it('should render a h3 tag', () => {
      const { Component } = setup()

      expect(Component.find('h3').length).toEqual(1)

      expect(Component.length).toEqual(1)
    })

  it('should render a class of app-body', () => {
      const { Component } = setup()

      expect(Component.find('.app-body').length).toEqual(1)
    })

  })
})
