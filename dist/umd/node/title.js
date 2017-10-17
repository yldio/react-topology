'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/node/title.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _shapes = require('./shapes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GraphNodeTitle = ({ data, onNodeTitleClick }) => _react2.default.createElement(
  'g',
  {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: undefined
  },
  _react2.default.createElement(
    _shapes.GraphTitle,
    {
      x: _constants2.default.paddingLeft,
      y: 30,
      onClick: onNodeTitleClick,
      onKeyDown: onNodeTitleClick,
      consul: data.isConsul,
      active: data.instancesActive,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      },
      __self: undefined
    },
    data.name
  )
);

GraphNodeTitle.propTypes = {
  data: _propTypes2.default.object.isRequired,
  onNodeTitleClick: _propTypes2.default.func
};

exports.default = GraphNodeTitle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL3RpdGxlLmpzIl0sIm5hbWVzIjpbIkdyYXBoTm9kZVRpdGxlIiwiZGF0YSIsIm9uTm9kZVRpdGxlQ2xpY2siLCJwYWRkaW5nTGVmdCIsImlzQ29uc3VsIiwiaW5zdGFuY2VzQWN0aXZlIiwibmFtZSIsInByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxNQUFNQSxpQkFBaUIsQ0FBQyxFQUFFQyxJQUFGLEVBQVFDLGdCQUFSLEVBQUQsS0FDckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsU0FBRyxvQkFBVUMsV0FEZjtBQUVFLFNBQUcsRUFGTDtBQUdFLGVBQVNELGdCQUhYO0FBSUUsaUJBQVdBLGdCQUpiO0FBS0UsY0FBUUQsS0FBS0csUUFMZjtBQU1FLGNBQVFILEtBQUtJLGVBTmY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRR0osU0FBS0s7QUFSUjtBQURGLENBREY7O0FBZUFOLGVBQWVPLFNBQWYsR0FBMkI7QUFDekJOLFFBQU0sb0JBQVVPLE1BQVYsQ0FBaUJDLFVBREU7QUFFekJQLG9CQUFrQixvQkFBVVE7QUFGSCxDQUEzQjs7a0JBS2VWLGMiLCJmaWxlIjoidGl0bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IEdyYXBoVGl0bGUgfSBmcm9tICcuL3NoYXBlcyc7XG5cbmNvbnN0IEdyYXBoTm9kZVRpdGxlID0gKHsgZGF0YSwgb25Ob2RlVGl0bGVDbGljayB9KSA9PiAoXG4gIDxnPlxuICAgIDxHcmFwaFRpdGxlXG4gICAgICB4PXtDb25zdGFudHMucGFkZGluZ0xlZnR9XG4gICAgICB5PXszMH1cbiAgICAgIG9uQ2xpY2s9e29uTm9kZVRpdGxlQ2xpY2t9XG4gICAgICBvbktleURvd249e29uTm9kZVRpdGxlQ2xpY2t9XG4gICAgICBjb25zdWw9e2RhdGEuaXNDb25zdWx9XG4gICAgICBhY3RpdmU9e2RhdGEuaW5zdGFuY2VzQWN0aXZlfVxuICAgID5cbiAgICAgIHtkYXRhLm5hbWV9XG4gICAgPC9HcmFwaFRpdGxlPlxuICA8L2c+XG4pO1xuXG5HcmFwaE5vZGVUaXRsZS5wcm9wVHlwZXMgPSB7XG4gIGRhdGE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgb25Ob2RlVGl0bGVDbGljazogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdyYXBoTm9kZVRpdGxlO1xuIl19