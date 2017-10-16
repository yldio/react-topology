import React from 'react';
import styled from 'styled-components';
import is, { isNot } from 'styled-is';
import PropTypes from 'prop-types';
import { Point } from '../prop-types';
import { GraphText } from './shapes';
import { HealthyIcon, theme, InstancesIcon } from 'joyent-ui-toolkit';

const StyledInstancesIcon = styled(InstancesIcon)`
  fill: ${theme.white};

  ${is('consul')`
    fill: ${theme.secondary};
  `};

  ${isNot('active')`
    fill: ${theme.secondary};
  `};
`;

const StyledHealthyIcon = styled(HealthyIcon)`
  fill: ${theme.orange};

  ${is('healthy')`
    fill: ${theme.green};
  `};

  ${is('unhealthy')`
    fill: ${theme.red};
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

  const statuses = transitionalStatus ? (
    <GraphText consul={isConsul} active={instancesActive}>
      {status.toLowerCase()}
    </GraphText>
  ) : (
    instanceStatuses.map((instanceStatus, index) => (
      <GraphText key={index} consul={isConsul} active={instancesActive}>
        {`${instanceStatus.count}
            ${instanceStatus.status.toLowerCase()}`}
      </GraphText>
    ))
  );

  const healthy = (
    <StyledHealthyIcon
      healthy={
        instancesHealthy && instancesHealthy.total === instancesHealthy.healthy
          ? 'HEALTHY'
          : 'UNHEALTHY'
      }
    />
  );

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`translate(0, 0)`}>{healthy}</g>
      <g transform={'translate(30, 4.5)'}>
        <StyledInstancesIcon consul={isConsul} active={instancesActive} />
      </g>
      <GraphText x={54} y={14} consul={isConsul} active={instancesActive}>
        {`${instances.length} inst.`}
      </GraphText>
      <g transform={'translate(54, 36)'}>{statuses}</g>
    </g>
  );
};

GraphNodeInfo.propTypes = {
  data: PropTypes.object.isRequired,
  pos: Point.isRequired
};

export default GraphNodeInfo;
