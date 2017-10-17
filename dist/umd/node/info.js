'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/node/info.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styledIs = require('styled-is');

var _styledIs2 = _interopRequireDefault(_styledIs);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propTypes3 = require('../prop-types');

var _shapes = require('./shapes');

var _joyentUiToolkit = require('joyent-ui-toolkit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledInstancesIcon = (0, _styledComponents2.default)(_joyentUiToolkit.InstancesIcon)`
  fill: ${_joyentUiToolkit.theme.secondary};

  ${(0, _styledIs.isNot)('active')`
    fill: ${_joyentUiToolkit.theme.secondary};
  `};
`;

const StyledHealthyIcon = (0, _styledComponents2.default)(_joyentUiToolkit.HealthyIcon)`
  fill: ${_joyentUiToolkit.theme.orange};

  ${(0, _styledIs2.default)('healthy')`
    fill: ${_joyentUiToolkit.theme.green};
  `};

  ${(0, _styledIs.isNot)('healthy')`
    fill: ${_joyentUiToolkit.theme.orange};
  `};
`;

const GraphNodeInfo = ({ data, pos }) => {
  const {
    instances,
    instanceStatuses,
    instancesHealthy,
    isConsul,
    instancesActive,
    transitionalStatus,
    status
  } = data;

  const { x, y } = pos;

  const statuses = transitionalStatus ? _react2.default.createElement(
    _shapes.GraphText,
    { consul: isConsul, active: instancesActive, __source: {
        fileName: _jsxFileName,
        lineNumber: 48
      },
      __self: undefined
    },
    status.toLowerCase()
  ) : instanceStatuses.map((instanceStatus, index) => _react2.default.createElement(
    _shapes.GraphText,
    { key: index, index: index, consul: isConsul, active: instancesActive, __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: undefined
    },
    `${instanceStatus.count}
            ${instanceStatus.status.toLowerCase()}`
  ));

  const healthy = _react2.default.createElement(StyledHealthyIcon, {
    healthy: instancesHealthy && instancesHealthy.total === instancesHealthy.healthy,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: undefined
  });

  return _react2.default.createElement(
    'g',
    { transform: `translate(${x}, ${y})`, __source: {
        fileName: _jsxFileName,
        lineNumber: 69
      },
      __self: undefined
    },
    _react2.default.createElement(
      'g',
      { transform: `translate(0, 0)`, __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: undefined
      },
      healthy
    ),
    _react2.default.createElement(
      'g',
      { transform: 'translate(30, 4.5)', __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        },
        __self: undefined
      },
      isConsul ? _react2.default.createElement(StyledInstancesIcon, { active: instancesActive, __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        },
        __self: undefined
      }) : _react2.default.createElement(_joyentUiToolkit.InstancesIconLight, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        },
        __self: undefined
      })
    ),
    _react2.default.createElement(
      _shapes.GraphText,
      { x: 54, y: 14, consul: isConsul, active: instancesActive, __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: undefined
      },
      `${instances.length} inst.`
    ),
    _react2.default.createElement(
      'g',
      { transform: 'translate(54, 36)', height: '200', __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        },
        __self: undefined
      },
      statuses
    )
  );
};

GraphNodeInfo.propTypes = {
  data: _propTypes2.default.object.isRequired,
  pos: _propTypes3.Point.isRequired
};

exports.default = GraphNodeInfo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2luZm8uanMiXSwibmFtZXMiOlsiU3R5bGVkSW5zdGFuY2VzSWNvbiIsInNlY29uZGFyeSIsIlN0eWxlZEhlYWx0aHlJY29uIiwib3JhbmdlIiwiZ3JlZW4iLCJHcmFwaE5vZGVJbmZvIiwiZGF0YSIsInBvcyIsImluc3RhbmNlcyIsImluc3RhbmNlU3RhdHVzZXMiLCJpbnN0YW5jZXNIZWFsdGh5IiwiaXNDb25zdWwiLCJpbnN0YW5jZXNBY3RpdmUiLCJ0cmFuc2l0aW9uYWxTdGF0dXMiLCJzdGF0dXMiLCJ4IiwieSIsInN0YXR1c2VzIiwidG9Mb3dlckNhc2UiLCJtYXAiLCJpbnN0YW5jZVN0YXR1cyIsImluZGV4IiwiY291bnQiLCJoZWFsdGh5IiwidG90YWwiLCJsZW5ndGgiLCJwcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQU9BLE1BQU1BLHNCQUFzQiwrREFBc0I7VUFDeEMsdUJBQU1DLFNBQVU7O0lBRXRCLHFCQUFNLFFBQU4sQ0FBZ0I7WUFDUix1QkFBTUEsU0FBVTtHQUN4QjtDQUxKOztBQVFBLE1BQU1DLG9CQUFvQiw2REFBb0I7VUFDcEMsdUJBQU1DLE1BQU87O0lBRW5CLHdCQUFHLFNBQUgsQ0FBYztZQUNOLHVCQUFNQyxLQUFNO0dBQ3BCOztJQUVBLHFCQUFNLFNBQU4sQ0FBaUI7WUFDVCx1QkFBTUQsTUFBTztHQUNyQjtDQVRKOztBQVlBLE1BQU1FLGdCQUFnQixDQUFDLEVBQUVDLElBQUYsRUFBUUMsR0FBUixFQUFELEtBQW1CO0FBQ3ZDLFFBQU07QUFDSkMsYUFESTtBQUVKQyxvQkFGSTtBQUdKQyxvQkFISTtBQUlKQyxZQUpJO0FBS0pDLG1CQUxJO0FBTUpDLHNCQU5JO0FBT0pDO0FBUEksTUFRRlIsSUFSSjs7QUFVQSxRQUFNLEVBQUVTLENBQUYsRUFBS0MsQ0FBTCxLQUFXVCxHQUFqQjs7QUFFQSxRQUFNVSxXQUFXSixxQkFDZjtBQUFBO0FBQUEsTUFBVyxRQUFRRixRQUFuQixFQUE2QixRQUFRQyxlQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDR0UsV0FBT0ksV0FBUDtBQURILEdBRGUsR0FLZlQsaUJBQWlCVSxHQUFqQixDQUFxQixDQUFDQyxjQUFELEVBQWlCQyxLQUFqQixLQUNuQjtBQUFBO0FBQUEsTUFBVyxLQUFLQSxLQUFoQixFQUF1QixPQUFPQSxLQUE5QixFQUFxQyxRQUFRVixRQUE3QyxFQUF1RCxRQUFRQyxlQUEvRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDSSxPQUFFUSxlQUFlRSxLQUFNO2NBQ25CRixlQUFlTixNQUFmLENBQXNCSSxXQUF0QixFQUFvQztBQUY1QyxHQURGLENBTEY7O0FBYUEsUUFBTUssVUFDSiw4QkFBQyxpQkFBRDtBQUNFLGFBQ0ViLG9CQUFvQkEsaUJBQWlCYyxLQUFqQixLQUEyQmQsaUJBQWlCYSxPQUZwRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURGOztBQVFBLFNBQ0U7QUFBQTtBQUFBLE1BQUcsV0FBWSxhQUFZUixDQUFFLEtBQUlDLENBQUUsR0FBbkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFFBQUcsV0FBWSxpQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBa0NPO0FBQWxDLEtBREY7QUFFRTtBQUFBO0FBQUEsUUFBRyxXQUFXLG9CQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNJWixpQkFBVyw4QkFBQyxtQkFBRCxJQUFxQixRQUFRQyxlQUE3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBWCxHQUErRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURuRSxLQUZGO0FBS0U7QUFBQTtBQUFBLFFBQVcsR0FBRyxFQUFkLEVBQWtCLEdBQUcsRUFBckIsRUFBeUIsUUFBUUQsUUFBakMsRUFBMkMsUUFBUUMsZUFBbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0ksU0FBRUosVUFBVWlCLE1BQU87QUFEdkIsS0FMRjtBQVFFO0FBQUE7QUFBQSxRQUFHLFdBQVcsbUJBQWQsRUFBbUMsUUFBTyxLQUExQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBaURSO0FBQWpEO0FBUkYsR0FERjtBQVlELENBOUNEOztBQWdEQVosY0FBY3FCLFNBQWQsR0FBMEI7QUFDeEJwQixRQUFNLG9CQUFVcUIsTUFBVixDQUFpQkMsVUFEQztBQUV4QnJCLE9BQUssa0JBQU1xQjtBQUZhLENBQTFCOztrQkFLZXZCLGEiLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBpcywgeyBpc05vdCB9IGZyb20gJ3N0eWxlZC1pcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi9wcm9wLXR5cGVzJztcbmltcG9ydCB7IEdyYXBoVGV4dCB9IGZyb20gJy4vc2hhcGVzJztcbmltcG9ydCB7XG4gIEhlYWx0aHlJY29uLFxuICB0aGVtZSxcbiAgSW5zdGFuY2VzSWNvbixcbiAgSW5zdGFuY2VzSWNvbkxpZ2h0XG59IGZyb20gJ2pveWVudC11aS10b29sa2l0JztcblxuY29uc3QgU3R5bGVkSW5zdGFuY2VzSWNvbiA9IHN0eWxlZChJbnN0YW5jZXNJY29uKWBcbiAgZmlsbDogJHt0aGVtZS5zZWNvbmRhcnl9O1xuXG4gICR7aXNOb3QoJ2FjdGl2ZScpYFxuICAgIGZpbGw6ICR7dGhlbWUuc2Vjb25kYXJ5fTtcbiAgYH07XG5gO1xuXG5jb25zdCBTdHlsZWRIZWFsdGh5SWNvbiA9IHN0eWxlZChIZWFsdGh5SWNvbilgXG4gIGZpbGw6ICR7dGhlbWUub3JhbmdlfTtcblxuICAke2lzKCdoZWFsdGh5JylgXG4gICAgZmlsbDogJHt0aGVtZS5ncmVlbn07XG4gIGB9O1xuXG4gICR7aXNOb3QoJ2hlYWx0aHknKWBcbiAgICBmaWxsOiAke3RoZW1lLm9yYW5nZX07XG4gIGB9O1xuYDtcblxuY29uc3QgR3JhcGhOb2RlSW5mbyA9ICh7IGRhdGEsIHBvcyB9KSA9PiB7XG4gIGNvbnN0IHtcbiAgICBpbnN0YW5jZXMsXG4gICAgaW5zdGFuY2VTdGF0dXNlcyxcbiAgICBpbnN0YW5jZXNIZWFsdGh5LFxuICAgIGlzQ29uc3VsLFxuICAgIGluc3RhbmNlc0FjdGl2ZSxcbiAgICB0cmFuc2l0aW9uYWxTdGF0dXMsXG4gICAgc3RhdHVzXG4gIH0gPSBkYXRhO1xuXG4gIGNvbnN0IHsgeCwgeSB9ID0gcG9zO1xuXG4gIGNvbnN0IHN0YXR1c2VzID0gdHJhbnNpdGlvbmFsU3RhdHVzID8gKFxuICAgIDxHcmFwaFRleHQgY29uc3VsPXtpc0NvbnN1bH0gYWN0aXZlPXtpbnN0YW5jZXNBY3RpdmV9PlxuICAgICAge3N0YXR1cy50b0xvd2VyQ2FzZSgpfVxuICAgIDwvR3JhcGhUZXh0PlxuICApIDogKFxuICAgIGluc3RhbmNlU3RhdHVzZXMubWFwKChpbnN0YW5jZVN0YXR1cywgaW5kZXgpID0+IChcbiAgICAgIDxHcmFwaFRleHQga2V5PXtpbmRleH0gaW5kZXg9e2luZGV4fSBjb25zdWw9e2lzQ29uc3VsfSBhY3RpdmU9e2luc3RhbmNlc0FjdGl2ZX0+XG4gICAgICAgIHtgJHtpbnN0YW5jZVN0YXR1cy5jb3VudH1cbiAgICAgICAgICAgICR7aW5zdGFuY2VTdGF0dXMuc3RhdHVzLnRvTG93ZXJDYXNlKCl9YH1cbiAgICAgIDwvR3JhcGhUZXh0PlxuICAgICkpXG4gICk7XG5cbiAgY29uc3QgaGVhbHRoeSA9IChcbiAgICA8U3R5bGVkSGVhbHRoeUljb25cbiAgICAgIGhlYWx0aHk9e1xuICAgICAgICBpbnN0YW5jZXNIZWFsdGh5ICYmIGluc3RhbmNlc0hlYWx0aHkudG90YWwgPT09IGluc3RhbmNlc0hlYWx0aHkuaGVhbHRoeVxuICAgICAgfVxuICAgIC8+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHt4fSwgJHt5fSlgfT5cbiAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgwLCAwKWB9PntoZWFsdGh5fTwvZz5cbiAgICAgIDxnIHRyYW5zZm9ybT17J3RyYW5zbGF0ZSgzMCwgNC41KSd9PlxuICAgICAgICB7IGlzQ29uc3VsID8gPFN0eWxlZEluc3RhbmNlc0ljb24gYWN0aXZlPXtpbnN0YW5jZXNBY3RpdmV9IC8+IDogIDxJbnN0YW5jZXNJY29uTGlnaHQgLz4gfVxuICAgICAgPC9nPlxuICAgICAgPEdyYXBoVGV4dCB4PXs1NH0geT17MTR9IGNvbnN1bD17aXNDb25zdWx9IGFjdGl2ZT17aW5zdGFuY2VzQWN0aXZlfT5cbiAgICAgICAge2Ake2luc3RhbmNlcy5sZW5ndGh9IGluc3QuYH1cbiAgICAgIDwvR3JhcGhUZXh0PlxuICAgICAgPGcgdHJhbnNmb3JtPXsndHJhbnNsYXRlKDU0LCAzNiknfSBoZWlnaHQ9XCIyMDBcIj57c3RhdHVzZXN9PC9nPlxuICAgIDwvZz5cbiAgKTtcbn07XG5cbkdyYXBoTm9kZUluZm8ucHJvcFR5cGVzID0ge1xuICBkYXRhOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHBvczogUG9pbnQuaXNSZXF1aXJlZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgR3JhcGhOb2RlSW5mbztcbiJdfQ==