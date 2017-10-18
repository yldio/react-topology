import React from 'react';
import PropTypes from 'prop-types';
import Constants from '../constants';
import { GraphLine, GraphButtonRect, GraphButtonCircle } from './shapes';

const NodeButton = ({
  onButtonClick,
  index,
  isConsul,
  reversed,
  instancesActive,
  primaryColor,
  secondaryColor
}) => {
  const { x, y, width, height } = Constants.buttonRect;
  const reverse = isConsul || reversed;

  const buttonCircleRadius = 2;
  const buttonCircleSpacing = 2;
  const buttonCircleY =
    (height - buttonCircleRadius * 4 - buttonCircleSpacing * 2) / 2;

  const buttonCircles = [1, 2, 3].map((item, index) => (
    <GraphButtonCircle
      cx={width / 2}
      cy={
        buttonCircleY + (buttonCircleRadius * 2 + buttonCircleSpacing) * index
      }
      key={index}
      r={2}
      consul={reverse}
      active={instancesActive}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    />
  ));

  return (
    <g transform={`translate(${x}, ${y})`}>
      <GraphLine
        x1={0}
        y1={0}
        x2={0}
        y2={height}
        consul={reverse}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        active={instancesActive}
      />
      {buttonCircles}
      <GraphButtonRect
        height={height}
        onClick={onButtonClick}
        onKeyDown={onButtonClick}
        width={width}
        role="button"
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </g>
  );
};

NodeButton.propTypes = {
  index: PropTypes.number.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  isConsul: PropTypes.bool,
  reversed: PropTypes.bool,
  instancesActive: PropTypes.bool
};

export default NodeButton;
