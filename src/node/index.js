import React from 'react';
import PropTypes from 'prop-types';
import Constants from '../constants';
import { getContentRect } from '../functions';
import GraphNodeTitle from './title';
import GraphNodeButton from './button';
import GraphNodeContent from './content';
import { GraphNodeRect, GraphShadowRect } from './shapes';

const GraphNode = ({
  primaryColor,
  secondaryColor,
  data,
  index,
  onDragStart,
  onTitleClick,
  onQuickActions
}) => {
  const { left, top, width, height } = data.nodeRect;
  const {
    connections,
    id,
    children,
    instancesActive,
    isConsul,
    reversed
  } = data;
  const reverse = isConsul || reversed;

  let x = data.x;
  let y = data.y;

  if ((connections || []).length !== 0) {
    x = data.x + left;
    y = data.y + top;
  }

  const onButtonClick = evt => {
    const tooltipPosition = {
      x: data.x + Constants.buttonRect.x + Constants.buttonRect.width / 2,
      y: data.y + Constants.buttonRect.y + Constants.buttonRect.height
    };

    if ((connections || []).length !== 0) {
      tooltipPosition.x += left;
      tooltipPosition.y += top;
    }

    const d = {
      service: data,
      position: {
        left: tooltipPosition.x,
        top: tooltipPosition.y
      }
    };

    if (onQuickActions) onQuickActions(evt, d);
  };

  const handleTitleClick = evt => onTitleClick(evt, { service: data });
  const onStart = evt => {
    evt.preventDefault();
    onDragStart(evt, id);
  };

  const nodeRectEvents =
    (connections || []).length === 0
      ? {}
      : {
          onMouseDown: onStart,
          onTouchStart: onStart
        };

  const nodeContent = children ? (
    children.reduce(
      (acc, d, i) => {
        acc.children.push(
          <GraphNodeContent
            key={i}
            child
            data={d}
            index={i}
            y={acc.y}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        );
        acc.y += getContentRect(d, true).height;
        return acc;
      },
      { y: Constants.contentRect.y, children: [] }
    ).children
  ) : (
    <GraphNodeContent
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      data={data}
    />
  );

  const nodeShadow = instancesActive ? (
    <GraphShadowRect
      x={0}
      y={3}
      width={width}
      height={height}
      consul={reverse}
      active={instancesActive}
    />
  ) : null;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {nodeShadow}
      <GraphNodeRect
        x={0}
        y={0}
        width={width}
        height={height}
        consul={reverse}
        active={instancesActive}
        connected={(connections || []).length !== 0}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        {...nodeRectEvents}
      />
      <GraphNodeTitle
        data={data}
        onTitleClick={handleTitleClick}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <GraphNodeButton
        index={index}
        onButtonClick={onButtonClick}
        isConsul={reverse}
        instancesActive={instancesActive}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      {nodeContent}
    </g>
  );
};

GraphNode.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onDragStart: PropTypes.func,
  onTitleClick: PropTypes.func,
  onQuickActions: PropTypes.func,
  /** 
   * Color of each node
  */
  primaryColor: PropTypes.string,
  /** 
   * Color of each node when reversed
  */
  secondaryColor: PropTypes.string
};

export default GraphNode;
