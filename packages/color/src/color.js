import * as P from 'polished';
import { get } from '@go-ui/core';

const g = (t, c) =>
  get(t, `colors.${c}`, c)
    .replace(/^var\(--(\w+)(.*?), /, '')
    .replace(/\)/, '');

export const darken = (c, n) => (t) => P.darken(n, g(t.theme ?? t, c));
export const lighten = (c, n) => (t) => P.lighten(n, g(t.theme ?? t, c));
export const rotate = (c, d) => (t) => P.adjustHue(d, g(t.theme ?? t, c));

export const hue = (c, h) => (t) => P.setHue(h, g(t.theme ?? t, c));
export const saturation = (c, s) => (t) =>
  P.setSaturation(s, g(t.theme ?? t, c));
export const lightness = (c, l) => (t) => P.setLightness(l, g(t.theme ?? t, c));

export const desaturate = (c, n) => (t) => P.desaturate(n, g(t.theme ?? t, c));
export const saturate = (c, n) => (t) => P.saturate(n, g(t.theme ?? t, c));

export const shade = (c, n) => (t) => P.shade(n, g(t.theme ?? t, c));
export const tint = (c, n) => (t) => P.tint(n, g(t.theme ?? t, c));

export const transparentize = (c, n) => (t) =>
  P.transparentize(n, g(t.theme ?? t, c));
export const alpha = (c, n) => (t) => P.rgba(g(t.theme ?? t, c), n);

export const mix = (a, b, n = 0.5) => (t) =>
  P.mix(n, g(t.theme ?? t, a), g(t.theme ?? t, b));

export const complement = (c) => (t) => P.complement(g(t.theme ?? t, c));
export const invert = (c) => (t) => P.invert(g(t.theme ?? t, c));

export const grayscale = (c, n) => desaturate(c, 1);

export const applyAlpha = (alpha) => (color) => P.rgba(color, alpha);

export const getColor = (color) => (theme) => g(theme, color);

export const palette = (color) => (props) =>
  getColor(color)(props.theme ?? props);

export const readableThemeColor = (color, lightColor, darkColor) => {
  return (props) => {
    try {
      return P.getLuminance(g(props, color)) > 0.4
        ? g(props, lightColor)
        : g(props, darkColor);
    } catch {
      return g(props, darkColor);
    }
  };
};

export const highlightColor = (range, color) => (props) => {
  const fn = P.getLuminance(g(props, color)) > 0.4 ? P.darken : P.lighten;
  return fn(range)(g(props, color));
};
