import styled from 'styled-components';
import is, { isNot } from 'styled-is';
import { theme } from 'joyent-ui-toolkit';
import { darken, lighten } from 'polished';

export const GraphLine = styled.line`
  stroke: ${props => props.primaryColor && lighten(0.1, props.primaryColor)};

  ${is('consul')`
    stroke: ${props =>
      props.secondaryColor && darken(0.2, props.secondaryColor)};
  `};

  ${isNot('active')`
    stroke: ${props =>
      props.secondaryColor && darken(0.2, props.secondaryColor)};
  `};
`;

export const GraphNodeRect = styled.rect`
  fill: ${props => props.primaryColor};
  stroke: ${props => lighten(0.2, props.primaryColor)};
  stroke-width: 1.5;
  rx: 4;
  ry: 4;

  ${is('consul')`
    stroke: ${props => darken(0.2, props.secondaryColor)};
    fill: ${props => props.secondaryColor};
  `};

  ${isNot('active')`
    stroke: ${props => darken(0.2, props.secondaryColor)};
    fill: ${props => props.secondaryColor};
  `};

  ${is('connected')`
    cursor: move;
  `};
`;

export const GraphShadowRect = styled.rect`
  fill: ${props => props.primaryColor && darken(0.1, props.primaryColor)};
  opacity: 0.1;
  rx: 4;
  ry: 4;

  ${is('consul')`
    fill: ${props =>
      props.secondaryColor && darken(0.1, props.secondaryColor)};
  `};
`;

export const GraphTitle = styled.text`
  font-size: 16px;
  font-weight: 600;
  fill: ${props => props.secondaryColor};

  ${is('consul')`
    fill: ${props => props.primaryColor};
  `};

  ${isNot('active')`
    fill: ${props => props.primaryColor};
  `};

  cursor: pointer;
`;

export const GraphSubtitle = styled.text`
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 600;
  fill: ${props => props.secondaryColor};

  ${is('consul')`
    fill: ${props => props.primaryColor};
  `};

  ${isNot('active')`
    fill: ${props => props.primaryColor};
  `};
`;

export const GraphText = styled.text`
  font-weight: normal;

  font-size: 12px;
  fill: ${props => props.secondaryColor};
  opacity: 0.8;
  transform: translateY(calc(17 * ${props => props.index}px));

  ${is('consul')`
    fill: ${props => props.primaryColor};
  `};

  ${isNot('active')`
    fill: ${props => props.primaryColor};
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
  fill: ${props => props.secondaryColor};

  ${is('consul')`
    fill: ${props => props.primaryColor};
  `};

  ${isNot('active')`
    fill: ${props => props.primaryColor};
  `};
`;

export const GraphHealthyCircle = styled.circle`
  fill: ${theme.green};
`;
