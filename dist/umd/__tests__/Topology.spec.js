'use strict';

var _jsxFileName = 'src/__tests__/Topology.spec.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _data = require('../data');

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

it('renders <Topology /> without throwing', () => {
  const tree = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { services: _data.graphql, __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: undefined
  }));
  expect(tree).toMatchSnapshot();
});

it('renders <Topology /> without throwing', () => {
  const tree = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { services: _data.graphql, __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: undefined
  }));
  expect(tree).toMatchSnapshot();
});

it('renders <Topology /> without throwing', () => {
  const tree = (0, _enzyme.render)(_react2.default.createElement(_2.default, { services: _data.graphql, __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: undefined
  }));
  expect(tree).toMatchSnapshot();
});

it('renders <Topology /> without throwing', () => {
  const fn = jest.fn();
  const tree = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { services: _data.graphql, onQuickActionsClick: fn, __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: undefined
  }));
  tree.find('.kMHeTL').first().simulate('click');
  expect(fn).toHaveBeenCalled();
  expect(tree).toMatchSnapshot();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vVG9wb2xvZ3kuc3BlYy5qcyJdLCJuYW1lcyI6WyJjb25maWd1cmUiLCJhZGFwdGVyIiwiaXQiLCJ0cmVlIiwiZXhwZWN0IiwidG9NYXRjaFNuYXBzaG90IiwiZm4iLCJqZXN0IiwiZmluZCIsImZpcnN0Iiwic2ltdWxhdGUiLCJ0b0hhdmVCZWVuQ2FsbGVkIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLGlCQUFPQSxTQUFQLENBQWlCLEVBQUVDLFNBQVMsa0NBQVgsRUFBakI7O0FBRUFDLEdBQUcsdUNBQUgsRUFBNEMsTUFBTTtBQUNoRCxRQUFNQyxPQUFPLG1CQUFNLDRDQUFVLHVCQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFOLENBQWI7QUFDQUMsU0FBT0QsSUFBUCxFQUFhRSxlQUFiO0FBQ0QsQ0FIRDs7QUFLQUgsR0FBRyx1Q0FBSCxFQUE0QyxNQUFNO0FBQ2hELFFBQU1DLE9BQU8scUJBQVEsNENBQVUsdUJBQVY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQVIsQ0FBYjtBQUNBQyxTQUFPRCxJQUFQLEVBQWFFLGVBQWI7QUFDRCxDQUhEOztBQUtBSCxHQUFHLHVDQUFILEVBQTRDLE1BQU07QUFDaEQsUUFBTUMsT0FBTyxvQkFBTyw0Q0FBVSx1QkFBVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBUCxDQUFiO0FBQ0FDLFNBQU9ELElBQVAsRUFBYUUsZUFBYjtBQUNELENBSEQ7O0FBS0FILEdBQUcsdUNBQUgsRUFBNEMsTUFBTTtBQUNoRCxRQUFNSSxLQUFLQyxLQUFLRCxFQUFMLEVBQVg7QUFDQSxRQUFNSCxPQUFPLG1CQUFNLDRDQUFVLHVCQUFWLEVBQTZCLHFCQUFxQkcsRUFBbEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQU4sQ0FBYjtBQUNBSCxPQUFLSyxJQUFMLENBQVUsU0FBVixFQUFxQkMsS0FBckIsR0FBNkJDLFFBQTdCLENBQXNDLE9BQXRDO0FBQ0FOLFNBQU9FLEVBQVAsRUFBV0ssZ0JBQVg7QUFDQVAsU0FBT0QsSUFBUCxFQUFhRSxlQUFiO0FBQ0QsQ0FORCIsImZpbGUiOiJUb3BvbG9neS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBBZGFwdGVyIGZyb20gJ2VuenltZS1hZGFwdGVyLXJlYWN0LTE2JztcbmltcG9ydCBFbnp5bWUsIHsgbW91bnQsIHNoYWxsb3csIHJlbmRlciB9IGZyb20gJ2VuenltZSc7XG5pbXBvcnQgeyBncmFwaHFsIH0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQgVG9wb2xvZ3kgZnJvbSAnLi4vJztcblxuRW56eW1lLmNvbmZpZ3VyZSh7IGFkYXB0ZXI6IG5ldyBBZGFwdGVyKCkgfSk7XG5cbml0KCdyZW5kZXJzIDxUb3BvbG9neSAvPiB3aXRob3V0IHRocm93aW5nJywgKCkgPT4ge1xuICBjb25zdCB0cmVlID0gbW91bnQoPFRvcG9sb2d5IHNlcnZpY2VzPXtncmFwaHFsfSAvPik7XG4gIGV4cGVjdCh0cmVlKS50b01hdGNoU25hcHNob3QoKTtcbn0pO1xuXG5pdCgncmVuZGVycyA8VG9wb2xvZ3kgLz4gd2l0aG91dCB0aHJvd2luZycsICgpID0+IHtcbiAgY29uc3QgdHJlZSA9IHNoYWxsb3coPFRvcG9sb2d5IHNlcnZpY2VzPXtncmFwaHFsfSAvPik7XG4gIGV4cGVjdCh0cmVlKS50b01hdGNoU25hcHNob3QoKTtcbn0pO1xuXG5pdCgncmVuZGVycyA8VG9wb2xvZ3kgLz4gd2l0aG91dCB0aHJvd2luZycsICgpID0+IHtcbiAgY29uc3QgdHJlZSA9IHJlbmRlcig8VG9wb2xvZ3kgc2VydmljZXM9e2dyYXBocWx9IC8+KTtcbiAgZXhwZWN0KHRyZWUpLnRvTWF0Y2hTbmFwc2hvdCgpO1xufSk7XG5cbml0KCdyZW5kZXJzIDxUb3BvbG9neSAvPiB3aXRob3V0IHRocm93aW5nJywgKCkgPT4ge1xuICBjb25zdCBmbiA9IGplc3QuZm4oKTtcbiAgY29uc3QgdHJlZSA9IG1vdW50KDxUb3BvbG9neSBzZXJ2aWNlcz17Z3JhcGhxbH0gb25RdWlja0FjdGlvbnNDbGljaz17Zm59IC8+KTtcbiAgdHJlZS5maW5kKCcua01IZVRMJykuZmlyc3QoKS5zaW11bGF0ZSgnY2xpY2snKTtcbiAgZXhwZWN0KGZuKS50b0hhdmVCZWVuQ2FsbGVkKClcbiAgZXhwZWN0KHRyZWUpLnRvTWF0Y2hTbmFwc2hvdCgpO1xufSk7XG4iXX0=