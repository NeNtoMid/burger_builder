import React from 'react';

import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';

import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationsItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it('should render two <NavigationItem /> components if user is not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> components if user is  authenticated', () => {
    wrapper.setProps({ isAuth: true });

    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it(`should contain <NavigationItem  destination='Logout' /> if user is authenticated`, () => {
    wrapper.setProps({ isAuth: true });
    expect(
      wrapper.contains(
        <NavigationItem destination='/logout'>Logout</NavigationItem>
      )
    ).toEqual(true);
  });
});
