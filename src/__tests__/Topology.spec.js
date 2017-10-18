import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow, render } from 'enzyme';
import { graphql, one } from '../data';
import Topology from '../';

Enzyme.configure({ adapter: new Adapter() });
it('Mounts <Topology /> without throwing', () => {
  const tree = mount(<Topology services={graphql} />);
  expect(tree).toMatchSnapshot();
});

it('Shallow <Topology /> without throwing', () => {
  const tree = shallow(<Topology services={graphql} />);
  expect(tree).toMatchSnapshot();
});

it('Renders <Topology /> without throwing', () => {
  const tree = render(<Topology services={graphql} />);
  expect(tree).toMatchSnapshot();
});

it('Calls Quick Options', () => {
  const fn = jest.fn();
  const tree = mount(<Topology services={graphql} onQuickActionsClick={fn} />);
  tree
    .find('.kMHeTL')
    .first()
    .simulate('click');
  expect(fn).toHaveBeenCalled();
  expect(tree).toMatchSnapshot();
});

it('mounts <Topology /> width colors', () => {
  const tree = mount(
    <Topology services={graphql} primaryColor="red" secondaryColor="blue" />
  );
  expect(tree).toMatchSnapshot();
});

it('mounts <Topology /> with only name', () => {
  const tree = mount(<Topology services={one} />);
  expect(tree).toMatchSnapshot();
});

it('mounts <Topology /> with nothing', () => {
  const tree = mount(<Topology services={[]} />);
  expect(tree).toMatchSnapshot();
});

it('mounts <Topology /> with changing props', () => {
  const tree = mount(<Topology services={one} />);
  tree.setProps({ services: graphql });
  tree.setProps({ services: [] });
  expect(tree).toMatchSnapshot();
});

it('mounts <Topology /> with changing props', () => {
  const tree = mount(<Topology services={[]} />);
  tree.setProps({ services: one });
  tree.setProps({ services: graphql });
  expect(tree).toMatchSnapshot();
});

it('removes eventListeners on unmount', () => {
  const tree = mount(<Topology services={one} />);
  tree.unmount();
  expect(tree).toMatchSnapshot();
});
