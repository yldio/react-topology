'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/node/metrics.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('../prop-types');

var _shapes = require('./shapes');

var _propTypes2 = require('prop-types');

var _propTypes3 = _interopRequireDefault(_propTypes2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GraphNodeMetrics = ({ connected, metrics, pos }) => {
  const { x, y } = pos;

  const metricSpacing = 18;
  const metricsText = metrics.map((metric, index) => _react2.default.createElement(
    _shapes.GraphText,
    {
      key: index,
      x: 0,
      y: 12 + metricSpacing * index,
      connected: connected,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      },
      __self: undefined
    },
    `${metric.name}: ${metric.value}`
  ));

  return _react2.default.createElement(
    'g',
    { transform: `translate(${x}, ${y})`, __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: undefined
    },
    metricsText
  );
};

GraphNodeMetrics.propTypes = {
  connected: _propTypes3.default.bool,
  metrics: _propTypes3.default.arrayOf(_propTypes3.default.shape({
    name: _propTypes3.default.string.isRequired,
    value: _propTypes3.default.string.isRequired
  })),
  pos: _propTypes.Point.isRequired
};

exports.default = GraphNodeMetrics;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL21ldHJpY3MuanMiXSwibmFtZXMiOlsiR3JhcGhOb2RlTWV0cmljcyIsImNvbm5lY3RlZCIsIm1ldHJpY3MiLCJwb3MiLCJ4IiwieSIsIm1ldHJpY1NwYWNpbmciLCJtZXRyaWNzVGV4dCIsIm1hcCIsIm1ldHJpYyIsImluZGV4IiwibmFtZSIsInZhbHVlIiwicHJvcFR5cGVzIiwiYm9vbCIsImFycmF5T2YiLCJzaGFwZSIsInN0cmluZyIsImlzUmVxdWlyZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxtQkFBbUIsQ0FBQyxFQUFFQyxTQUFGLEVBQWFDLE9BQWIsRUFBc0JDLEdBQXRCLEVBQUQsS0FBaUM7QUFDeEQsUUFBTSxFQUFFQyxDQUFGLEVBQUtDLENBQUwsS0FBV0YsR0FBakI7O0FBRUEsUUFBTUcsZ0JBQWdCLEVBQXRCO0FBQ0EsUUFBTUMsY0FBY0wsUUFBUU0sR0FBUixDQUFZLENBQUNDLE1BQUQsRUFBU0MsS0FBVCxLQUM5QjtBQUFBO0FBQUE7QUFDRSxXQUFLQSxLQURQO0FBRUUsU0FBRyxDQUZMO0FBR0UsU0FBRyxLQUFLSixnQkFBZ0JJLEtBSDFCO0FBSUUsaUJBQVdULFNBSmI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNSSxPQUFFUSxPQUFPRSxJQUFLLEtBQUlGLE9BQU9HLEtBQU07QUFObkMsR0FEa0IsQ0FBcEI7O0FBV0EsU0FBTztBQUFBO0FBQUEsTUFBRyxXQUFZLGFBQVlSLENBQUUsS0FBSUMsQ0FBRSxHQUFuQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBd0NFO0FBQXhDLEdBQVA7QUFDRCxDQWhCRDs7QUFrQkFQLGlCQUFpQmEsU0FBakIsR0FBNkI7QUFDM0JaLGFBQVcsb0JBQVVhLElBRE07QUFFM0JaLFdBQVMsb0JBQVVhLE9BQVYsQ0FDUCxvQkFBVUMsS0FBVixDQUFnQjtBQUNkTCxVQUFNLG9CQUFVTSxNQUFWLENBQWlCQyxVQURUO0FBRWROLFdBQU8sb0JBQVVLLE1BQVYsQ0FBaUJDO0FBRlYsR0FBaEIsQ0FETyxDQUZrQjtBQVEzQmYsT0FBSyxpQkFBTWU7QUFSZ0IsQ0FBN0I7O2tCQVdlbEIsZ0IiLCJmaWxlIjoibWV0cmljcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgR3JhcGhUZXh0IH0gZnJvbSAnLi9zaGFwZXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY29uc3QgR3JhcGhOb2RlTWV0cmljcyA9ICh7IGNvbm5lY3RlZCwgbWV0cmljcywgcG9zIH0pID0+IHtcbiAgY29uc3QgeyB4LCB5IH0gPSBwb3M7XG5cbiAgY29uc3QgbWV0cmljU3BhY2luZyA9IDE4O1xuICBjb25zdCBtZXRyaWNzVGV4dCA9IG1ldHJpY3MubWFwKChtZXRyaWMsIGluZGV4KSA9PiAoXG4gICAgPEdyYXBoVGV4dFxuICAgICAga2V5PXtpbmRleH1cbiAgICAgIHg9ezB9XG4gICAgICB5PXsxMiArIG1ldHJpY1NwYWNpbmcgKiBpbmRleH1cbiAgICAgIGNvbm5lY3RlZD17Y29ubmVjdGVkfVxuICAgID5cbiAgICAgIHtgJHttZXRyaWMubmFtZX06ICR7bWV0cmljLnZhbHVlfWB9XG4gICAgPC9HcmFwaFRleHQ+XG4gICkpO1xuXG4gIHJldHVybiA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHt4fSwgJHt5fSlgfT57bWV0cmljc1RleHR9PC9nPjtcbn07XG5cbkdyYXBoTm9kZU1ldHJpY3MucHJvcFR5cGVzID0ge1xuICBjb25uZWN0ZWQ6IFByb3BUeXBlcy5ib29sLFxuICBtZXRyaWNzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxuICAgIH0pXG4gICksXG4gIHBvczogUG9pbnQuaXNSZXF1aXJlZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgR3JhcGhOb2RlTWV0cmljcztcbiJdfQ==