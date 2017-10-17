var _jsxFileName = 'src/node/index.js',
    _this = this;

import React from 'react';
import PropTypes from 'prop-types';
import Constants from '../constants';
import { getContentRect } from '../functions';
import GraphNodeTitle from './title';
import GraphNodeButton from './button';
import GraphNodeContent from './content';
import { GraphNodeRect, GraphShadowRect } from './shapes';

var GraphNode = function GraphNode(_ref) {
  var data = _ref.data,
      index = _ref.index,
      onDragStart = _ref.onDragStart,
      onNodeTitleClick = _ref.onNodeTitleClick,
      onQuickActions = _ref.onQuickActions;
  var _data$nodeRect = data.nodeRect,
      left = _data$nodeRect.left,
      top = _data$nodeRect.top,
      width = _data$nodeRect.width,
      height = _data$nodeRect.height;
  var connections = data.connections,
      id = data.id,
      children = data.children,
      instancesActive = data.instancesActive,
      isConsul = data.isConsul;


  var x = data.x;
  var y = data.y;

  if (connections.length !== 0) {
    x = data.x + left;
    y = data.y + top;
  }

  var onButtonClick = function onButtonClick(evt) {
    var tooltipPosition = {
      x: data.x + Constants.buttonRect.x + Constants.buttonRect.width / 2,
      y: data.y + Constants.buttonRect.y + Constants.buttonRect.height
    };

    if (connections.length !== 0) {
      tooltipPosition.x += left;
      tooltipPosition.y += top;
    }

    var d = {
      service: data,
      position: {
        left: tooltipPosition.x,
        top: tooltipPosition.y
      }
    };

    if (onQuickActions) onQuickActions(evt, d);
  };

  var onTitleClick = function onTitleClick(evt) {
    return onNodeTitleClick(evt, { service: data });
  };

  var onStart = function onStart(evt) {
    evt.preventDefault();
    onDragStart(evt, id);
  };

  var nodeRectEvents = connections.length === 0 ? {} : {
    onMouseDown: onStart,
    onTouchStart: onStart
  };

  var nodeContent = children ? children.reduce(function (acc, d, i) {
    acc.children.push(React.createElement(GraphNodeContent, { key: i, child: true, data: d, index: i, y: acc.y, __source: {
        fileName: _jsxFileName,
        lineNumber: 69
      },
      __self: _this
    }));
    acc.y += getContentRect(d, true).height;
    return acc;
  }, { y: Constants.contentRect.y, children: [] }).children : React.createElement(GraphNodeContent, { data: data, __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: _this
  });

  var nodeShadow = instancesActive ? React.createElement(GraphShadowRect, {
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
    __self: _this
  }) : null;

  return React.createElement(
    'g',
    { transform: 'translate(' + x + ', ' + y + ')', __source: {
        fileName: _jsxFileName,
        lineNumber: 92
      },
      __self: _this
    },
    nodeShadow,
    React.createElement(GraphNodeRect, Object.assign({
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
      __self: _this
    })),
    React.createElement(GraphNodeTitle, { data: data, onNodeTitleClick: onTitleClick, __source: {
        fileName: _jsxFileName,
        lineNumber: 104
      },
      __self: _this
    }),
    React.createElement(GraphNodeButton, {
      index: index,
      onButtonClick: onButtonClick,
      isConsul: isConsul,
      instancesActive: instancesActive,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 105
      },
      __self: _this
    }),
    nodeContent
  );
};

GraphNode.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onDragStart: PropTypes.func,
  onNodeTitleClick: PropTypes.func,
  onQuickActions: PropTypes.func
};

export default GraphNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiQ29uc3RhbnRzIiwiZ2V0Q29udGVudFJlY3QiLCJHcmFwaE5vZGVUaXRsZSIsIkdyYXBoTm9kZUJ1dHRvbiIsIkdyYXBoTm9kZUNvbnRlbnQiLCJHcmFwaE5vZGVSZWN0IiwiR3JhcGhTaGFkb3dSZWN0IiwiR3JhcGhOb2RlIiwiZGF0YSIsImluZGV4Iiwib25EcmFnU3RhcnQiLCJvbk5vZGVUaXRsZUNsaWNrIiwib25RdWlja0FjdGlvbnMiLCJub2RlUmVjdCIsImxlZnQiLCJ0b3AiLCJ3aWR0aCIsImhlaWdodCIsImNvbm5lY3Rpb25zIiwiaWQiLCJjaGlsZHJlbiIsImluc3RhbmNlc0FjdGl2ZSIsImlzQ29uc3VsIiwieCIsInkiLCJsZW5ndGgiLCJvbkJ1dHRvbkNsaWNrIiwidG9vbHRpcFBvc2l0aW9uIiwiYnV0dG9uUmVjdCIsImQiLCJzZXJ2aWNlIiwicG9zaXRpb24iLCJldnQiLCJvblRpdGxlQ2xpY2siLCJvblN0YXJ0IiwicHJldmVudERlZmF1bHQiLCJub2RlUmVjdEV2ZW50cyIsIm9uTW91c2VEb3duIiwib25Ub3VjaFN0YXJ0Iiwibm9kZUNvbnRlbnQiLCJyZWR1Y2UiLCJhY2MiLCJpIiwicHVzaCIsImNvbnRlbnRSZWN0Iiwibm9kZVNoYWRvdyIsInByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJudW1iZXIiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsY0FBdEI7QUFDQSxTQUFTQyxjQUFULFFBQStCLGNBQS9CO0FBQ0EsT0FBT0MsY0FBUCxNQUEyQixTQUEzQjtBQUNBLE9BQU9DLGVBQVAsTUFBNEIsVUFBNUI7QUFDQSxPQUFPQyxnQkFBUCxNQUE2QixXQUE3QjtBQUNBLFNBQVND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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFiRjtBQW1CR2tCO0FBbkJILEdBREY7QUF1QkQsQ0F4R0Q7O0FBMEdBaEMsVUFBVXVDLFNBQVYsR0FBc0I7QUFDcEJ0QyxRQUFNVCxVQUFVZ0QsTUFBVixDQUFpQkMsVUFESDtBQUVwQnZDLFNBQU9WLFVBQVVrRCxNQUFWLENBQWlCRCxVQUZKO0FBR3BCdEMsZUFBYVgsVUFBVW1ELElBSEg7QUFJcEJ2QyxvQkFBa0JaLFVBQVVtRCxJQUpSO0FBS3BCdEMsa0JBQWdCYixVQUFVbUQ7QUFMTixDQUF0Qjs7QUFRQSxlQUFlM0MsU0FBZiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IENvbnN0YW50cyBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0Q29udGVudFJlY3QgfSBmcm9tICcuLi9mdW5jdGlvbnMnO1xuaW1wb3J0IEdyYXBoTm9kZVRpdGxlIGZyb20gJy4vdGl0bGUnO1xuaW1wb3J0IEdyYXBoTm9kZUJ1dHRvbiBmcm9tICcuL2J1dHRvbic7XG5pbXBvcnQgR3JhcGhOb2RlQ29udGVudCBmcm9tICcuL2NvbnRlbnQnO1xuaW1wb3J0IHsgR3JhcGhOb2RlUmVjdCwgR3JhcGhTaGFkb3dSZWN0IH0gZnJvbSAnLi9zaGFwZXMnO1xuXG5jb25zdCBHcmFwaE5vZGUgPSAoe1xuICBkYXRhLFxuICBpbmRleCxcbiAgb25EcmFnU3RhcnQsXG4gIG9uTm9kZVRpdGxlQ2xpY2ssXG4gIG9uUXVpY2tBY3Rpb25zXG59KSA9PiB7XG4gIGNvbnN0IHsgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0IH0gPSBkYXRhLm5vZGVSZWN0O1xuICBjb25zdCB7IGNvbm5lY3Rpb25zLCBpZCwgY2hpbGRyZW4sIGluc3RhbmNlc0FjdGl2ZSwgaXNDb25zdWwgfSA9IGRhdGE7XG5cbiAgbGV0IHggPSBkYXRhLng7XG4gIGxldCB5ID0gZGF0YS55O1xuXG4gIGlmIChjb25uZWN0aW9ucy5sZW5ndGggIT09IDApIHtcbiAgICB4ID0gZGF0YS54ICsgbGVmdDtcbiAgICB5ID0gZGF0YS55ICsgdG9wO1xuICB9XG5cbiAgY29uc3Qgb25CdXR0b25DbGljayA9IGV2dCA9PiB7XG4gICAgY29uc3QgdG9vbHRpcFBvc2l0aW9uID0ge1xuICAgICAgeDogZGF0YS54ICsgQ29uc3RhbnRzLmJ1dHRvblJlY3QueCArIENvbnN0YW50cy5idXR0b25SZWN0LndpZHRoIC8gMixcbiAgICAgIHk6IGRhdGEueSArIENvbnN0YW50cy5idXR0b25SZWN0LnkgKyBDb25zdGFudHMuYnV0dG9uUmVjdC5oZWlnaHRcbiAgICB9O1xuXG4gICAgaWYgKGNvbm5lY3Rpb25zLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdG9vbHRpcFBvc2l0aW9uLnggKz0gbGVmdDtcbiAgICAgIHRvb2x0aXBQb3NpdGlvbi55ICs9IHRvcDtcbiAgICB9XG5cbiAgICBjb25zdCBkID0ge1xuICAgICAgc2VydmljZTogZGF0YSxcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIGxlZnQ6IHRvb2x0aXBQb3NpdGlvbi54LFxuICAgICAgICB0b3A6IHRvb2x0aXBQb3NpdGlvbi55XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChvblF1aWNrQWN0aW9ucykgb25RdWlja0FjdGlvbnMoZXZ0LCBkKTtcbiAgfTtcblxuICBjb25zdCBvblRpdGxlQ2xpY2sgPSBldnQgPT4gb25Ob2RlVGl0bGVDbGljayhldnQsIHsgc2VydmljZTogZGF0YSB9KTtcblxuICBjb25zdCBvblN0YXJ0ID0gZXZ0ID0+IHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBvbkRyYWdTdGFydChldnQsIGlkKTtcbiAgfTtcblxuICBjb25zdCBub2RlUmVjdEV2ZW50cyA9XG4gICAgY29ubmVjdGlvbnMubGVuZ3RoID09PSAwXG4gICAgICA/IHt9XG4gICAgICA6IHtcbiAgICAgICAgICBvbk1vdXNlRG93bjogb25TdGFydCxcbiAgICAgICAgICBvblRvdWNoU3RhcnQ6IG9uU3RhcnRcbiAgICAgICAgfTtcblxuICBjb25zdCBub2RlQ29udGVudCA9IGNoaWxkcmVuID8gKFxuICAgIGNoaWxkcmVuLnJlZHVjZShcbiAgICAgIChhY2MsIGQsIGkpID0+IHtcbiAgICAgICAgYWNjLmNoaWxkcmVuLnB1c2goXG4gICAgICAgICAgPEdyYXBoTm9kZUNvbnRlbnQga2V5PXtpfSBjaGlsZCBkYXRhPXtkfSBpbmRleD17aX0geT17YWNjLnl9IC8+XG4gICAgICAgICk7XG4gICAgICAgIGFjYy55ICs9IGdldENvbnRlbnRSZWN0KGQsIHRydWUpLmhlaWdodDtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sXG4gICAgICB7IHk6IENvbnN0YW50cy5jb250ZW50UmVjdC55LCBjaGlsZHJlbjogW10gfVxuICAgICkuY2hpbGRyZW5cbiAgKSA6IChcbiAgICA8R3JhcGhOb2RlQ29udGVudCBkYXRhPXtkYXRhfSAvPlxuICApO1xuXG4gIGNvbnN0IG5vZGVTaGFkb3cgPSBpbnN0YW5jZXNBY3RpdmUgPyAoXG4gICAgPEdyYXBoU2hhZG93UmVjdFxuICAgICAgeD17MH1cbiAgICAgIHk9ezN9XG4gICAgICB3aWR0aD17d2lkdGh9XG4gICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgIGNvbnN1bD17aXNDb25zdWx9XG4gICAgICBhY3RpdmU9e2luc3RhbmNlc0FjdGl2ZX1cbiAgICAvPlxuICApIDogbnVsbDtcblxuICByZXR1cm4gKFxuICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3h9LCAke3l9KWB9PlxuICAgICAge25vZGVTaGFkb3d9XG4gICAgICA8R3JhcGhOb2RlUmVjdFxuICAgICAgICB4PXswfVxuICAgICAgICB5PXswfVxuICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICBjb25zdWw9e2lzQ29uc3VsfVxuICAgICAgICBhY3RpdmU9e2luc3RhbmNlc0FjdGl2ZX1cbiAgICAgICAgY29ubmVjdGVkPXtjb25uZWN0aW9ucy5sZW5ndGggIT09IDB9XG4gICAgICAgIHsuLi5ub2RlUmVjdEV2ZW50c31cbiAgICAgIC8+XG4gICAgICA8R3JhcGhOb2RlVGl0bGUgZGF0YT17ZGF0YX0gb25Ob2RlVGl0bGVDbGljaz17b25UaXRsZUNsaWNrfSAvPlxuICAgICAgPEdyYXBoTm9kZUJ1dHRvblxuICAgICAgICBpbmRleD17aW5kZXh9XG4gICAgICAgIG9uQnV0dG9uQ2xpY2s9e29uQnV0dG9uQ2xpY2t9XG4gICAgICAgIGlzQ29uc3VsPXtpc0NvbnN1bH1cbiAgICAgICAgaW5zdGFuY2VzQWN0aXZlPXtpbnN0YW5jZXNBY3RpdmV9XG4gICAgICAvPlxuICAgICAge25vZGVDb250ZW50fVxuICAgIDwvZz5cbiAgKTtcbn07XG5cbkdyYXBoTm9kZS5wcm9wVHlwZXMgPSB7XG4gIGRhdGE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgb25EcmFnU3RhcnQ6IFByb3BUeXBlcy5mdW5jLFxuICBvbk5vZGVUaXRsZUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25RdWlja0FjdGlvbnM6IFByb3BUeXBlcy5mdW5jXG59O1xuXG5leHBvcnQgZGVmYXVsdCBHcmFwaE5vZGU7XG4iXX0=