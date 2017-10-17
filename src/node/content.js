import React from 'react';
import PropTypes from 'prop-types';
import Constants from '../constants';
import { GraphLine, GraphSubtitle } from './shapes';
import GraphNodeInfo from './info';

const GraphNodeContent = ({
  child = false,
  data,
  y = Constants.contentRect.y,
  index = 0,
  nodeColor,
  nodeReversedColor
}) => {
  const { x, width } = Constants.contentRect;
  const reverse = data.isConsul || data.reversed;

  const nodeInfoPos = child
    ? {
        x: Constants.infoPosition.x,
        y: Constants.infoPosition.y + 21
      }
    : Constants.infoPosition;

  const nodeSubtitle = child ? (
    <GraphSubtitle
      {...Constants.subtitlePosition}
      consul={reverse}
      active={data.instancesActive}
      nodeColor={nodeColor}
      nodeReversedColor={nodeReversedColor}
    >
      {data.name}
    </GraphSubtitle>
  ) : null;

  const nodeInfo = (
    <GraphNodeInfo
      data={data}
      pos={nodeInfoPos}
      nodeColor={nodeColor}
      nodeReversedColor={nodeReversedColor}
    />
  );
  return (
    <g transform={`translate(${x}, ${y})`}>
      <GraphLine
        x1={0}
        y1={0}
        x2={width}
        y2={0}
        consul={reverse}
        active={data.instancesActive}
        nodeColor={nodeColor}
        nodeReversedColor={nodeReversedColor}
      />
      {nodeSubtitle}
      {nodeInfo}
    </g>
  );
};

GraphNodeContent.propTypes = {
  child: PropTypes.bool,
  data: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default GraphNodeContent;
