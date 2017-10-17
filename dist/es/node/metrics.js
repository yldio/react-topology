var _jsxFileName = 'src/node/metrics.js',
    _this = this;

import React from 'react';
import { Point } from '../prop-types';
import { GraphText } from './shapes';
import PropTypes from 'prop-types';

var GraphNodeMetrics = function GraphNodeMetrics(_ref) {
  var connected = _ref.connected,
      metrics = _ref.metrics,
      pos = _ref.pos;
  var x = pos.x,
      y = pos.y;


  var metricSpacing = 18;
  var metricsText = metrics.map(function (metric, index) {
    return React.createElement(
      GraphText,
      {
        key: index,
        x: 0,
        y: 12 + metricSpacing * index,
        connected: connected,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        },
        __self: _this
      },
      metric.name + ': ' + metric.value
    );
  });

  return React.createElement(
    'g',
    { transform: 'translate(' + x + ', ' + y + ')', __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: _this
    },
    metricsText
  );
};

GraphNodeMetrics.propTypes = {
  connected: PropTypes.bool,
  metrics: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })),
  pos: Point.isRequired
};

export default GraphNodeMetrics;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL21ldHJpY3MuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQb2ludCIsIkdyYXBoVGV4dCIsIlByb3BUeXBlcyIsIkdyYXBoTm9kZU1ldHJpY3MiLCJjb25uZWN0ZWQiLCJtZXRyaWNzIiwicG9zIiwieCIsInkiLCJtZXRyaWNTcGFjaW5nIiwibWV0cmljc1RleHQiLCJtYXAiLCJtZXRyaWMiLCJpbmRleCIsIm5hbWUiLCJ2YWx1ZSIsInByb3BUeXBlcyIsImJvb2wiLCJhcnJheU9mIiwic2hhcGUiLCJzdHJpbmciLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsU0FBU0MsS0FBVCxRQUFzQixlQUF0QjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsVUFBMUI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCOztBQUVBLElBQU1DLG1CQUFtQixTQUFuQkEsZ0JBQW1CLE9BQWlDO0FBQUEsTUFBOUJDLFNBQThCLFFBQTlCQSxTQUE4QjtBQUFBLE1BQW5CQyxPQUFtQixRQUFuQkEsT0FBbUI7QUFBQSxNQUFWQyxHQUFVLFFBQVZBLEdBQVU7QUFBQSxNQUNoREMsQ0FEZ0QsR0FDdkNELEdBRHVDLENBQ2hEQyxDQURnRDtBQUFBLE1BQzdDQyxDQUQ2QyxHQUN2Q0YsR0FEdUMsQ0FDN0NFLENBRDZDOzs7QUFHeEQsTUFBTUMsZ0JBQWdCLEVBQXRCO0FBQ0EsTUFBTUMsY0FBY0wsUUFBUU0sR0FBUixDQUFZLFVBQUNDLE1BQUQsRUFBU0MsS0FBVDtBQUFBLFdBQzlCO0FBQUMsZUFBRDtBQUFBO0FBQ0UsYUFBS0EsS0FEUDtBQUVFLFdBQUcsQ0FGTDtBQUdFLFdBQUcsS0FBS0osZ0JBQWdCSSxLQUgxQjtBQUlFLG1CQUFXVCxTQUpiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTU1RLGFBQU9FLElBTmIsVUFNc0JGLE9BQU9HO0FBTjdCLEtBRDhCO0FBQUEsR0FBWixDQUFwQjs7QUFXQSxTQUFPO0FBQUE7QUFBQSxNQUFHLDBCQUF3QlIsQ0FBeEIsVUFBOEJDLENBQTlCLE1BQUg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXdDRTtBQUF4QyxHQUFQO0FBQ0QsQ0FoQkQ7O0FBa0JBUCxpQkFBaUJhLFNBQWpCLEdBQTZCO0FBQzNCWixhQUFXRixVQUFVZSxJQURNO0FBRTNCWixXQUFTSCxVQUFVZ0IsT0FBVixDQUNQaEIsVUFBVWlCLEtBQVYsQ0FBZ0I7QUFDZEwsVUFBTVosVUFBVWtCLE1BQVYsQ0FBaUJDLFVBRFQ7QUFFZE4sV0FBT2IsVUFBVWtCLE1BQVYsQ0FBaUJDO0FBRlYsR0FBaEIsQ0FETyxDQUZrQjtBQVEzQmYsT0FBS04sTUFBTXFCO0FBUmdCLENBQTdCOztBQVdBLGVBQWVsQixnQkFBZiIsImZpbGUiOiJtZXRyaWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vcHJvcC10eXBlcyc7XG5pbXBvcnQgeyBHcmFwaFRleHQgfSBmcm9tICcuL3NoYXBlcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jb25zdCBHcmFwaE5vZGVNZXRyaWNzID0gKHsgY29ubmVjdGVkLCBtZXRyaWNzLCBwb3MgfSkgPT4ge1xuICBjb25zdCB7IHgsIHkgfSA9IHBvcztcblxuICBjb25zdCBtZXRyaWNTcGFjaW5nID0gMTg7XG4gIGNvbnN0IG1ldHJpY3NUZXh0ID0gbWV0cmljcy5tYXAoKG1ldHJpYywgaW5kZXgpID0+IChcbiAgICA8R3JhcGhUZXh0XG4gICAgICBrZXk9e2luZGV4fVxuICAgICAgeD17MH1cbiAgICAgIHk9ezEyICsgbWV0cmljU3BhY2luZyAqIGluZGV4fVxuICAgICAgY29ubmVjdGVkPXtjb25uZWN0ZWR9XG4gICAgPlxuICAgICAge2Ake21ldHJpYy5uYW1lfTogJHttZXRyaWMudmFsdWV9YH1cbiAgICA8L0dyYXBoVGV4dD5cbiAgKSk7XG5cbiAgcmV0dXJuIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3h9LCAke3l9KWB9PnttZXRyaWNzVGV4dH08L2c+O1xufTtcblxuR3JhcGhOb2RlTWV0cmljcy5wcm9wVHlwZXMgPSB7XG4gIGNvbm5lY3RlZDogUHJvcFR5cGVzLmJvb2wsXG4gIG1ldHJpY3M6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG4gICAgfSlcbiAgKSxcbiAgcG9zOiBQb2ludC5pc1JlcXVpcmVkXG59O1xuXG5leHBvcnQgZGVmYXVsdCBHcmFwaE5vZGVNZXRyaWNzO1xuIl19