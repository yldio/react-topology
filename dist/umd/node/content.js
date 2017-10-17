'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/node/content.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _shapes = require('./shapes');

var _info = require('./info');

var _info2 = _interopRequireDefault(_info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GraphNodeContent = ({
  child = false,
  data,
  y = _constants2.default.contentRect.y,
  index = 0
}) => {
  const { x, width } = _constants2.default.contentRect;

  const nodeInfoPos = child ? {
    x: _constants2.default.infoPosition.x,
    y: _constants2.default.infoPosition.y + 21
  } : _constants2.default.infoPosition;

  const nodeSubtitle = child ? _react2.default.createElement(
    _shapes.GraphSubtitle,
    Object.assign({}, _constants2.default.subtitlePosition, {
      consul: data.isConsul,
      active: data.instancesActive,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: undefined
    }),
    data.name
  ) : null;

  const nodeInfo = _react2.default.createElement(_info2.default, { data: data, pos: nodeInfoPos, __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: undefined
  });

  return _react2.default.createElement(
    'g',
    { transform: `translate(${x}, ${y})`, __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: undefined
    },
    _react2.default.createElement(_shapes.GraphLine, {
      x1: 0,
      y1: 0,
      x2: width,
      y2: 0,
      consul: data.isConsul,
      active: data.instancesActive,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      },
      __self: undefined
    }),
    nodeSubtitle,
    nodeInfo
  );
};

GraphNodeContent.propTypes = {
  child: _propTypes2.default.bool,
  data: _propTypes2.default.object.isRequired,
  index: _propTypes2.default.number
};

exports.default = GraphNodeContent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2NvbnRlbnQuanMiXSwibmFtZXMiOlsiR3JhcGhOb2RlQ29udGVudCIsImNoaWxkIiwiZGF0YSIsInkiLCJjb250ZW50UmVjdCIsImluZGV4IiwieCIsIndpZHRoIiwibm9kZUluZm9Qb3MiLCJpbmZvUG9zaXRpb24iLCJub2RlU3VidGl0bGUiLCJzdWJ0aXRsZVBvc2l0aW9uIiwiaXNDb25zdWwiLCJpbnN0YW5jZXNBY3RpdmUiLCJuYW1lIiwibm9kZUluZm8iLCJwcm9wVHlwZXMiLCJib29sIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsIm51bWJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxtQkFBbUIsQ0FBQztBQUN4QkMsVUFBUSxLQURnQjtBQUV4QkMsTUFGd0I7QUFHeEJDLE1BQUksb0JBQVVDLFdBQVYsQ0FBc0JELENBSEY7QUFJeEJFLFVBQVE7QUFKZ0IsQ0FBRCxLQUtuQjtBQUNKLFFBQU0sRUFBRUMsQ0FBRixFQUFLQyxLQUFMLEtBQWUsb0JBQVVILFdBQS9COztBQUVBLFFBQU1JLGNBQWNQLFFBQ2hCO0FBQ0VLLE9BQUcsb0JBQVVHLFlBQVYsQ0FBdUJILENBRDVCO0FBRUVILE9BQUcsb0JBQVVNLFlBQVYsQ0FBdUJOLENBQXZCLEdBQTJCO0FBRmhDLEdBRGdCLEdBS2hCLG9CQUFVTSxZQUxkOztBQU9BLFFBQU1DLGVBQWVULFFBQ25CO0FBQUE7QUFBQSxzQkFDTSxvQkFBVVUsZ0JBRGhCO0FBRUUsY0FBUVQsS0FBS1UsUUFGZjtBQUdFLGNBQVFWLEtBQUtXLGVBSGY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLR1gsU0FBS1k7QUFMUixHQURtQixHQVFqQixJQVJKOztBQVVBLFFBQU1DLFdBQVcsZ0RBQWUsTUFBTWIsSUFBckIsRUFBMkIsS0FBS00sV0FBaEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQWpCOztBQUVBLFNBQ0U7QUFBQTtBQUFBLE1BQUcsV0FBWSxhQUFZRixDQUFFLEtBQUlILENBQUUsR0FBbkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0U7QUFDRSxVQUFJLENBRE47QUFFRSxVQUFJLENBRk47QUFHRSxVQUFJSSxLQUhOO0FBSUUsVUFBSSxDQUpOO0FBS0UsY0FBUUwsS0FBS1UsUUFMZjtBQU1FLGNBQVFWLEtBQUtXLGVBTmY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFERjtBQVNHSCxnQkFUSDtBQVVHSztBQVZILEdBREY7QUFjRCxDQXpDRDs7QUEyQ0FmLGlCQUFpQmdCLFNBQWpCLEdBQTZCO0FBQzNCZixTQUFPLG9CQUFVZ0IsSUFEVTtBQUUzQmYsUUFBTSxvQkFBVWdCLE1BQVYsQ0FBaUJDLFVBRkk7QUFHM0JkLFNBQU8sb0JBQVVlO0FBSFUsQ0FBN0I7O2tCQU1lcEIsZ0IiLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgR3JhcGhMaW5lLCBHcmFwaFN1YnRpdGxlIH0gZnJvbSAnLi9zaGFwZXMnO1xuaW1wb3J0IEdyYXBoTm9kZUluZm8gZnJvbSAnLi9pbmZvJztcblxuY29uc3QgR3JhcGhOb2RlQ29udGVudCA9ICh7XG4gIGNoaWxkID0gZmFsc2UsXG4gIGRhdGEsXG4gIHkgPSBDb25zdGFudHMuY29udGVudFJlY3QueSxcbiAgaW5kZXggPSAwXG59KSA9PiB7XG4gIGNvbnN0IHsgeCwgd2lkdGggfSA9IENvbnN0YW50cy5jb250ZW50UmVjdDtcblxuICBjb25zdCBub2RlSW5mb1BvcyA9IGNoaWxkXG4gICAgPyB7XG4gICAgICAgIHg6IENvbnN0YW50cy5pbmZvUG9zaXRpb24ueCxcbiAgICAgICAgeTogQ29uc3RhbnRzLmluZm9Qb3NpdGlvbi55ICsgMjFcbiAgICAgIH1cbiAgICA6IENvbnN0YW50cy5pbmZvUG9zaXRpb247XG5cbiAgY29uc3Qgbm9kZVN1YnRpdGxlID0gY2hpbGQgPyAoXG4gICAgPEdyYXBoU3VidGl0bGVcbiAgICAgIHsuLi5Db25zdGFudHMuc3VidGl0bGVQb3NpdGlvbn1cbiAgICAgIGNvbnN1bD17ZGF0YS5pc0NvbnN1bH1cbiAgICAgIGFjdGl2ZT17ZGF0YS5pbnN0YW5jZXNBY3RpdmV9XG4gICAgPlxuICAgICAge2RhdGEubmFtZX1cbiAgICA8L0dyYXBoU3VidGl0bGU+XG4gICkgOiBudWxsO1xuXG4gIGNvbnN0IG5vZGVJbmZvID0gPEdyYXBoTm9kZUluZm8gZGF0YT17ZGF0YX0gcG9zPXtub2RlSW5mb1Bvc30gLz47XG5cbiAgcmV0dXJuIChcbiAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHt4fSwgJHt5fSlgfT5cbiAgICAgIDxHcmFwaExpbmVcbiAgICAgICAgeDE9ezB9XG4gICAgICAgIHkxPXswfVxuICAgICAgICB4Mj17d2lkdGh9XG4gICAgICAgIHkyPXswfVxuICAgICAgICBjb25zdWw9e2RhdGEuaXNDb25zdWx9XG4gICAgICAgIGFjdGl2ZT17ZGF0YS5pbnN0YW5jZXNBY3RpdmV9XG4gICAgICAvPlxuICAgICAge25vZGVTdWJ0aXRsZX1cbiAgICAgIHtub2RlSW5mb31cbiAgICA8L2c+XG4gICk7XG59O1xuXG5HcmFwaE5vZGVDb250ZW50LnByb3BUeXBlcyA9IHtcbiAgY2hpbGQ6IFByb3BUeXBlcy5ib29sLFxuICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBHcmFwaE5vZGVDb250ZW50O1xuIl19