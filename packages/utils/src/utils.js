import * as React from 'react';
import * as P from 'polished';
import hoistNonReactStatic from 'hoist-non-react-statics';

import shouldForwardProp from '@styled-system/should-forward-prop';
import { omit } from 'lodash/fp';

import { createParser } from '@styled-system/core';
import { css, get } from '@theme-ui/css';

export const variant = ({ scale, prop = 'variant', variants = {}, key }) => {
  let sx;
  if (Object.keys(variants).length) {
    sx = (value, scale, props) => css(get(scale, value, null))(props.theme);
  } else {
    sx = (value, scale) => get(scale, value, null);
  }
  sx.scale = scale || key;
  sx.defaults = variants;
  const config = {
    [prop]: sx,
  };
  return createParser(config);
};

export function cleanProps(WrappedComponent) {
  const Enhanced = React.forwardRef((props, ref) =>
    React.createElement(
      WrappedComponent,
      omit(
        Object.keys(props).filter((key) => !shouldForwardProp(key)),
        { ...props, ref }
      )
    )
  );

  Enhanced.displayName = `FilteredProps`;

  hoistNonReactStatic(Enhanced, WrappedComponent);
  return Enhanced;
}

/*#__PURE__*/
export const boxSizes = variant({
  prop: 'size',
  variants: {
    xsmall: { p: 1, fontSize: 0, lineHeight: P.em(16) },
    small: { px: 2, py: 1 },
    large: { px: 4, py: 3 },
  },
});

export const applyAlpha = (alpha) => (color) => P.rgba(color, alpha);

const g = (t, c) =>
  get(t, `colors.${c}`, c)
    .replace(/^var\(--(\w+)(.*?), /, '')
    .replace(/\)/, '');

export const getColor = (color) => (theme) => g(theme, color);

export const readableThemeColor = (color, lightColor, darkColor) => {
  return (props) =>
    P.getLuminance(g(props, color)) > 0.4
      ? g(props, lightColor)
      : g(props, darkColor);
};

export const highlightColor = (range, color) => (props) => {
  const fn = P.getLuminance(g(props, color)) > 0.4 ? P.darken : P.lighten;
  return fn(range)(g(props, color));
};

export const highlightColor2 = (range, color) => (props) => {
  const fn = P.getLuminance(g(props, color)) > 0.4 ? P.desaturate : P.saturate;
  return fn(range)(g(props, color));
};

export const getProps = (test) => (props) => {
  const next = {};
  for (const key in props) {
    if (test(key || '')) next[key] = props[key];
  }
  return next;
};

export const switchProp = (name, values = {}, defaultValue) => (props) => {
  if (props[name] && values[props[name]]) {
    return css(values[props[name]]);
  } else {
    return css(defaultValue);
  }
};

const MRE = /^m[trblxy]?$/;

export const getMargin = getProps((k) => MRE.test(k));
export const omitMargin = getProps((k) => !MRE.test(k));
