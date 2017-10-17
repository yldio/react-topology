var _jsxFileName = 'src/node/title.js',
    _this = this;

import React from 'react';
import PropTypes from 'prop-types';
import Constants from '../constants';
import { GraphTitle } from './shapes';

var GraphNodeTitle = function GraphNodeTitle(_ref) {
  var data = _ref.data,
      onNodeTitleClick = _ref.onNodeTitleClick;
  return React.createElement(
    'g',
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 7
      },
      __self: _this
    },
    React.createElement(
      GraphTitle,
      {
        x: Constants.paddingLeft,
        y: 30,
        onClick: onNodeTitleClick,
        onKeyDown: onNodeTitleClick,
        consul: data.isConsul,
        active: data.instancesActive,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        },
        __self: _this
      },
      data.name
    )
  );
};

GraphNodeTitle.propTypes = {
  data: PropTypes.object.isRequired,
  onNodeTitleClick: PropTypes.func
};

export default GraphNodeTitle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL3RpdGxlLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiQ29uc3RhbnRzIiwiR3JhcGhUaXRsZSIsIkdyYXBoTm9kZVRpdGxlIiwiZGF0YSIsIm9uTm9kZVRpdGxlQ2xpY2siLCJwYWRkaW5nTGVmdCIsImlzQ29uc3VsIiwiaW5zdGFuY2VzQWN0aXZlIiwibmFtZSIsInByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsY0FBdEI7QUFDQSxTQUFTQyxVQUFULFFBQTJCLFVBQTNCOztBQUVBLElBQU1DLGlCQUFpQixTQUFqQkEsY0FBaUI7QUFBQSxNQUFHQyxJQUFILFFBQUdBLElBQUg7QUFBQSxNQUFTQyxnQkFBVCxRQUFTQSxnQkFBVDtBQUFBLFNBQ3JCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNFO0FBQUMsZ0JBQUQ7QUFBQTtBQUNFLFdBQUdKLFVBQVVLLFdBRGY7QUFFRSxXQUFHLEVBRkw7QUFHRSxpQkFBU0QsZ0JBSFg7QUFJRSxtQkFBV0EsZ0JBSmI7QUFLRSxnQkFBUUQsS0FBS0csUUFMZjtBQU1FLGdCQUFRSCxLQUFLSSxlQU5mO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUUdKLFdBQUtLO0FBUlI7QUFERixHQURxQjtBQUFBLENBQXZCOztBQWVBTixlQUFlTyxTQUFmLEdBQTJCO0FBQ3pCTixRQUFNSixVQUFVVyxNQUFWLENBQWlCQyxVQURFO0FBRXpCUCxvQkFBa0JMLFVBQVVhO0FBRkgsQ0FBM0I7O0FBS0EsZUFBZVYsY0FBZiIsImZpbGUiOiJ0aXRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgR3JhcGhUaXRsZSB9IGZyb20gJy4vc2hhcGVzJztcblxuY29uc3QgR3JhcGhOb2RlVGl0bGUgPSAoeyBkYXRhLCBvbk5vZGVUaXRsZUNsaWNrIH0pID0+IChcbiAgPGc+XG4gICAgPEdyYXBoVGl0bGVcbiAgICAgIHg9e0NvbnN0YW50cy5wYWRkaW5nTGVmdH1cbiAgICAgIHk9ezMwfVxuICAgICAgb25DbGljaz17b25Ob2RlVGl0bGVDbGlja31cbiAgICAgIG9uS2V5RG93bj17b25Ob2RlVGl0bGVDbGlja31cbiAgICAgIGNvbnN1bD17ZGF0YS5pc0NvbnN1bH1cbiAgICAgIGFjdGl2ZT17ZGF0YS5pbnN0YW5jZXNBY3RpdmV9XG4gICAgPlxuICAgICAge2RhdGEubmFtZX1cbiAgICA8L0dyYXBoVGl0bGU+XG4gIDwvZz5cbik7XG5cbkdyYXBoTm9kZVRpdGxlLnByb3BUeXBlcyA9IHtcbiAgZGF0YTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvbk5vZGVUaXRsZUNsaWNrOiBQcm9wVHlwZXMuZnVuY1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR3JhcGhOb2RlVGl0bGU7XG4iXX0=