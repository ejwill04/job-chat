/* eslint no-undef: 0 */
import React from 'react';
import { mount } from 'enzyme';

import { Company } from '../../app/components/company';

import configureMockStore from 'redux-mock-store';
// const fakeStore = configureMockStore()({ companies: [], localStorage: [] });

const setup = () => {
  const props = {
    companies: jest.fn(),
  };

  const wrapper = mount(
    <Company company={[{ _id: 'b', name: 'c' }]} />
  );

  const Component = wrapper.find(Companies);

  return {
    props,
    Component,
  };
};

describe('components', () => {
  describe('Company', () => {
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
  });
});
