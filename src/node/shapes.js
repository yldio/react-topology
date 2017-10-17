import styled from 'styled-components';
import is, { isNot } from 'styled-is';
import { theme } from 'joyent-ui-toolkit';
import { darken, lighten } from 'polished';

export const GraphLine = styled.line`
  stroke: ${props => props.nodeColor && lighten(0.1, props.nodeColor)};

  ${is('consul')`
    stroke: ${props =>
      props.nodeReversedColor && darken(0.2, props.nodeReversedColor)};
  `};

  ${isNot('active')`
    stroke: ${props =>
      props.nodeReversedColor && darken(0.2, props.nodeReversedColor)};
  `};
`;

export const GraphNodeRect = styled.rect`
  fill: ${props => props.nodeColor};
  stroke: ${props => lighten(0.2, props.nodeColor)};
  stroke-width: 1.5;
  rx: 4;
  ry: 4;

  ${is('consul')`
    stroke: ${props => darken(0.2, props.nodeReversedColor)};
    fill: ${props => props.nodeReversedColor};
  `};

  ${isNot('active')`
    stroke: ${props => darken(0.2, props.nodeReversedColor)};
    fill: ${props => props.nodeReversedColor};
  `};

  ${is('connected')`
    cursor: move;
  `};
`;

export const GraphShadowRect = styled.rect`
  fill: ${props => props.nodeColor && darken(0.1, props.nodeColor)};
  opacity: 0.2;
  rx: 4;
  ry: 4;

  ${is('consul')`
    fill: ${props =>
      props.nodeReversedColor && darken(0.1, props.nodeReversedColor)};
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
