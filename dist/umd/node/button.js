'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/node/button.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _shapes = require('./shapes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NodeButton = ({ onButtonClick, index, isConsul, instancesActive }) => {
  const { x, y, width, height } = _constants2.default.buttonRect;

  const buttonCircleRadius = 2;
  const buttonCircleSpacing = 2;
  const buttonCircleY = (height - buttonCircleRadius * 4 - buttonCircleSpacing * 2) / 2;

  const buttonCircles = [1, 2, 3].map((item, index) => _react2.default.createElement(_shapes.GraphButtonCircle, {
    cx: width / 2,
    cy: buttonCircleY + (buttonCircleRadius * 2 + buttonCircleSpacing) * index,
    key: index,
    r: 2,
    consul: isConsul,
    active: instancesActive,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: undefined
  }));

  return _react2.default.createElement(
    'g',
    { transform: `translate(${x}, ${y})`, __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: undefined
    },
    _react2.default.createElement(_shapes.GraphLine, {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: height,
      consul: isConsul,
      active: instancesActive,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: undefined
    }),
    buttonCircles,
    _react2.default.createElement(_shapes.GraphButtonRect, {
      height: height,
      onClick: onButtonClick,
      onKeyDown: onButtonClick,
      width: width,
      role: 'button',
      tabIndex: 100 + index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      },
      __self: undefined
    })
  );
};

NodeButton.propTypes = {
  index: _propTypes2.default.number.isRequired,
  onButtonClick: _propTypes2.default.func.isRequired,
  isConsul: _propTypes2.default.bool,
  instancesActive: _propTypes2.default.bool
};

exports.default = NodeButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2J1dHRvbi5qcyJdLCJuYW1lcyI6WyJOb2RlQnV0dG9uIiwib25CdXR0b25DbGljayIsImluZGV4IiwiaXNDb25zdWwiLCJpbnN0YW5jZXNBY3RpdmUiLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0IiwiYnV0dG9uUmVjdCIsImJ1dHRvbkNpcmNsZVJhZGl1cyIsImJ1dHRvbkNpcmNsZVNwYWNpbmciLCJidXR0b25DaXJjbGVZIiwiYnV0dG9uQ2lyY2xlcyIsIm1hcCIsIml0ZW0iLCJwcm9wVHlwZXMiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwiZnVuYyIsImJvb2wiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLE1BQU1BLGFBQWEsQ0FBQyxFQUFFQyxhQUFGLEVBQWlCQyxLQUFqQixFQUF3QkMsUUFBeEIsRUFBa0NDLGVBQWxDLEVBQUQsS0FBeUQ7QUFDMUUsUUFBTSxFQUFFQyxDQUFGLEVBQUtDLENBQUwsRUFBUUMsS0FBUixFQUFlQyxNQUFmLEtBQTBCLG9CQUFVQyxVQUExQzs7QUFFQSxRQUFNQyxxQkFBcUIsQ0FBM0I7QUFDQSxRQUFNQyxzQkFBc0IsQ0FBNUI7QUFDQSxRQUFNQyxnQkFDSixDQUFDSixTQUFTRSxxQkFBcUIsQ0FBOUIsR0FBa0NDLHNCQUFzQixDQUF6RCxJQUE4RCxDQURoRTs7QUFHQSxRQUFNRSxnQkFBZ0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVUMsR0FBVixDQUFjLENBQUNDLElBQUQsRUFBT2IsS0FBUCxLQUNsQztBQUNFLFFBQUlLLFFBQVEsQ0FEZDtBQUVFLFFBQ0VLLGdCQUFnQixDQUFDRixxQkFBcUIsQ0FBckIsR0FBeUJDLG1CQUExQixJQUFpRFQsS0FIckU7QUFLRSxTQUFLQSxLQUxQO0FBTUUsT0FBRyxDQU5MO0FBT0UsWUFBUUMsUUFQVjtBQVFFLFlBQVFDLGVBUlY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFEb0IsQ0FBdEI7O0FBYUEsU0FDRTtBQUFBO0FBQUEsTUFBRyxXQUFZLGFBQVlDLENBQUUsS0FBSUMsQ0FBRSxHQUFuQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDRTtBQUNFLFVBQUksQ0FETjtBQUVFLFVBQUksQ0FGTjtBQUdFLFVBQUksQ0FITjtBQUlFLFVBQUlFLE1BSk47QUFLRSxjQUFRTCxRQUxWO0FBTUUsY0FBUUMsZUFOVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQURGO0FBU0dTLGlCQVRIO0FBVUU7QUFDRSxjQUFRTCxNQURWO0FBRUUsZUFBU1AsYUFGWDtBQUdFLGlCQUFXQSxhQUhiO0FBSUUsYUFBT00sS0FKVDtBQUtFLFlBQUssUUFMUDtBQU1FLGdCQUFVLE1BQU1MLEtBTmxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVkYsR0FERjtBQXFCRCxDQTFDRDs7QUE0Q0FGLFdBQVdnQixTQUFYLEdBQXVCO0FBQ3JCZCxTQUFPLG9CQUFVZSxNQUFWLENBQWlCQyxVQURIO0FBRXJCakIsaUJBQWUsb0JBQVVrQixJQUFWLENBQWVELFVBRlQ7QUFHckJmLFlBQVUsb0JBQVVpQixJQUhDO0FBSXJCaEIsbUJBQWlCLG9CQUFVZ0I7QUFKTixDQUF2Qjs7a0JBT2VwQixVIiwiZmlsZSI6ImJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgR3JhcGhMaW5lLCBHcmFwaEJ1dHRvblJlY3QsIEdyYXBoQnV0dG9uQ2lyY2xlIH0gZnJvbSAnLi9zaGFwZXMnO1xuXG5jb25zdCBOb2RlQnV0dG9uID0gKHsgb25CdXR0b25DbGljaywgaW5kZXgsIGlzQ29uc3VsLCBpbnN0YW5jZXNBY3RpdmUgfSkgPT4ge1xuICBjb25zdCB7IHgsIHksIHdpZHRoLCBoZWlnaHQgfSA9IENvbnN0YW50cy5idXR0b25SZWN0O1xuXG4gIGNvbnN0IGJ1dHRvbkNpcmNsZVJhZGl1cyA9IDI7XG4gIGNvbnN0IGJ1dHRvbkNpcmNsZVNwYWNpbmcgPSAyO1xuICBjb25zdCBidXR0b25DaXJjbGVZID1cbiAgICAoaGVpZ2h0IC0gYnV0dG9uQ2lyY2xlUmFkaXVzICogNCAtIGJ1dHRvbkNpcmNsZVNwYWNpbmcgKiAyKSAvIDI7XG5cbiAgY29uc3QgYnV0dG9uQ2lyY2xlcyA9IFsxLCAyLCAzXS5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgPEdyYXBoQnV0dG9uQ2lyY2xlXG4gICAgICBjeD17d2lkdGggLyAyfVxuICAgICAgY3k9e1xuICAgICAgICBidXR0b25DaXJjbGVZICsgKGJ1dHRvbkNpcmNsZVJhZGl1cyAqIDIgKyBidXR0b25DaXJjbGVTcGFjaW5nKSAqIGluZGV4XG4gICAgICB9XG4gICAgICBrZXk9e2luZGV4fVxuICAgICAgcj17Mn1cbiAgICAgIGNvbnN1bD17aXNDb25zdWx9XG4gICAgICBhY3RpdmU9e2luc3RhbmNlc0FjdGl2ZX1cbiAgICAvPlxuICApKTtcblxuICByZXR1cm4gKFxuICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3h9LCAke3l9KWB9PlxuICAgICAgPEdyYXBoTGluZVxuICAgICAgICB4MT17MH1cbiAgICAgICAgeTE9ezB9XG4gICAgICAgIHgyPXswfVxuICAgICAgICB5Mj17aGVpZ2h0fVxuICAgICAgICBjb25zdWw9e2lzQ29uc3VsfVxuICAgICAgICBhY3RpdmU9e2luc3RhbmNlc0FjdGl2ZX1cbiAgICAgIC8+XG4gICAgICB7YnV0dG9uQ2lyY2xlc31cbiAgICAgIDxHcmFwaEJ1dHRvblJlY3RcbiAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgIG9uQ2xpY2s9e29uQnV0dG9uQ2xpY2t9XG4gICAgICAgIG9uS2V5RG93bj17b25CdXR0b25DbGlja31cbiAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgdGFiSW5kZXg9ezEwMCArIGluZGV4fVxuICAgICAgLz5cbiAgICA8L2c+XG4gICk7XG59O1xuXG5Ob2RlQnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgb25CdXR0b25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaXNDb25zdWw6IFByb3BUeXBlcy5ib29sLFxuICBpbnN0YW5jZXNBY3RpdmU6IFByb3BUeXBlcy5ib29sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBOb2RlQnV0dG9uO1xuIl19