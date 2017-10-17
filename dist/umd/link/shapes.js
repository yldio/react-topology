'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphLinkArrowLine = exports.GraphLinkCircle = exports.GraphLinkLine = undefined;

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _joyentUiToolkit = require('joyent-ui-toolkit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GraphLinkLine = exports.GraphLinkLine = _styledComponents2.default.line`
  stroke: ${_joyentUiToolkit.theme.secondaryActive};
  stroke-width: 1.5;
`;

const GraphLinkCircle = exports.GraphLinkCircle = _styledComponents2.default.circle`
  stroke: ${_joyentUiToolkit.theme.secondaryActive};
  fill: ${_joyentUiToolkit.theme.secondary};
  stroke-width: 1.5;
`;

const GraphLinkArrowLine = exports.GraphLinkArrowLine = _styledComponents2.default.line`
  stroke: ${_joyentUiToolkit.theme.white};
  stroke-width: 2;
  stroke-linecap: round;
`;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saW5rL3NoYXBlcy5qcyJdLCJuYW1lcyI6WyJHcmFwaExpbmtMaW5lIiwibGluZSIsInNlY29uZGFyeUFjdGl2ZSIsIkdyYXBoTGlua0NpcmNsZSIsImNpcmNsZSIsInNlY29uZGFyeSIsIkdyYXBoTGlua0Fycm93TGluZSIsIndoaXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVPLE1BQU1BLHdDQUFnQiwyQkFBT0MsSUFBSztZQUM3Qix1QkFBTUMsZUFBZ0I7O0NBRDNCOztBQUtBLE1BQU1DLDRDQUFrQiwyQkFBT0MsTUFBTztZQUNqQyx1QkFBTUYsZUFBZ0I7VUFDeEIsdUJBQU1HLFNBQVU7O0NBRm5COztBQU1BLE1BQU1DLGtEQUFxQiwyQkFBT0wsSUFBSztZQUNsQyx1QkFBTU0sS0FBTTs7O0NBRGpCIiwiZmlsZSI6InNoYXBlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICdqb3llbnQtdWktdG9vbGtpdCdcblxuZXhwb3J0IGNvbnN0IEdyYXBoTGlua0xpbmUgPSBzdHlsZWQubGluZWBcbiAgc3Ryb2tlOiAke3RoZW1lLnNlY29uZGFyeUFjdGl2ZX07XG4gIHN0cm9rZS13aWR0aDogMS41O1xuYDtcblxuZXhwb3J0IGNvbnN0IEdyYXBoTGlua0NpcmNsZSA9IHN0eWxlZC5jaXJjbGVgXG4gIHN0cm9rZTogJHt0aGVtZS5zZWNvbmRhcnlBY3RpdmV9O1xuICBmaWxsOiAke3RoZW1lLnNlY29uZGFyeX07XG4gIHN0cm9rZS13aWR0aDogMS41O1xuYDtcblxuZXhwb3J0IGNvbnN0IEdyYXBoTGlua0Fycm93TGluZSA9IHN0eWxlZC5saW5lYFxuICBzdHJva2U6ICR7dGhlbWUud2hpdGV9O1xuICBzdHJva2Utd2lkdGg6IDI7XG4gIHN0cm9rZS1saW5lY2FwOiByb3VuZDtcbmA7XG4iXX0=