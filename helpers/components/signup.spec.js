import React from 'react'
import { Link } from 'react-router'
import { Provider } from 'react-redux'
import { expect, assert } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import Login from '../../app/components/login'

describe('Login', ()=> {
  it.skip('renders a link to surround every button', () => {
    const wrapper = shallow(<Login store={{}} />);
    expect(wrapper.find('Link').length).toEqual(1);
  });
});
