import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow, render } from 'enzyme';
import { graphql } from '../data';
import Topology from '../';

Enzyme.configure({ adapter: new Adapter() });

it('renders <Topology /> without throwing', () => {
  const tree = mount(<Topology services={graphql} />);
  expect(tree).toMatchSnapshot();
});

it('renders <Topology /> without throwing', () => {
  const tree = shallow(<Topology services={graphql} />);
  expect(tree).toMatchSnapshot();
});

it('renders <Topology /> without throwing', () => {
  const tree = render(<Topology services={graphql} />);
  expect(tree).toMatchSnapshot();
});

it('renders <Topology /> without throwing', () => {
  const fn = jest.fn();
  const tree = mount(<Topology services={graphql} onQuickActionsClick={fn} />);
  tree.find('.kMHeTL').first().simulate('click');
  expect(fn).toHaveBeenCalled()
  expect(tree).toMatchSnapshot();
});
