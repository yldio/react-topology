import styled from 'styled-components';
import { theme } from 'joyent-ui-toolkit';

export const GraphLinkLine = styled.line`
  stroke: #c0c0c0;
  stroke-width: 1.5;
`;

export const GraphLinkCircle = styled.circle`
  stroke: #343434;
  fill: ${theme.secondary};
  stroke-width: 1.5;
`;

export const GraphLinkArrowLine = styled.line`
  stroke: ${theme.white};
  stroke-width: 2;
  stroke-linecap: round;
`;
