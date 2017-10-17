var _jsxFileName = 'src/node/button.js',
    _this = this;

import React from 'react';
import PropTypes from 'prop-types';
import Constants from '../constants';
import { GraphLine, GraphButtonRect, GraphButtonCircle } from './shapes';

var NodeButton = function NodeButton(_ref) {
  var onButtonClick = _ref.onButtonClick,
      index = _ref.index,
      isConsul = _ref.isConsul,
      instancesActive = _ref.instancesActive;
  var _Constants$buttonRect = Constants.buttonRect,
      x = _Constants$buttonRect.x,
      y = _Constants$buttonRect.y,
      width = _Constants$buttonRect.width,
      height = _Constants$buttonRect.height;


  var buttonCircleRadius = 2;
  var buttonCircleSpacing = 2;
  var buttonCircleY = (height - buttonCircleRadius * 4 - buttonCircleSpacing * 2) / 2;

  var buttonCircles = [1, 2, 3].map(function (item, index) {
    return React.createElement(GraphButtonCircle, {
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
      __self: _this
    });
  });

  return React.createElement(
    'g',
    { transform: 'translate(' + x + ', ' + y + ')', __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: _this
    },
    React.createElement(GraphLine, {
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
      __self: _this
    }),
    buttonCircles,
    React.createElement(GraphButtonRect, {
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
      __self: _this
    })
  );
};

NodeButton.propTypes = {
  index: PropTypes.number.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  isConsul: PropTypes.bool,
  instancesActive: PropTypes.bool
};

export default NodeButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2J1dHRvbi5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkNvbnN0YW50cyIsIkdyYXBoTGluZSIsIkdyYXBoQnV0dG9uUmVjdCIsIkdyYXBoQnV0dG9uQ2lyY2xlIiwiTm9kZUJ1dHRvbiIsIm9uQnV0dG9uQ2xpY2siLCJpbmRleCIsImlzQ29uc3VsIiwiaW5zdGFuY2VzQWN0aXZlIiwiYnV0dG9uUmVjdCIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJidXR0b25DaXJjbGVSYWRpdXMiLCJidXR0b25DaXJjbGVTcGFjaW5nIiwiYnV0dG9uQ2lyY2xlWSIsImJ1dHRvbkNpcmNsZXMiLCJtYXAiLCJpdGVtIiwicHJvcFR5cGVzIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJib29sIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsY0FBdEI7QUFDQSxTQUFTQyxTQUFULEVBQW9CQyxlQUFwQixFQUFxQ0MsaUJBQXJDLFFBQThELFVBQTlEOztBQUVBLElBQU1DLGFBQWEsU0FBYkEsVUFBYSxPQUF5RDtBQUFBLE1BQXREQyxhQUFzRCxRQUF0REEsYUFBc0Q7QUFBQSxNQUF2Q0MsS0FBdUMsUUFBdkNBLEtBQXVDO0FBQUEsTUFBaENDLFFBQWdDLFFBQWhDQSxRQUFnQztBQUFBLE1BQXRCQyxlQUFzQixRQUF0QkEsZUFBc0I7QUFBQSw4QkFDMUNSLFVBQVVTLFVBRGdDO0FBQUEsTUFDbEVDLENBRGtFLHlCQUNsRUEsQ0FEa0U7QUFBQSxNQUMvREMsQ0FEK0QseUJBQy9EQSxDQUQrRDtBQUFBLE1BQzVEQyxLQUQ0RCx5QkFDNURBLEtBRDREO0FBQUEsTUFDckRDLE1BRHFELHlCQUNyREEsTUFEcUQ7OztBQUcxRSxNQUFNQyxxQkFBcUIsQ0FBM0I7QUFDQSxNQUFNQyxzQkFBc0IsQ0FBNUI7QUFDQSxNQUFNQyxnQkFDSixDQUFDSCxTQUFTQyxxQkFBcUIsQ0FBOUIsR0FBa0NDLHNCQUFzQixDQUF6RCxJQUE4RCxDQURoRTs7QUFHQSxNQUFNRSxnQkFBZ0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVUMsR0FBVixDQUFjLFVBQUNDLElBQUQsRUFBT2IsS0FBUDtBQUFBLFdBQ2xDLG9CQUFDLGlCQUFEO0FBQ0UsVUFBSU0sUUFBUSxDQURkO0FBRUUsVUFDRUksZ0JBQWdCLENBQUNGLHFCQUFxQixDQUFyQixHQUF5QkMsbUJBQTFCLElBQWlEVCxLQUhyRTtBQUtFLFdBQUtBLEtBTFA7QUFNRSxTQUFHLENBTkw7QUFPRSxjQUFRQyxRQVBWO0FBUUUsY0FBUUMsZUFSVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQURrQztBQUFBLEdBQWQsQ0FBdEI7O0FBYUEsU0FDRTtBQUFBO0FBQUEsTUFBRywwQkFBd0JFLENBQXhCLFVBQThCQyxDQUE5QixNQUFIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNFLHdCQUFDLFNBQUQ7QUFDRSxVQUFJLENBRE47QUFFRSxVQUFJLENBRk47QUFHRSxVQUFJLENBSE47QUFJRSxVQUFJRSxNQUpOO0FBS0UsY0FBUU4sUUFMVjtBQU1FLGNBQVFDLGVBTlY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFERjtBQVNHUyxpQkFUSDtBQVVFLHdCQUFDLGVBQUQ7QUFDRSxjQUFRSixNQURWO0FBRUUsZUFBU1IsYUFGWDtBQUdFLGlCQUFXQSxhQUhiO0FBSUUsYUFBT08sS0FKVDtBQUtFLFlBQUssUUFMUDtBQU1FLGdCQUFVLE1BQU1OLEtBTmxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVkYsR0FERjtBQXFCRCxDQTFDRDs7QUE0Q0FGLFdBQVdnQixTQUFYLEdBQXVCO0FBQ3JCZCxTQUFPUCxVQUFVc0IsTUFBVixDQUFpQkMsVUFESDtBQUVyQmpCLGlCQUFlTixVQUFVd0IsSUFBVixDQUFlRCxVQUZUO0FBR3JCZixZQUFVUixVQUFVeUIsSUFIQztBQUlyQmhCLG1CQUFpQlQsVUFBVXlCO0FBSk4sQ0FBdkI7O0FBT0EsZUFBZXBCLFVBQWYiLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBHcmFwaExpbmUsIEdyYXBoQnV0dG9uUmVjdCwgR3JhcGhCdXR0b25DaXJjbGUgfSBmcm9tICcuL3NoYXBlcyc7XG5cbmNvbnN0IE5vZGVCdXR0b24gPSAoeyBvbkJ1dHRvbkNsaWNrLCBpbmRleCwgaXNDb25zdWwsIGluc3RhbmNlc0FjdGl2ZSB9KSA9PiB7XG4gIGNvbnN0IHsgeCwgeSwgd2lkdGgsIGhlaWdodCB9ID0gQ29uc3RhbnRzLmJ1dHRvblJlY3Q7XG5cbiAgY29uc3QgYnV0dG9uQ2lyY2xlUmFkaXVzID0gMjtcbiAgY29uc3QgYnV0dG9uQ2lyY2xlU3BhY2luZyA9IDI7XG4gIGNvbnN0IGJ1dHRvbkNpcmNsZVkgPVxuICAgIChoZWlnaHQgLSBidXR0b25DaXJjbGVSYWRpdXMgKiA0IC0gYnV0dG9uQ2lyY2xlU3BhY2luZyAqIDIpIC8gMjtcblxuICBjb25zdCBidXR0b25DaXJjbGVzID0gWzEsIDIsIDNdLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICA8R3JhcGhCdXR0b25DaXJjbGVcbiAgICAgIGN4PXt3aWR0aCAvIDJ9XG4gICAgICBjeT17XG4gICAgICAgIGJ1dHRvbkNpcmNsZVkgKyAoYnV0dG9uQ2lyY2xlUmFkaXVzICogMiArIGJ1dHRvbkNpcmNsZVNwYWNpbmcpICogaW5kZXhcbiAgICAgIH1cbiAgICAgIGtleT17aW5kZXh9XG4gICAgICByPXsyfVxuICAgICAgY29uc3VsPXtpc0NvbnN1bH1cbiAgICAgIGFjdGl2ZT17aW5zdGFuY2VzQWN0aXZlfVxuICAgIC8+XG4gICkpO1xuXG4gIHJldHVybiAoXG4gICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7eH0sICR7eX0pYH0+XG4gICAgICA8R3JhcGhMaW5lXG4gICAgICAgIHgxPXswfVxuICAgICAgICB5MT17MH1cbiAgICAgICAgeDI9ezB9XG4gICAgICAgIHkyPXtoZWlnaHR9XG4gICAgICAgIGNvbnN1bD17aXNDb25zdWx9XG4gICAgICAgIGFjdGl2ZT17aW5zdGFuY2VzQWN0aXZlfVxuICAgICAgLz5cbiAgICAgIHtidXR0b25DaXJjbGVzfVxuICAgICAgPEdyYXBoQnV0dG9uUmVjdFxuICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgb25DbGljaz17b25CdXR0b25DbGlja31cbiAgICAgICAgb25LZXlEb3duPXtvbkJ1dHRvbkNsaWNrfVxuICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICB0YWJJbmRleD17MTAwICsgaW5kZXh9XG4gICAgICAvPlxuICAgIDwvZz5cbiAgKTtcbn07XG5cbk5vZGVCdXR0b24ucHJvcFR5cGVzID0ge1xuICBpbmRleDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBvbkJ1dHRvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpc0NvbnN1bDogUHJvcFR5cGVzLmJvb2wsXG4gIGluc3RhbmNlc0FjdGl2ZTogUHJvcFR5cGVzLmJvb2xcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5vZGVCdXR0b247XG4iXX0=