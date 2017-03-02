import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from '../setup';
import configureMockStore from 'redux-mock-store';
const fakeStore = configureMockStore()

import App from '../../app/components/app';
import { Provider } from 'react-redux';

describe('<App />', function () {
  describe('when visiting the home page', function () {
    let wrapper;

    it.skip('should show text "Neumann"', () => {
      wrapper = shallow(
        <Provider>
          <App />
        </Provider>
      );
      expect(wrapper.find('h1')).to.have.text('Neumann');
    });

    it.skip('has a componentDidMount method', () => {
      sinon.spy(App.prototype, 'componentDidMount');
      mount(<App />);
      expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
    });

    it.skip('will Link to / when location is /favorites', () => {
      sinon.spy(App.prototype, 'toggleBtnPath');
      mount(<App />);
      expect(App.prototype.toggleBtnPath.calledOnce).to.equal(true);
    });
  });
});
