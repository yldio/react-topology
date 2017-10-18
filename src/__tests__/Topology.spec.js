import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow, render } from 'enzyme';
import { graphqlJoyent, graphql, one } from '../data';
import Topology from '../';

Enzyme.configure({ adapter: new Adapter() });
it('Mounts <Topology /> without throwing', () => {
  const tree = mount(<Topology services={graphqlJoyent} />);
  expect(tree).toMatchSnapshot();
});

it('Shallow <Topology /> without throwing', () => {
  const tree = shallow(<Topology services={graphqlJoyent} />);
  expect(tree).toMatchSnapshot();
});

it('Renders <Topology /> without throwing', () => {
  const tree = render(<Topology services={graphqlJoyent} />);
  expect(tree).toMatchSnapshot();
});

it('Renders <Topology /> with mapped options', () => {
  const tree = render(
    <Topology services={graphql} map={{ instanceStatuses: 'nodes' }} />
  );
  expect(tree).toMatchSnapshot();
});

it('Calls Quick Options', () => {
  const fn = jest.fn();
  const tree = mount(
    <Topology services={graphqlJoyent} onQuickActionsClick={fn} />
  );
  tree
    .find('.kMHeTL')
    .first()
    .simulate('click');
  expect(fn).toHaveBeenCalled();
  expect(tree).toMatchSnapshot();
});

it('Calls Title', () => {
  const fn = jest.fn();
  const tree = mount(<Topology services={graphqlJoyent} onTitleClick={fn} />);
  tree
    .find('.guGhPK')
    .first()
    .simulate('click');
  expect(fn).toHaveBeenCalled();
  expect(tree).toMatchSnapshot();
});

it('Drags node', () => {
  const tree = mount(<Topology services={graphqlJoyent} />);
  tree
    .find('.kTflvy')
    .first()
    .simulate('dragStart');
  expect(tree).toMatchSnapshot();
});

it('Drags', () => {
  const tree = mount(<Topology services={graphqlJoyent} />);
  tree
    .find('.kTflvy')
    .first()
    .simulate('mouseMove');
  expect(tree).toMatchSnapshot();

  tree
    .find('.kTflvy')
    .first()
    .simulate('mouseUp');
  expect(tree).toMatchSnapshot();

  tree
    .find('.kTflvy')
    .first()
    .simulate('touchEnd');
  expect(tree).toMatchSnapshot();

  tree
    .find('.kTflvy')
    .first()
    .simulate('touchCancel');
  expect(tree).toMatchSnapshot();
});

it('mounts <Topology /> width colors', () => {
  const tree = mount(
    <Topology
      services={graphqlJoyent}
      primaryColor="red"
      secondaryColor="blue"
    />
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
  tree.setProps({ services: graphqlJoyent });
  tree.setProps({ services: [] });
  expect(tree).toMatchSnapshot();
});

it('mounts <Topology /> with changing props', () => {
  const tree = mount(<Topology services={[]} />);
  tree.setProps({ services: one });
  tree.setProps({ services: graphqlJoyent });
  expect(tree).toMatchSnapshot();
});

it('removes eventListeners on unmount', () => {
  const tree = mount(<Topology services={one} />);
  tree.unmount();
  expect(tree).toMatchSnapshot();
});
