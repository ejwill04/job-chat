/* eslint no-undef: 0 */
import React from 'react';
import { mount, render } from 'enzyme';

import App from '../../app/components/app';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import rootReducer from '../../app/reducers';
// const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// const store = createStore(rootReducer, devTools);

const setup = () => {
  const props = {
    handleSubmit: jest.fn(),
  };

  const wrapper = render(
    <App {...props} />
  );

  const Component = wrapper.find(App);

  return {
    props,
    Component,
  };
};

describe('components', () => {
  describe('App', () => {
    it.skip('should render something', () => {
      const { Component } = setup();

      expect(Component.find('toggleLogoutBtn').length).toEqual(1);
      // console.log(Component.find('props'))
      expect(Component.length).toEqual(1);
    });

    it.skip('should call addTodo when Add Todo button is clicked', () => {
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
