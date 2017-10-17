'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/link/arrow.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shapes = require('./shapes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GraphLinkArrow = ({ data, index }) => {
  const { targetPosition, arrowAngle } = data;

  return _react2.default.createElement(
    'g',
    {
      transform: // eslint-disable-next-line max-len
      `translate(${targetPosition.x}, ${targetPosition.y}) rotate(${arrowAngle})`,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      },
      __self: undefined
    },
    _react2.default.createElement(_shapes.GraphLinkCircle, { cx: 0, cy: 0, r: 9, __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      },
      __self: undefined
    }),
    _react2.default.createElement(_shapes.GraphLinkArrowLine, { x1: -1, x2: 2, y1: -3, y2: 0, __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: undefined
    }),
    _react2.default.createElement(_shapes.GraphLinkArrowLine, { x1: -1, x2: 2, y1: 3, y2: 0, __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: undefined
    })
  );
};

GraphLinkArrow.propTypes = {
  data: _propTypes2.default.object.isRequired,
  index: _propTypes2.default.number
};

exports.default = GraphLinkArrow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saW5rL2Fycm93LmpzIl0sIm5hbWVzIjpbIkdyYXBoTGlua0Fycm93IiwiZGF0YSIsImluZGV4IiwidGFyZ2V0UG9zaXRpb24iLCJhcnJvd0FuZ2xlIiwieCIsInkiLCJwcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwibnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsTUFBTUEsaUJBQWlCLENBQUMsRUFBRUMsSUFBRixFQUFRQyxLQUFSLEVBQUQsS0FBcUI7QUFDMUMsUUFBTSxFQUFFQyxjQUFGLEVBQWtCQyxVQUFsQixLQUFpQ0gsSUFBdkM7O0FBRUEsU0FDRTtBQUFBO0FBQUE7QUFDRSxpQkFBVztBQUNWLG1CQUFZRSxlQUFlRSxDQUFFLEtBQUlGLGVBQWVHLENBQUUsWUFBV0YsVUFBVyxHQUYzRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlFLDZEQUFpQixJQUFJLENBQXJCLEVBQXdCLElBQUksQ0FBNUIsRUFBK0IsR0FBRyxDQUFsQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFKRjtBQUtFLGdFQUFvQixJQUFJLENBQUMsQ0FBekIsRUFBNEIsSUFBSSxDQUFoQyxFQUFtQyxJQUFJLENBQUMsQ0FBeEMsRUFBMkMsSUFBSSxDQUEvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFMRjtBQU1FLGdFQUFvQixJQUFJLENBQUMsQ0FBekIsRUFBNEIsSUFBSSxDQUFoQyxFQUFtQyxJQUFJLENBQXZDLEVBQTBDLElBQUksQ0FBOUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTkYsR0FERjtBQVVELENBYkQ7O0FBZUFKLGVBQWVPLFNBQWYsR0FBMkI7QUFDekJOLFFBQU0sb0JBQVVPLE1BQVYsQ0FBaUJDLFVBREU7QUFFekJQLFNBQU8sb0JBQVVRO0FBRlEsQ0FBM0I7O2tCQUtlVixjIiwiZmlsZSI6ImFycm93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBHcmFwaExpbmtDaXJjbGUsIEdyYXBoTGlua0Fycm93TGluZSB9IGZyb20gJy4vc2hhcGVzJztcblxuY29uc3QgR3JhcGhMaW5rQXJyb3cgPSAoeyBkYXRhLCBpbmRleCB9KSA9PiB7XG4gIGNvbnN0IHsgdGFyZ2V0UG9zaXRpb24sIGFycm93QW5nbGUgfSA9IGRhdGE7XG5cbiAgcmV0dXJuIChcbiAgICA8Z1xuICAgICAgdHJhbnNmb3JtPXsvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgYHRyYW5zbGF0ZSgke3RhcmdldFBvc2l0aW9uLnh9LCAke3RhcmdldFBvc2l0aW9uLnl9KSByb3RhdGUoJHthcnJvd0FuZ2xlfSlgfVxuICAgID5cbiAgICAgIDxHcmFwaExpbmtDaXJjbGUgY3g9ezB9IGN5PXswfSByPXs5fSAvPlxuICAgICAgPEdyYXBoTGlua0Fycm93TGluZSB4MT17LTF9IHgyPXsyfSB5MT17LTN9IHkyPXswfSAvPlxuICAgICAgPEdyYXBoTGlua0Fycm93TGluZSB4MT17LTF9IHgyPXsyfSB5MT17M30geTI9ezB9IC8+XG4gICAgPC9nPlxuICApO1xufTtcblxuR3JhcGhMaW5rQXJyb3cucHJvcFR5cGVzID0ge1xuICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIGluZGV4OiBQcm9wVHlwZXMubnVtYmVyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBHcmFwaExpbmtBcnJvdztcbiJdfQ==