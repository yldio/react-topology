'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/node/index.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _functions = require('../functions');

var _title = require('./title');

var _title2 = _interopRequireDefault(_title);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _content = require('./content');

var _content2 = _interopRequireDefault(_content);

var _shapes = require('./shapes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GraphNode = ({
  data,
  index,
  onDragStart,
  onNodeTitleClick,
  onQuickActions
}) => {
  const { left, top, width, height } = data.nodeRect;
  const { connections, id, children, instancesActive, isConsul } = data;

  let x = data.x;
  let y = data.y;

  if (connections.length !== 0) {
    x = data.x + left;
    y = data.y + top;
  }

  const onButtonClick = evt => {
    const tooltipPosition = {
      x: data.x + _constants2.default.buttonRect.x + _constants2.default.buttonRect.width / 2,
      y: data.y + _constants2.default.buttonRect.y + _constants2.default.buttonRect.height
    };

    if (connections.length !== 0) {
      tooltipPosition.x += left;
      tooltipPosition.y += top;
    }

    const d = {
      service: data,
      position: {
        left: tooltipPosition.x,
        top: tooltipPosition.y
      }
    };

    if (onQuickActions) onQuickActions(evt, d);
  };

  const onTitleClick = evt => onNodeTitleClick(evt, { service: data });

  const onStart = evt => {
    evt.preventDefault();
    onDragStart(evt, id);
  };

  const nodeRectEvents = connections.length === 0 ? {} : {
    onMouseDown: onStart,
    onTouchStart: onStart
  };

  const nodeContent = children ? children.reduce((acc, d, i) => {
    acc.children.push(_react2.default.createElement(_content2.default, { key: i, child: true, data: d, index: i, y: acc.y, __source: {
        fileName: _jsxFileName,
        lineNumber: 69
      },
      __self: undefined
    }));
    acc.y += (0, _functions.getContentRect)(d, true).height;
    return acc;
  }, { y: _constants2.default.contentRect.y, children: [] }).children : _react2.default.createElement(_content2.default, { data: data, __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: undefined
  });

  const nodeShadow = instancesActive ? _react2.default.createElement(_shapes.GraphShadowRect, {
    x: 0,
    y: 3,
    width: width,
    height: height,
    consul: isConsul,
    active: instancesActive,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    },
    __self: undefined
  }) : null;

  return _react2.default.createElement(
    'g',
    { transform: `translate(${x}, ${y})`, __source: {
        fileName: _jsxFileName,
        lineNumber: 92
      },
      __self: undefined
    },
    nodeShadow,
    _react2.default.createElement(_shapes.GraphNodeRect, Object.assign({
      x: 0,
      y: 0,
      width: width,
      height: height,
      consul: isConsul,
      active: instancesActive,
      connected: connections.length !== 0
    }, nodeRectEvents, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94
      },
      __self: undefined
    })),
    _react2.default.createElement(_title2.default, { data: data, onNodeTitleClick: onTitleClick, __source: {
        fileName: _jsxFileName,
        lineNumber: 104
      },
      __self: undefined
    }),
    _react2.default.createElement(_button2.default, {
      index: index,
      onButtonClick: onButtonClick,
      isConsul: isConsul,
      instancesActive: instancesActive,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 105
      },
      __self: undefined
    }),
    nodeContent
  );
};

GraphNode.propTypes = {
  data: _propTypes2.default.object.isRequired,
  index: _propTypes2.default.number.isRequired,
  onDragStart: _propTypes2.default.func,
  onNodeTitleClick: _propTypes2.default.func,
  onQuickActions: _propTypes2.default.func
};

exports.default = GraphNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2luZGV4LmpzIl0sIm5hbWVzIjpbIkdyYXBoTm9kZSIsImRhdGEiLCJpbmRleCIsIm9uRHJhZ1N0YXJ0Iiwib25Ob2RlVGl0bGVDbGljayIsIm9uUXVpY2tBY3Rpb25zIiwibGVmdCIsInRvcCIsIndpZHRoIiwiaGVpZ2h0Iiwibm9kZVJlY3QiLCJjb25uZWN0aW9ucyIsImlkIiwiY2hpbGRyZW4iLCJpbnN0YW5jZXNBY3RpdmUiLCJpc0NvbnN1bCIsIngiLCJ5IiwibGVuZ3RoIiwib25CdXR0b25DbGljayIsImV2dCIsInRvb2x0aXBQb3NpdGlvbiIsImJ1dHRvblJlY3QiLCJkIiwic2VydmljZSIsInBvc2l0aW9uIiwib25UaXRsZUNsaWNrIiwib25TdGFydCIsInByZXZlbnREZWZhdWx0Iiwibm9kZVJlY3RFdmVudHMiLCJvbk1vdXNlRG93biIsIm9uVG91Y2hTdGFydCIsIm5vZGVDb250ZW50IiwicmVkdWNlIiwiYWNjIiwiaSIsInB1c2giLCJjb250ZW50UmVjdCIsIm5vZGVTaGFkb3ciLCJwcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwibnVtYmVyIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsTUFBTUEsWUFBWSxDQUFDO0FBQ2pCQyxNQURpQjtBQUVqQkMsT0FGaUI7QUFHakJDLGFBSGlCO0FBSWpCQyxrQkFKaUI7QUFLakJDO0FBTGlCLENBQUQsS0FNWjtBQUNKLFFBQU0sRUFBRUMsSUFBRixFQUFRQyxHQUFSLEVBQWFDLEtBQWIsRUFBb0JDLE1BQXBCLEtBQStCUixLQUFLUyxRQUExQztBQUNBLFFBQU0sRUFBRUMsV0FBRixFQUFlQyxFQUFmLEVBQW1CQyxRQUFuQixFQUE2QkMsZUFBN0IsRUFBOENDLFFBQTlDLEtBQTJEZCxJQUFqRTs7QUFFQSxNQUFJZSxJQUFJZixLQUFL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Uk47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FGRjtBQVlFLHFEQUFnQixNQUFNNUIsSUFBdEIsRUFBNEIsa0JBQWtCeUIsWUFBOUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BWkY7QUFhRTtBQUNFLGFBQU94QixLQURUO0FBRUUscUJBQWVpQixhQUZqQjtBQUdFLGdCQUFVSixRQUhaO0FBSUUsdUJBQWlCRCxlQUpuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQWJGO0FBbUJHa0I7QUFuQkgsR0FERjtBQXVCRCxDQXhHRDs7QUEwR0FoQyxVQUFVdUMsU0FBVixHQUFzQjtBQUNwQnRDLFFBQU0sb0JBQVV1QyxNQUFWLENBQWlCQyxVQURIO0FBRXBCdkMsU0FBTyxvQkFBVXdDLE1BQVYsQ0FBaUJELFVBRko7QUFHcEJ0QyxlQUFhLG9CQUFVd0MsSUFISDtBQUlwQnZDLG9CQUFrQixvQkFBVXVDLElBSlI7QUFLcEJ0QyxrQkFBZ0Isb0JBQVVzQztBQUxOLENBQXRCOztrQkFRZTNDLFMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBDb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGdldENvbnRlbnRSZWN0IH0gZnJvbSAnLi4vZnVuY3Rpb25zJztcbmltcG9ydCBHcmFwaE5vZGVUaXRsZSBmcm9tICcuL3RpdGxlJztcbmltcG9ydCBHcmFwaE5vZGVCdXR0b24gZnJvbSAnLi9idXR0b24nO1xuaW1wb3J0IEdyYXBoTm9kZUNvbnRlbnQgZnJvbSAnLi9jb250ZW50JztcbmltcG9ydCB7IEdyYXBoTm9kZVJlY3QsIEdyYXBoU2hhZG93UmVjdCB9IGZyb20gJy4vc2hhcGVzJztcblxuY29uc3QgR3JhcGhOb2RlID0gKHtcbiAgZGF0YSxcbiAgaW5kZXgsXG4gIG9uRHJhZ1N0YXJ0LFxuICBvbk5vZGVUaXRsZUNsaWNrLFxuICBvblF1aWNrQWN0aW9uc1xufSkgPT4ge1xuICBjb25zdCB7IGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCB9ID0gZGF0YS5ub2RlUmVjdDtcbiAgY29uc3QgeyBjb25uZWN0aW9ucywgaWQsIGNoaWxkcmVuLCBpbnN0YW5jZXNBY3RpdmUsIGlzQ29uc3VsIH0gPSBkYXRhO1xuXG4gIGxldCB4ID0gZGF0YS54O1xuICBsZXQgeSA9IGRhdGEueTtcblxuICBpZiAoY29ubmVjdGlvbnMubGVuZ3RoICE9PSAwKSB7XG4gICAgeCA9IGRhdGEueCArIGxlZnQ7XG4gICAgeSA9IGRhdGEueSArIHRvcDtcbiAgfVxuXG4gIGNvbnN0IG9uQnV0dG9uQ2xpY2sgPSBldnQgPT4ge1xuICAgIGNvbnN0IHRvb2x0aXBQb3NpdGlvbiA9IHtcbiAgICAgIHg6IGRhdGEueCArIENvbnN0YW50cy5idXR0b25SZWN0LnggKyBDb25zdGFudHMuYnV0dG9uUmVjdC53aWR0aCAvIDIsXG4gICAgICB5OiBkYXRhLnkgKyBDb25zdGFudHMuYnV0dG9uUmVjdC55ICsgQ29uc3RhbnRzLmJ1dHRvblJlY3QuaGVpZ2h0XG4gICAgfTtcblxuICAgIGlmIChjb25uZWN0aW9ucy5sZW5ndGggIT09IDApIHtcbiAgICAgIHRvb2x0aXBQb3NpdGlvbi54ICs9IGxlZnQ7XG4gICAgICB0b29sdGlwUG9zaXRpb24ueSArPSB0b3A7XG4gICAgfVxuXG4gICAgY29uc3QgZCA9IHtcbiAgICAgIHNlcnZpY2U6IGRhdGEsXG4gICAgICBwb3NpdGlvbjoge1xuICAgICAgICBsZWZ0OiB0b29sdGlwUG9zaXRpb24ueCxcbiAgICAgICAgdG9wOiB0b29sdGlwUG9zaXRpb24ueVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAob25RdWlja0FjdGlvbnMpIG9uUXVpY2tBY3Rpb25zKGV2dCwgZCk7XG4gIH07XG5cbiAgY29uc3Qgb25UaXRsZUNsaWNrID0gZXZ0ID0+IG9uTm9kZVRpdGxlQ2xpY2soZXZ0LCB7IHNlcnZpY2U6IGRhdGEgfSk7XG5cbiAgY29uc3Qgb25TdGFydCA9IGV2dCA9PiB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgb25EcmFnU3RhcnQoZXZ0LCBpZCk7XG4gIH07XG5cbiAgY29uc3Qgbm9kZVJlY3RFdmVudHMgPVxuICAgIGNvbm5lY3Rpb25zLmxlbmd0aCA9PT0gMFxuICAgICAgPyB7fVxuICAgICAgOiB7XG4gICAgICAgICAgb25Nb3VzZURvd246IG9uU3RhcnQsXG4gICAgICAgICAgb25Ub3VjaFN0YXJ0OiBvblN0YXJ0XG4gICAgICAgIH07XG5cbiAgY29uc3Qgbm9kZUNvbnRlbnQgPSBjaGlsZHJlbiA/IChcbiAgICBjaGlsZHJlbi5yZWR1Y2UoXG4gICAgICAoYWNjLCBkLCBpKSA9PiB7XG4gICAgICAgIGFjYy5jaGlsZHJlbi5wdXNoKFxuICAgICAgICAgIDxHcmFwaE5vZGVDb250ZW50IGtleT17aX0gY2hpbGQgZGF0YT17ZH0gaW5kZXg9e2l9IHk9e2FjYy55fSAvPlxuICAgICAgICApO1xuICAgICAgICBhY2MueSArPSBnZXRDb250ZW50UmVjdChkLCB0cnVlKS5oZWlnaHQ7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LFxuICAgICAgeyB5OiBDb25zdGFudHMuY29udGVudFJlY3QueSwgY2hpbGRyZW46IFtdIH1cbiAgICApLmNoaWxkcmVuXG4gICkgOiAoXG4gICAgPEdyYXBoTm9kZUNvbnRlbnQgZGF0YT17ZGF0YX0gLz5cbiAgKTtcblxuICBjb25zdCBub2RlU2hhZG93ID0gaW5zdGFuY2VzQWN0aXZlID8gKFxuICAgIDxHcmFwaFNoYWRvd1JlY3RcbiAgICAgIHg9ezB9XG4gICAgICB5PXszfVxuICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICBjb25zdWw9e2lzQ29uc3VsfVxuICAgICAgYWN0aXZlPXtpbnN0YW5jZXNBY3RpdmV9XG4gICAgLz5cbiAgKSA6IG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHt4fSwgJHt5fSlgfT5cbiAgICAgIHtub2RlU2hhZG93fVxuICAgICAgPEdyYXBoTm9kZVJlY3RcbiAgICAgICAgeD17MH1cbiAgICAgICAgeT17MH1cbiAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgY29uc3VsPXtpc0NvbnN1bH1cbiAgICAgICAgYWN0aXZlPXtpbnN0YW5jZXNBY3RpdmV9XG4gICAgICAgIGNvbm5lY3RlZD17Y29ubmVjdGlvbnMubGVuZ3RoICE9PSAwfVxuICAgICAgICB7Li4ubm9kZVJlY3RFdmVudHN9XG4gICAgICAvPlxuICAgICAgPEdyYXBoTm9kZVRpdGxlIGRhdGE9e2RhdGF9IG9uTm9kZVRpdGxlQ2xpY2s9e29uVGl0bGVDbGlja30gLz5cbiAgICAgIDxHcmFwaE5vZGVCdXR0b25cbiAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICBvbkJ1dHRvbkNsaWNrPXtvbkJ1dHRvbkNsaWNrfVxuICAgICAgICBpc0NvbnN1bD17aXNDb25zdWx9XG4gICAgICAgIGluc3RhbmNlc0FjdGl2ZT17aW5zdGFuY2VzQWN0aXZlfVxuICAgICAgLz5cbiAgICAgIHtub2RlQ29udGVudH1cbiAgICA8L2c+XG4gICk7XG59O1xuXG5HcmFwaE5vZGUucHJvcFR5cGVzID0ge1xuICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIG9uRHJhZ1N0YXJ0OiBQcm9wVHlwZXMuZnVuYyxcbiAgb25Ob2RlVGl0bGVDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uUXVpY2tBY3Rpb25zOiBQcm9wVHlwZXMuZnVuY1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR3JhcGhOb2RlO1xuIl19