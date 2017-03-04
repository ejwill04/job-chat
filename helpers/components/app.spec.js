/* eslint no-undef: 0 */
import React from 'react';
import { mount, render } from 'enzyme';

import AppContainer from '../../app/containers/AppContainer';
import App from '../../app/components/app';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
const fakeStore = configureMockStore()({ companies: [] });

const setup = () => {
  const props = {
    handleSubmit: jest.fn(),
  };

  const wrapper = render(
    // <Provider store={fakeStore}>
      <App {...props} />
    // </Provider>
  );

  const Component = wrapper.find(Companies);

  return {
    props,
    Component,
  };
};

describe('components', () => {
  describe('Companies', () => {
    it('should render something', () => {
      const { Component } = setup();

      expect(Component.find('h3').length).toEqual(1);

      expect(Component.length).toEqual(1);
    });

    it('should call addTodo when Add Todo button is clicked', () => {
      const { props, Component } = setup();

      let form = Component.find('form');

      form.simulate('submit');
      console.log(props);
      expect(props.handleSubmit).toBeCalled();

    // Or to verify how many times a function has been called
      expect(props.handleSubmit.mock.calls.length).toBe(1);
    });
  });
});

describe('test with mock localStorage', () => {
  const localStoarge = [{ thing: 'thing2' }];
  afterEach(() => {
    localStorage.clear();
// remove callback
    localStorage.itemInsertionCallback = null;
  });
    it.skip('emulate quota exceeded error', () => {
      localStorage.length.should.equal(0);
// register callback
      localStorage.itemInsertionCallback = (len) => {
        if (len >= 5) {
          let err = new Error('Mock localStorage quota exceeded');
          err.code = 22;
          throw err;
        }
      };
      let handled = false;
      try {
        for (let i = 0; i < 10; ++i) {
          localStorage.setItem(i, i);
        }
      } catch (e) {
        if (e.code === 22) {
                // handle quota exceeded error
          handled = true;
        }
      }
      handled.should.be.true;
      localStorage.length.should.equal(5);
    });
});
