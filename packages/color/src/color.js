import * as P from 'polished';
import { get } from '@go-ui/core';
export * from '@theme-ui/color';

export const getColor = (theme, color) =>
  get(theme, `colors.${color}`, color)
    .replace(/^var\(--(\w+)(.*?), /, '')
    .replace(/\)/, '');

export const applyAlpha = (alpha) => (color) => P.rgba(color, alpha);

export const palette = (color) => (props) =>
  getColor(props.theme ?? props, color);

export const readableThemeColor = (color, lightColor, darkColor) => {
  return (props) => {
    try {
      return P.getLuminance(getColor(props, color)) > 0.4
        ? getColor(props, lightColor)
        : getColor(props, darkColor);
    } catch {
      return getColor(props, darkColor);
    }
  };
};

export const highlightColor = (range, color) => (props) => {
  const fn =
    P.getLuminance(getColor(props, color)) > 0.4 ? P.darken : P.lighten;
  return fn(range)(getColor(props, color));
};
