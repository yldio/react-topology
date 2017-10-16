import React from 'react';
import PropTypes from 'prop-types';
import Constants from '../constants';
import { GraphTitle } from './shapes';

const GraphNodeTitle = ({ data, onNodeTitleClick }) => (
  <g>
    <GraphTitle
      x={Constants.paddingLeft}
      y={30}
      onClick={onNodeTitleClick}
      onKeyDown={onNodeTitleClick}
      consul={data.isConsul}
      active={data.instancesActive}
    >
      {data.name}
    </GraphTitle>
  </g>
);

GraphNodeTitle.propTypes = {
  data: PropTypes.object.isRequired,
  onNodeTitleClick: PropTypes.func
};

export default GraphNodeTitle;
