'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/link/index.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shapes = require('./shapes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GraphLink = ({ data, index }) => {
  const { sourcePosition, targetPosition } = data;

  return _react2.default.createElement(_shapes.GraphLinkLine, {
    x1: sourcePosition.x,
    x2: targetPosition.x,
    y1: sourcePosition.y,
    y2: targetPosition.y,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: undefined
  });
};

GraphLink.propTypes = {
  data: _propTypes2.default.object.isRequired,
  index: _propTypes2.default.number
};

exports.default = GraphLink;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saW5rL2luZGV4LmpzIl0sIm5hbWVzIjpbIkdyYXBoTGluayIsImRhdGEiLCJpbmRleCIsInNvdXJjZVBvc2l0aW9uIiwidGFyZ2V0UG9zaXRpb24iLCJ4IiwieSIsInByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJudW1iZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxNQUFNQSxZQUFZLENBQUMsRUFBRUMsSUFBRixFQUFRQyxLQUFSLEVBQUQsS0FBcUI7QUFDckMsUUFBTSxFQUFFQyxjQUFGLEVBQWtCQyxjQUFsQixLQUFxQ0gsSUFBM0M7O0FBRUEsU0FDRTtBQUNFLFFBQUlFLGVBQWVFLENBRHJCO0FBRUUsUUFBSUQsZUFBZUMsQ0FGckI7QUFHRSxRQUFJRixlQUFlRyxDQUhyQjtBQUlFLFFBQUlGLGVBQWVFLENBSnJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREY7QUFRRCxDQVhEOztBQWFBTixVQUFVTyxTQUFWLEdBQXNCO0FBQ3BCTixRQUFNLG9CQUFVTyxNQUFWLENBQWlCQyxVQURIO0FBRXBCUCxTQUFPLG9CQUFVUTtBQUZHLENBQXRCOztrQkFLZVYsUyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgR3JhcGhMaW5rTGluZSB9IGZyb20gJy4vc2hhcGVzJztcblxuY29uc3QgR3JhcGhMaW5rID0gKHsgZGF0YSwgaW5kZXggfSkgPT4ge1xuICBjb25zdCB7IHNvdXJjZVBvc2l0aW9uLCB0YXJnZXRQb3NpdGlvbiB9ID0gZGF0YTtcblxuICByZXR1cm4gKFxuICAgIDxHcmFwaExpbmtMaW5lXG4gICAgICB4MT17c291cmNlUG9zaXRpb24ueH1cbiAgICAgIHgyPXt0YXJnZXRQb3NpdGlvbi54fVxuICAgICAgeTE9e3NvdXJjZVBvc2l0aW9uLnl9XG4gICAgICB5Mj17dGFyZ2V0UG9zaXRpb24ueX1cbiAgICAvPlxuICApO1xufTtcblxuR3JhcGhMaW5rLnByb3BUeXBlcyA9IHtcbiAgZGF0YTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBpbmRleDogUHJvcFR5cGVzLm51bWJlclxufTtcblxuZXhwb3J0IGRlZmF1bHQgR3JhcGhMaW5rO1xuIl19