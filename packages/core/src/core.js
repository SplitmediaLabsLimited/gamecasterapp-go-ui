import { createParser } from '@styled-system/core';
import * as P from 'polished';

export { css, get } from '@theme-ui/css';
export { ThemeProvider } from '@theme-ui/theme-provider';
export { jsx, merge, useThemeUI } from '@theme-ui/core';

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

/*#__PURE__*/
export const boxSizes = variant({
  prop: 'size',
  variants: {
    xsmall: { p: 1, fontSize: 0, lineHeight: P.em(16) },
    small: { px: 2, py: 1 },
    large: { px: 4, py: 3 },
  },
});

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
