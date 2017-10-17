'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Size = exports.Rect = exports.Point = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const p = {
  x: _propTypes2.default.number.isRequired,
  y: _propTypes2.default.number.isRequired
};

const s = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number
};

const Point = _propTypes2.default.shape(Object.assign({}, p));

const Size = _propTypes2.default.shape(Object.assign({}, s));

const Rect = _propTypes2.default.shape(Object.assign({}, p, s));

exports.Point = Point;
exports.Rect = Rect;
exports.Size = Size;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9wLXR5cGVzLmpzIl0sIm5hbWVzIjpbInAiLCJ4IiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsInkiLCJzIiwid2lkdGgiLCJoZWlnaHQiLCJQb2ludCIsInNoYXBlIiwiU2l6ZSIsIlJlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsTUFBTUEsSUFBSTtBQUNSQyxLQUFHLG9CQUFVQyxNQUFWLENBQWlCQyxVQURaO0FBRVJDLEtBQUcsb0JBQVVGLE1BQVYsQ0FBaUJDO0FBRlosQ0FBVjs7QUFLQSxNQUFNRSxJQUFJO0FBQ1JDLFNBQU8sb0JBQVVKLE1BRFQ7QUFFUkssVUFBUSxvQkFBVUw7QUFGVixDQUFWOztBQUtBLE1BQU1NLFFBQVEsb0JBQVVDLEtBQVYsbUJBQ1RULENBRFMsRUFBZDs7QUFJQSxNQUFNVSxPQUFPLG9CQUFVRCxLQUFWLG1CQUNSSixDQURRLEVBQWI7O0FBSUEsTUFBTU0sT0FBTyxvQkFBVUYsS0FBVixtQkFDUlQsQ0FEUSxFQUVSSyxDQUZRLEVBQWI7O1FBS1NHLEssR0FBQUEsSztRQUFPRyxJLEdBQUFBLEk7UUFBTUQsSSxHQUFBQSxJIiwiZmlsZSI6InByb3AtdHlwZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBwID0ge1xuICB4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIHk6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcblxuY29uc3QgcyA9IHtcbiAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gIGhlaWdodDogUHJvcFR5cGVzLm51bWJlclxufTtcblxuY29uc3QgUG9pbnQgPSBQcm9wVHlwZXMuc2hhcGUoe1xuICAuLi5wXG59KTtcblxuY29uc3QgU2l6ZSA9IFByb3BUeXBlcy5zaGFwZSh7XG4gIC4uLnNcbn0pO1xuXG5jb25zdCBSZWN0ID0gUHJvcFR5cGVzLnNoYXBlKHtcbiAgLi4ucCxcbiAgLi4uc1xufSk7XG5cbmV4cG9ydCB7IFBvaW50LCBSZWN0LCBTaXplIH07XG4iXX0=