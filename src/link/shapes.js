import styled from 'styled-components';
import { theme } from 'joyent-ui-toolkit'

export const GraphLinkLine = styled.line`
  stroke: ${theme.secondaryActive};
  stroke-width: 1.5;
`;

export const GraphLinkCircle = styled.circle`
  stroke: ${theme.secondaryActive};
  fill: ${theme.secondary};
  stroke-width: 1.5;
`;

export const GraphLinkArrowLine = styled.line`
  stroke: ${theme.white};
  stroke-width: 2;
  stroke-linecap: round;
`;
