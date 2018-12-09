import styled from 'styled-components';

export const GraphLinkLine = styled.line`
  stroke: #c0c0c0;
  stroke-width: 1.5;
`;

export const GraphLinkCircle = styled.circle`
  stroke: #343434;
  fill: ${props => props.theme.secondary};
  stroke-width: 1.5;
`;

export const GraphLinkArrowLine = styled.line`
  stroke: ${props => props.theme.white};
  stroke-width: 2;
  stroke-linecap: round;
`;
