// class LocalStorage {
//   constructor() {
//     this.state = {}
//   }
//
//   setItem(name, string) {
//     this.state[name] = string
//   }
//
//   getItem(name) {
//     return this.state[name]
//   }
//
//   clear() {
//     this.state = {}
//   }
// }
//
// localStorage = new LocalStorage()
// console.log(localStorage)

/* eslint no-undef: 0 */
import React from 'react';
import { mount, shallow } from 'enzyme';

import AppContainer from '../../app/containers/AppContainer';
import { Companies } from '../../app/components/companies';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
const fakeStore = configureMockStore()({ companies: [] });

const setup = () => {
  const props = {
    // companies: ['company': 'co1'],
    companies: jest.fn(),
  };

  const wrapper = mount(
    <Companies companies={[{ _id: 'b', name: 'c' }]} />
  );

  const Component = wrapper.find(Companies);

  return {
    props,
    Component,
  };
};

describe('components', () => {
  describe('Companies', () => {
    it('should render a h3 tag', () => {
      const { Component } = setup();

      expect(Component.find('h3').length).toEqual(1);

      expect(Component.length).toEqual(1);
    });

    it('should render a class of app-body', () => {
      const { Component } = setup();

      expect(Component.find('.app-body').length).toEqual(1);
    });

    it('should have props of companies with a length of three', () => {
      const { Component } = setup();
      expect(Component.props().companies.length).toEqual(1);
    });

    it('should have props of companies', () => {
      const { Component } = setup();
      expect(Component.props().companies).toEqual([{ _id: 'b', name: 'c' }]);
    });

    it('should have props of companies', () => {
      const { Component } = setup();
      expect(Component.props().companies).toEqual([{ _id: 'b', name: 'c' }]);
    });

    it.skip('Link should have props', () => {
      const wrapper = shallow(
        <Provider store={fakeStore}>
          <Companies companies={[1, 2, 3]} />
        </Provider>
      );
      const Link = wrapper.find('Link');
      expect(Link.props).to.equal(true);
    });
  });
});
