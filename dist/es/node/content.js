var _jsxFileName = 'src/node/content.js',
    _this = this;

import React from 'react';
import PropTypes from 'prop-types';
import Constants from '../constants';
import { GraphLine, GraphSubtitle } from './shapes';
import GraphNodeInfo from './info';

var GraphNodeContent = function GraphNodeContent(_ref) {
  var _ref$child = _ref.child,
      child = _ref$child === undefined ? false : _ref$child,
      data = _ref.data,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? Constants.contentRect.y : _ref$y,
      _ref$index = _ref.index,
      index = _ref$index === undefined ? 0 : _ref$index;
  var _Constants$contentRec = Constants.contentRect,
      x = _Constants$contentRec.x,
      width = _Constants$contentRec.width;


  var nodeInfoPos = child ? {
    x: Constants.infoPosition.x,
    y: Constants.infoPosition.y + 21
  } : Constants.infoPosition;

  var nodeSubtitle = child ? React.createElement(
    GraphSubtitle,
    Object.assign({}, Constants.subtitlePosition, {
      consul: data.isConsul,
      active: data.instancesActive,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: _this
    }),
    data.name
  ) : null;

  var nodeInfo = React.createElement(GraphNodeInfo, { data: data, pos: nodeInfoPos, __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: _this
  });

  return React.createElement(
    'g',
    { transform: 'translate(' + x + ', ' + y + ')', __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: _this
    },
    React.createElement(GraphLine, {
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
      __self: _this
    }),
    nodeSubtitle,
    nodeInfo
  );
};

GraphNodeContent.propTypes = {
  child: PropTypes.bool,
  data: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default GraphNodeContent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2NvbnRlbnQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJDb25zdGFudHMiLCJHcmFwaExpbmUiLCJHcmFwaFN1YnRpdGxlIiwiR3JhcGhOb2RlSW5mbyIsIkdyYXBoTm9kZUNvbnRlbnQiLCJjaGlsZCIsImRhdGEiLCJ5IiwiY29udGVudFJlY3QiLCJpbmRleCIsIngiLCJ3aWR0aCIsIm5vZGVJbmZvUG9zIiwiaW5mb1Bvc2l0aW9uIiwibm9kZVN1YnRpdGxlIiwic3VidGl0bGVQb3NpdGlvbiIsImlzQ29uc3VsIiwiaW5zdGFuY2VzQWN0aXZlIiwibmFtZSIsIm5vZGVJbmZvIiwicHJvcFR5cGVzIiwiYm9vbCIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJudW1iZXIiXSwibWFwcGluZ3MiOiI7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixjQUF0QjtBQUNBLFNBQVNDLFNBQVQsRUFBb0JDLGFBQXBCLFFBQXlDLFVBQXpDO0FBQ0EsT0FBT0MsYUFBUCxNQUEwQixRQUExQjs7QUFFQSxJQUFNQyxtQkFBbUIsU0FBbkJBLGdCQUFtQixPQUtuQjtBQUFBLHdCQUpKQyxLQUlJO0FBQUEsTUFKSkEsS0FJSSw4QkFKSSxLQUlKO0FBQUEsTUFISkMsSUFHSSxRQUhKQSxJQUdJO0FBQUEsb0JBRkpDLENBRUk7QUFBQSxNQUZKQSxDQUVJLDBCQUZBUCxVQUFVUSxXQUFWLENBQXNCRCxDQUV0QjtBQUFBLHdCQURKRSxLQUNJO0FBQUEsTUFESkEsS0FDSSw4QkFESSxDQUNKO0FBQUEsOEJBQ2lCVCxVQUFVUSxXQUQzQjtBQUFBLE1BQ0lFLENBREoseUJBQ0lBLENBREo7QUFBQSxNQUNPQyxLQURQLHlCQUNPQSxLQURQOzs7QUFHSixNQUFNQyxjQUFjUCxRQUNoQjtBQUNFSyxPQUFHVixVQUFVYSxZQUFWLENBQXVCSCxDQUQ1QjtBQUVFSCxPQUFHUCxVQUFVYSxZQUFWLENBQXVCTixDQUF2QixHQUEyQjtBQUZoQyxHQURnQixHQUtoQlAsVUFBVWEsWUFMZDs7QUFPQSxNQUFNQyxlQUFlVCxRQUNuQjtBQUFDLGlCQUFEO0FBQUEsc0JBQ01MLFVBQVVlLGdCQURoQjtBQUVFLGNBQVFULEtBQUtVLFFBRmY7QUFHRSxjQUFRVixLQUFLVyxlQUhmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0dYLFNBQUtZO0FBTFIsR0FEbUIsR0FRakIsSUFSSjs7QUFVQSxNQUFNQyxXQUFXLG9CQUFDLGFBQUQsSUFBZSxNQUFNYixJQUFyQixFQUEyQixLQUFLTSxXQUFoQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBakI7O0FBRUEsU0FDRTtBQUFBO0FBQUEsTUFBRywwQkFBd0JGLENBQXhCLFVBQThCSCxDQUE5QixNQUFIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNFLHdCQUFDLFNBQUQ7QUFDRSxVQUFJLENBRE47QUFFRSxVQUFJLENBRk47QUFHRSxVQUFJSSxLQUhOO0FBSUUsVUFBSSxDQUpOO0FBS0UsY0FBUUwsS0FBS1UsUUFMZjtBQU1FLGNBQVFWLEtBQUtXLGVBTmY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFERjtBQVNHSCxnQkFUSDtBQVVHSztBQVZILEdBREY7QUFjRCxDQXpDRDs7QUEyQ0FmLGlCQUFpQmdCLFNBQWpCLEdBQTZCO0FBQzNCZixTQUFPTixVQUFVc0IsSUFEVTtBQUUzQmYsUUFBTVAsVUFBVXVCLE1BQVYsQ0FBaUJDLFVBRkk7QUFHM0JkLFNBQU9WLFVBQVV5QjtBQUhVLENBQTdCOztBQU1BLGVBQWVwQixnQkFBZiIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQ29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBHcmFwaExpbmUsIEdyYXBoU3VidGl0bGUgfSBmcm9tICcuL3NoYXBlcyc7XG5pbXBvcnQgR3JhcGhOb2RlSW5mbyBmcm9tICcuL2luZm8nO1xuXG5jb25zdCBHcmFwaE5vZGVDb250ZW50ID0gKHtcbiAgY2hpbGQgPSBmYWxzZSxcbiAgZGF0YSxcbiAgeSA9IENvbnN0YW50cy5jb250ZW50UmVjdC55LFxuICBpbmRleCA9IDBcbn0pID0+IHtcbiAgY29uc3QgeyB4LCB3aWR0aCB9ID0gQ29uc3RhbnRzLmNvbnRlbnRSZWN0O1xuXG4gIGNvbnN0IG5vZGVJbmZvUG9zID0gY2hpbGRcbiAgICA/IHtcbiAgICAgICAgeDogQ29uc3RhbnRzLmluZm9Qb3NpdGlvbi54LFxuICAgICAgICB5OiBDb25zdGFudHMuaW5mb1Bvc2l0aW9uLnkgKyAyMVxuICAgICAgfVxuICAgIDogQ29uc3RhbnRzLmluZm9Qb3NpdGlvbjtcblxuICBjb25zdCBub2RlU3VidGl0bGUgPSBjaGlsZCA/IChcbiAgICA8R3JhcGhTdWJ0aXRsZVxuICAgICAgey4uLkNvbnN0YW50cy5zdWJ0aXRsZVBvc2l0aW9ufVxuICAgICAgY29uc3VsPXtkYXRhLmlzQ29uc3VsfVxuICAgICAgYWN0aXZlPXtkYXRhLmluc3RhbmNlc0FjdGl2ZX1cbiAgICA+XG4gICAgICB7ZGF0YS5uYW1lfVxuICAgIDwvR3JhcGhTdWJ0aXRsZT5cbiAgKSA6IG51bGw7XG5cbiAgY29uc3Qgbm9kZUluZm8gPSA8R3JhcGhOb2RlSW5mbyBkYXRhPXtkYXRhfSBwb3M9e25vZGVJbmZvUG9zfSAvPjtcblxuICByZXR1cm4gKFxuICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3h9LCAke3l9KWB9PlxuICAgICAgPEdyYXBoTGluZVxuICAgICAgICB4MT17MH1cbiAgICAgICAgeTE9ezB9XG4gICAgICAgIHgyPXt3aWR0aH1cbiAgICAgICAgeTI9ezB9XG4gICAgICAgIGNvbnN1bD17ZGF0YS5pc0NvbnN1bH1cbiAgICAgICAgYWN0aXZlPXtkYXRhLmluc3RhbmNlc0FjdGl2ZX1cbiAgICAgIC8+XG4gICAgICB7bm9kZVN1YnRpdGxlfVxuICAgICAge25vZGVJbmZvfVxuICAgIDwvZz5cbiAgKTtcbn07XG5cbkdyYXBoTm9kZUNvbnRlbnQucHJvcFR5cGVzID0ge1xuICBjaGlsZDogUHJvcFR5cGVzLmJvb2wsXG4gIGRhdGE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdyYXBoTm9kZUNvbnRlbnQ7XG4iXX0=