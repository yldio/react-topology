var _jsxFileName = 'src/node/info.js',
    _this = this;

var _templateObject = _taggedTemplateLiteral(['\n  fill: ', ';\n\n  ', ';\n'], ['\n  fill: ', ';\n\n  ', ';\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    fill: ', ';\n  '], ['\n    fill: ', ';\n  ']),
    _templateObject3 = _taggedTemplateLiteral(['\n  fill: ', ';\n\n  ', ';\n\n  ', ';\n'], ['\n  fill: ', ';\n\n  ', ';\n\n  ', ';\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import styled from 'styled-components';
import is, { isNot } from 'styled-is';
import PropTypes from 'prop-types';
import { Point } from '../prop-types';
import { GraphText } from './shapes';
import { HealthyIcon, theme, InstancesIcon, InstancesIconLight } from 'joyent-ui-toolkit';

var StyledInstancesIcon = styled(InstancesIcon)(_templateObject, theme.secondary, isNot('active')(_templateObject2, theme.secondary));

var StyledHealthyIcon = styled(HealthyIcon)(_templateObject3, theme.orange, is('healthy')(_templateObject2, theme.green), isNot('healthy')(_templateObject2, theme.orange));

var GraphNodeInfo = function GraphNodeInfo(_ref) {
  var data = _ref.data,
      pos = _ref.pos;
  var instances = data.instances,
      instanceStatuses = data.instanceStatuses,
      instancesHealthy = data.instancesHealthy,
      isConsul = data.isConsul,
      instancesActive = data.instancesActive,
      transitionalStatus = data.transitionalStatus,
      status = data.status;
  var x = pos.x,
      y = pos.y;


  var statuses = transitionalStatus ? React.createElement(
    GraphText,
    { consul: isConsul, active: instancesActive, __source: {
        fileName: _jsxFileName,
        lineNumber: 48
      },
      __self: _this
    },
    status.toLowerCase()
  ) : instanceStatuses.map(function (instanceStatus, index) {
    return React.createElement(
      GraphText,
      { key: index, index: index, consul: isConsul, active: instancesActive, __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: _this
      },
      instanceStatus.count + '\n            ' + instanceStatus.status.toLowerCase()
    );
  });

  var healthy = React.createElement(StyledHealthyIcon, {
    healthy: instancesHealthy && instancesHealthy.total === instancesHealthy.healthy,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: _this
  });

  return React.createElement(
    'g',
    { transform: 'translate(' + x + ', ' + y + ')', __source: {
        fileName: _jsxFileName,
        lineNumber: 69
      },
      __self: _this
    },
    React.createElement(
      'g',
      { transform: 'translate(0, 0)', __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: _this
      },
      healthy
    ),
    React.createElement(
      'g',
      { transform: 'translate(30, 4.5)', __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        },
        __self: _this
      },
      isConsul ? React.createElement(StyledInstancesIcon, { active: instancesActive, __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        },
        __self: _this
      }) : React.createElement(InstancesIconLight, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        },
        __self: _this
      })
    ),
    React.createElement(
      GraphText,
      { x: 54, y: 14, consul: isConsul, active: instancesActive, __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: _this
      },
      instances.length + ' inst.'
    ),
    React.createElement(
      'g',
      { transform: 'translate(54, 36)', height: '200', __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        },
        __self: _this
      },
      statuses
    )
  );
};

GraphNodeInfo.propTypes = {
  data: PropTypes.object.isRequired,
  pos: Point.isRequired
};

export default GraphNodeInfo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2luZm8uanMiXSwibmFtZXMiOlsiUmVhY3QiLCJzdHlsZWQiLCJpcyIsImlzTm90IiwiUHJvcFR5cGVzIiwiUG9pbnQiLCJHcmFwaFRleHQiLCJIZWFsdGh5SWNvbiIsInRoZW1lIiwiSW5zdGFuY2VzSWNvbiIsIkluc3RhbmNlc0ljb25MaWdodCIsIlN0eWxlZEluc3RhbmNlc0ljb24iLCJzZWNvbmRhcnkiLCJTdHlsZWRIZWFsdGh5SWNvbiIsIm9yYW5nZSIsImdyZWVuIiwiR3JhcGhOb2RlSW5mbyIsImRhdGEiLCJwb3MiLCJpbnN0YW5jZXMiLCJpbnN0YW5jZVN0YXR1c2VzIiwiaW5zdGFuY2VzSGVhbHRoeSIsImlzQ29uc3VsIiwiaW5zdGFuY2VzQWN0aXZlIiwidHJhbnNpdGlvbmFsU3RhdHVzIiwic3RhdHVzIiwieCIsInkiLCJzdGF0dXNlcyIsInRvTG93ZXJDYXNlIiwibWFwIiwiaW5zdGFuY2VTdGF0dXMiLCJpbmRleCIsImNvdW50IiwiaGVhbHRoeSIsInRvdGFsIiwibGVuZ3RoIiwicHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsbUJBQW5CO0FBQ0EsT0FBT0MsRUFBUCxJQUFhQyxLQUFiLFFBQTBCLFdBQTFCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLEtBQVQsUUFBc0IsZUFBdEI7QUFDQSxTQUFTQyxTQUFULFFBQTBCLFVBQTFCO0FBQ0EsU0FDRUMsV0FERixFQUVFQyxLQUZGLEVBR0VDLGFBSEYsRUFJRUMsa0JBSkYsUUFLTyxtQkFMUDs7QUFPQSxJQUFNQyxzQkFBc0JWLE9BQU9RLGFBQVAsQ0FBdEIsa0JBQ0lELE1BQU1JLFNBRFYsRUFHRlQsTUFBTSxRQUFOLENBSEUsbUJBSU1LLE1BQU1JLFNBSlosRUFBTjs7QUFRQSxJQUFNQyxv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MUI7O0FBS0EsZUFBZXZCLGFBQWYiLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBpcywgeyBpc05vdCB9IGZyb20gJ3N0eWxlZC1pcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi9wcm9wLXR5cGVzJztcbmltcG9ydCB7IEdyYXBoVGV4dCB9IGZyb20gJy4vc2hhcGVzJztcbmltcG9ydCB7XG4gIEhlYWx0aHlJY29uLFxuICB0aGVtZSxcbiAgSW5zdGFuY2VzSWNvbixcbiAgSW5zdGFuY2VzSWNvbkxpZ2h0XG59IGZyb20gJ2pveWVudC11aS10b29sa2l0JztcblxuY29uc3QgU3R5bGVkSW5zdGFuY2VzSWNvbiA9IHN0eWxlZChJbnN0YW5jZXNJY29uKWBcbiAgZmlsbDogJHt0aGVtZS5zZWNvbmRhcnl9O1xuXG4gICR7aXNOb3QoJ2FjdGl2ZScpYFxuICAgIGZpbGw6ICR7dGhlbWUuc2Vjb25kYXJ5fTtcbiAgYH07XG5gO1xuXG5jb25zdCBTdHlsZWRIZWFsdGh5SWNvbiA9IHN0eWxlZChIZWFsdGh5SWNvbilgXG4gIGZpbGw6ICR7dGhlbWUub3JhbmdlfTtcblxuICAke2lzKCdoZWFsdGh5JylgXG4gICAgZmlsbDogJHt0aGVtZS5ncmVlbn07XG4gIGB9O1xuXG4gICR7aXNOb3QoJ2hlYWx0aHknKWBcbiAgICBmaWxsOiAke3RoZW1lLm9yYW5nZX07XG4gIGB9O1xuYDtcblxuY29uc3QgR3JhcGhOb2RlSW5mbyA9ICh7IGRhdGEsIHBvcyB9KSA9PiB7XG4gIGNvbnN0IHtcbiAgICBpbnN0YW5jZXMsXG4gICAgaW5zdGFuY2VTdGF0dXNlcyxcbiAgICBpbnN0YW5jZXNIZWFsdGh5LFxuICAgIGlzQ29uc3VsLFxuICAgIGluc3RhbmNlc0FjdGl2ZSxcbiAgICB0cmFuc2l0aW9uYWxTdGF0dXMsXG4gICAgc3RhdHVzXG4gIH0gPSBkYXRhO1xuXG4gIGNvbnN0IHsgeCwgeSB9ID0gcG9zO1xuXG4gIGNvbnN0IHN0YXR1c2VzID0gdHJhbnNpdGlvbmFsU3RhdHVzID8gKFxuICAgIDxHcmFwaFRleHQgY29uc3VsPXtpc0NvbnN1bH0gYWN0aXZlPXtpbnN0YW5jZXNBY3RpdmV9PlxuICAgICAge3N0YXR1cy50b0xvd2VyQ2FzZSgpfVxuICAgIDwvR3JhcGhUZXh0PlxuICApIDogKFxuICAgIGluc3RhbmNlU3RhdHVzZXMubWFwKChpbnN0YW5jZVN0YXR1cywgaW5kZXgpID0+IChcbiAgICAgIDxHcmFwaFRleHQga2V5PXtpbmRleH0gaW5kZXg9e2luZGV4fSBjb25zdWw9e2lzQ29uc3VsfSBhY3RpdmU9e2luc3RhbmNlc0FjdGl2ZX0+XG4gICAgICAgIHtgJHtpbnN0YW5jZVN0YXR1cy5jb3VudH1cbiAgICAgICAgICAgICR7aW5zdGFuY2VTdGF0dXMuc3RhdHVzLnRvTG93ZXJDYXNlKCl9YH1cbiAgICAgIDwvR3JhcGhUZXh0PlxuICAgICkpXG4gICk7XG5cbiAgY29uc3QgaGVhbHRoeSA9IChcbiAgICA8U3R5bGVkSGVhbHRoeUljb25cbiAgICAgIGhlYWx0aHk9e1xuICAgICAgICBpbnN0YW5jZXNIZWFsdGh5ICYmIGluc3RhbmNlc0hlYWx0aHkudG90YWwgPT09IGluc3RhbmNlc0hlYWx0aHkuaGVhbHRoeVxuICAgICAgfVxuICAgIC8+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHt4fSwgJHt5fSlgfT5cbiAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgwLCAwKWB9PntoZWFsdGh5fTwvZz5cbiAgICAgIDxnIHRyYW5zZm9ybT17J3RyYW5zbGF0ZSgzMCwgNC41KSd9PlxuICAgICAgICB7IGlzQ29uc3VsID8gPFN0eWxlZEluc3RhbmNlc0ljb24gYWN0aXZlPXtpbnN0YW5jZXNBY3RpdmV9IC8+IDogIDxJbnN0YW5jZXNJY29uTGlnaHQgLz4gfVxuICAgICAgPC9nPlxuICAgICAgPEdyYXBoVGV4dCB4PXs1NH0geT17MTR9IGNvbnN1bD17aXNDb25zdWx9IGFjdGl2ZT17aW5zdGFuY2VzQWN0aXZlfT5cbiAgICAgICAge2Ake2luc3RhbmNlcy5sZW5ndGh9IGluc3QuYH1cbiAgICAgIDwvR3JhcGhUZXh0PlxuICAgICAgPGcgdHJhbnNmb3JtPXsndHJhbnNsYXRlKDU0LCAzNiknfSBoZWlnaHQ9XCIyMDBcIj57c3RhdHVzZXN9PC9nPlxuICAgIDwvZz5cbiAgKTtcbn07XG5cbkdyYXBoTm9kZUluZm8ucHJvcFR5cGVzID0ge1xuICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHBvczogUG9pbnQuaXNSZXF1aXJlZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgR3JhcGhOb2RlSW5mbztcbiJdfQ==