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
  primaryColor,
  secondaryColor
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
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    >
      {data.name}
    </GraphSubtitle>
  ) : null;

  const nodeInfo = (
    <GraphNodeInfo
      data={data}
      pos={nodeInfoPos}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
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
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
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
