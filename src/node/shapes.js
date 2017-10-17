import styled from 'styled-components';
import is, { isNot } from 'styled-is';
import { theme } from 'joyent-ui-toolkit';

export const GraphLine = styled.line`
  stroke: ${theme.secondaryActive};
  stroke-width: 1.5;

  ${is('consul')`
    stroke: ${theme.grey};
  `};

  ${isNot('active')`
    stroke: ${theme.grey};
  `};
`;

export const GraphNodeRect = styled.rect`
  fill: ${theme.secondary};
  stroke: ${theme.secondaryActive};
  stroke-width: 1.5;
  rx: 4;
  ry: 4;

  ${is('consul')`
    stroke: ${theme.grey};
    fill: ${theme.white};
  `};

  ${isNot('active')`
    stroke: ${theme.grey};
    fill: ${theme.whiteActive};
  `};

  ${is('connected')`
    cursor: move;
  `};
`;

export const GraphShadowRect = styled.rect`
  fill: ${theme.secondary};
  opacity: 0.33;
  rx: 4;
  ry: 4;

  ${is('consul')`
    fill: ${theme.grey};
  `};
`;

export const GraphTitle = styled.text`
  font-weight: normal;

  font-size: 16px;
  font-weight: 600;
  fill: ${theme.white};

  ${is('consul')`
    fill: ${theme.secondary};
  `};

  ${isNot('active')`
    fill: ${theme.secondary};
  `};

  cursor: pointer;
`;

export const GraphSubtitle = styled.text`
  font-weight: normal;

  font-size: 12px;
  font-weight: 600;
  fill: ${theme.white};

  ${is('consul')`
    fill: ${theme.secondary};
  `};

  ${isNot('active')`
    fill: ${theme.secondary};
  `};
`;

export const GraphText = styled.text`
  font-weight: normal;

  font-size: 12px;
  fill: ${theme.white};
  opacity: 0.8;
  transform: translateY(calc(17 * ${props => props.index}px));

  ${is('consul')`
    fill: ${theme.secondary};
  `};

  ${isNot('active')`
    fill: ${theme.secondary};
  `};
`;

export const GraphButtonRect = styled.rect`
  cursor: pointer;
  opacity: 0;

  &:focus {
    outline: none;
  }
`;

export const GraphButtonCircle = styled.circle`
  fill: ${theme.white};

  ${is('consul')`
    fill: ${theme.secondary};
  `};

  ${isNot('active')`
    fill: ${theme.secondary};
  `};
`;

export const GraphHealthyCircle = styled.circle`
  fill: ${theme.green};
`;
