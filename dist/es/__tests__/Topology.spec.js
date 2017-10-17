var _jsxFileName = 'src/__tests__/Topology.spec.js',
    _this = this;

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow, render } from 'enzyme';
import { graphql } from '../data';
import Topology from '../';

Enzyme.configure({ adapter: new Adapter() });

it('renders <Topology /> without throwing', function () {
  var tree = mount(React.createElement(Topology, { services: graphql, __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: _this
  }));
  expect(tree).toMatchSnapshot();
});

it('renders <Topology /> without throwing', function () {
  var tree = shallow(React.createElement(Topology, { services: graphql, __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: _this
  }));
  expect(tree).toMatchSnapshot();
});

it('renders <Topology /> without throwing', function () {
  var tree = render(React.createElement(Topology, { services: graphql, __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: _this
  }));
  expect(tree).toMatchSnapshot();
});

it('renders <Topology /> without throwing', function () {
  var fn = jest.fn();
  var tree = mount(React.createElement(Topology, { services: graphql, onQuickActionsClick: fn, __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: _this
  }));
  tree.find('.kMHeTL').first().simulate('click');
  expect(fn).toHaveBeenCalled();
  expect(tree).toMatchSnapshot();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vVG9wb2xvZ3kuc3BlYy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkFkYXB0ZXIiLCJFbnp5bWUiLCJtb3VudCIsInNoYWxsb3ciLCJyZW5kZXIiLCJncmFwaHFsIiwiVG9wb2xvZ3kiLCJjb25maWd1cmUiLCJhZGFwdGVyIiwiaXQiLCJ0cmVlIiwiZXhwZWN0IiwidG9NYXRjaFNuYXBzaG90IiwiZm4iLCJqZXN0IiwiZmluZCIsImZpcnN0Iiwic2ltdWxhdGUiLCJ0b0hhdmVCZWVuQ2FsbGVkIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQix5QkFBcEI7QUFDQSxPQUFPQyxNQUFQLElBQWlCQyxLQUFqQixFQUF3QkMsT0FBeEIsRUFBaUNDLE1BQWpDLFFBQStDLFFBQS9DO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixTQUF4QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsS0FBckI7O0FBRUFMLE9BQU9NLFNBQVAsQ0FBaUIsRUFBRUMsU0FBUyxJQUFJUixPQUFKLEVBQVgsRUFBakI7O0FBRUFTLEdBQUcsdUNBQUgsRUFBNEMsWUFBTTtBQUNoRCxNQUFNQyxPQUFPUixNQUFNLG9CQUFDLFFBQUQsSUFBVSxVQUFVRyxPQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTixDQUFiO0FBQ0FNLFNBQU9ELElBQVAsRUFBYUUsZUFBYjtBQUNELENBSEQ7O0FBS0FILEdBQUcsdUNBQUgsRUFBNEMsWUFBTTtBQUNoRCxNQUFNQyxPQUFPUCxRQUFRLG9CQUFDLFFBQUQsSUFBVSxVQUFVRSxPQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBUixDQUFiO0FBQ0FNLFNBQU9ELElBQVAsRUFBYUUsZUFBYjtBQUNELENBSEQ7O0FBS0FILEdBQUcsdUNBQUgsRUFBNEMsWUFBTTtBQUNoRCxNQUFNQyxPQUFPTixPQUFPLG9CQUFDLFFBQUQsSUFBVSxVQUFVQyxPQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBUCxDQUFiO0FBQ0FNLFNBQU9ELElBQVAsRUFBYUUsZUFBYjtBQUNELENBSEQ7O0FBS0FILEdBQUcsdUNBQUgsRUFBNEMsWUFBTTtBQUNoRCxNQUFNSSxLQUFLQyxLQUFLRCxFQUFMLEVBQVg7QUFDQSxNQUFNSCxPQUFPUixNQUFNLG9CQUFDLFFBQUQsSUFBVSxVQUFVRyxPQUFwQixFQUE2QixxQkFBcUJRLEVBQWxEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFOLENBQWI7QUFDQUgsT0FBS0ssSUFBTCxDQUFVLFNBQVYsRUFBcUJDLEtBQXJCLEdBQTZCQyxRQUE3QixDQUFzQyxPQUF0QztBQUNBTixTQUFPRSxFQUFQLEVBQVdLLGdCQUFYO0FBQ0FQLFNBQU9ELElBQVAsRUFBYUUsZUFBYjtBQUNELENBTkQiLCJmaWxlIjoiVG9wb2xvZ3kuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQWRhcHRlciBmcm9tICdlbnp5bWUtYWRhcHRlci1yZWFjdC0xNic7XG5pbXBvcnQgRW56eW1lLCB7IG1vdW50LCBzaGFsbG93LCByZW5kZXIgfSBmcm9tICdlbnp5bWUnO1xuaW1wb3J0IHsgZ3JhcGhxbCB9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IFRvcG9sb2d5IGZyb20gJy4uLyc7XG5cbkVuenltZS5jb25maWd1cmUoeyBhZGFwdGVyOiBuZXcgQWRhcHRlcigpIH0pO1xuXG5pdCgncmVuZGVycyA8VG9wb2xvZ3kgLz4gd2l0aG91dCB0aHJvd2luZycsICgpID0+IHtcbiAgY29uc3QgdHJlZSA9IG1vdW50KDxUb3BvbG9neSBzZXJ2aWNlcz17Z3JhcGhxbH0gLz4pO1xuICBleHBlY3QodHJlZSkudG9NYXRjaFNuYXBzaG90KCk7XG59KTtcblxuaXQoJ3JlbmRlcnMgPFRvcG9sb2d5IC8+IHdpdGhvdXQgdGhyb3dpbmcnLCAoKSA9PiB7XG4gIGNvbnN0IHRyZWUgPSBzaGFsbG93KDxUb3BvbG9neSBzZXJ2aWNlcz17Z3JhcGhxbH0gLz4pO1xuICBleHBlY3QodHJlZSkudG9NYXRjaFNuYXBzaG90KCk7XG59KTtcblxuaXQoJ3JlbmRlcnMgPFRvcG9sb2d5IC8+IHdpdGhvdXQgdGhyb3dpbmcnLCAoKSA9PiB7XG4gIGNvbnN0IHRyZWUgPSByZW5kZXIoPFRvcG9sb2d5IHNlcnZpY2VzPXtncmFwaHFsfSAvPik7XG4gIGV4cGVjdCh0cmVlKS50b01hdGNoU25hcHNob3QoKTtcbn0pO1xuXG5pdCgncmVuZGVycyA8VG9wb2xvZ3kgLz4gd2l0aG91dCB0aHJvd2luZycsICgpID0+IHtcbiAgY29uc3QgZm4gPSBqZXN0LmZuKCk7XG4gIGNvbnN0IHRyZWUgPSBtb3VudCg8VG9wb2xvZ3kgc2VydmljZXM9e2dyYXBocWx9IG9uUXVpY2tBY3Rpb25zQ2xpY2s9e2ZufSAvPik7XG4gIHRyZWUuZmluZCgnLmtNSGVUTCcpLmZpcnN0KCkuc2ltdWxhdGUoJ2NsaWNrJyk7XG4gIGV4cGVjdChmbikudG9IYXZlQmVlbkNhbGxlZCgpXG4gIGV4cGVjdCh0cmVlKS50b01hdGNoU25hcHNob3QoKTtcbn0pO1xuIl19