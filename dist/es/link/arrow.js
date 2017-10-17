var _jsxFileName = 'src/link/arrow.js',
    _this = this;

import React from 'react';
import PropTypes from 'prop-types';
import { GraphLinkCircle, GraphLinkArrowLine } from './shapes';

var GraphLinkArrow = function GraphLinkArrow(_ref) {
  var data = _ref.data,
      index = _ref.index;
  var targetPosition = data.targetPosition,
      arrowAngle = data.arrowAngle;


  return React.createElement(
    'g',
    {
      transform: // eslint-disable-next-line max-len
      'translate(' + targetPosition.x + ', ' + targetPosition.y + ') rotate(' + arrowAngle + ')',
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      },
      __self: _this
    },
    React.createElement(GraphLinkCircle, { cx: 0, cy: 0, r: 9, __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      },
      __self: _this
    }),
    React.createElement(GraphLinkArrowLine, { x1: -1, x2: 2, y1: -3, y2: 0, __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: _this
    }),
    React.createElement(GraphLinkArrowLine, { x1: -1, x2: 2, y1: 3, y2: 0, __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: _this
    })
  );
};

GraphLinkArrow.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default GraphLinkArrow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saW5rL2Fycm93LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiR3JhcGhMaW5rQ2lyY2xlIiwiR3JhcGhMaW5rQXJyb3dMaW5lIiwiR3JhcGhMaW5rQXJyb3ciLCJkYXRhIiwiaW5kZXgiLCJ0YXJnZXRQb3NpdGlvbiIsImFycm93QW5nbGUiLCJ4IiwieSIsInByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJudW1iZXIiXSwibWFwcGluZ3MiOiI7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsZUFBVCxFQUEwQkMsa0JBQTFCLFFBQW9ELFVBQXBEOztBQUVBLElBQU1DLGlCQUFpQixTQUFqQkEsY0FBaUIsT0FBcUI7QUFBQSxNQUFsQkMsSUFBa0IsUUFBbEJBLElBQWtCO0FBQUEsTUFBWkMsS0FBWSxRQUFaQSxLQUFZO0FBQUEsTUFDbENDLGNBRGtDLEdBQ0hGLElBREcsQ0FDbENFLGNBRGtDO0FBQUEsTUFDbEJDLFVBRGtCLEdBQ0hILElBREcsQ0FDbEJHLFVBRGtCOzs7QUFHMUMsU0FDRTtBQUFBO0FBQUE7QUFDRSxpQkFBVztBQUFYLHFCQUNhRCxlQUFlRSxDQUQ1QixVQUNrQ0YsZUFBZUcsQ0FEakQsaUJBQzhERixVQUQ5RCxNQURGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUUsd0JBQUMsZUFBRCxJQUFpQixJQUFJLENBQXJCLEVBQXdCLElBQUksQ0FBNUIsRUFBK0IsR0FBRyxDQUFsQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFKRjtBQUtFLHdCQUFDLGtCQUFELElBQW9CLElBQUksQ0FBQyxDQUF6QixFQUE0QixJQUFJLENBQWhDLEVBQW1DLElBQUksQ0FBQyxDQUF4QyxFQUEyQyxJQUFJLENBQS9DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUxGO0FBTUUsd0JBQUMsa0JBQUQsSUFBb0IsSUFBSSxDQUFDLENBQXpCLEVBQTRCLElBQUksQ0FBaEMsRUFBbUMsSUFBSSxDQUF2QyxFQUEwQyxJQUFJLENBQTlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU5GLEdBREY7QUFVRCxDQWJEOztBQWVBSixlQUFlTyxTQUFmLEdBQTJCO0FBQ3pCTixRQUFNSixVQUFVVyxNQUFWLENBQWlCQyxVQURFO0FBRXpCUCxTQUFPTCxVQUFVYTtBQUZRLENBQTNCOztBQUtBLGVBQWVWLGNBQWYiLCJmaWxlIjoiYXJyb3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEdyYXBoTGlua0NpcmNsZSwgR3JhcGhMaW5rQXJyb3dMaW5lIH0gZnJvbSAnLi9zaGFwZXMnO1xuXG5jb25zdCBHcmFwaExpbmtBcnJvdyA9ICh7IGRhdGEsIGluZGV4IH0pID0+IHtcbiAgY29uc3QgeyB0YXJnZXRQb3NpdGlvbiwgYXJyb3dBbmdsZSB9ID0gZGF0YTtcblxuICByZXR1cm4gKFxuICAgIDxnXG4gICAgICB0cmFuc2Zvcm09ey8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICBgdHJhbnNsYXRlKCR7dGFyZ2V0UG9zaXRpb24ueH0sICR7dGFyZ2V0UG9zaXRpb24ueX0pIHJvdGF0ZSgke2Fycm93QW5nbGV9KWB9XG4gICAgPlxuICAgICAgPEdyYXBoTGlua0NpcmNsZSBjeD17MH0gY3k9ezB9IHI9ezl9IC8+XG4gICAgICA8R3JhcGhMaW5rQXJyb3dMaW5lIHgxPXstMX0geDI9ezJ9IHkxPXstM30geTI9ezB9IC8+XG4gICAgICA8R3JhcGhMaW5rQXJyb3dMaW5lIHgxPXstMX0geDI9ezJ9IHkxPXszfSB5Mj17MH0gLz5cbiAgICA8L2c+XG4gICk7XG59O1xuXG5HcmFwaExpbmtBcnJvdy5wcm9wVHlwZXMgPSB7XG4gIGRhdGE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdyYXBoTGlua0Fycm93O1xuIl19