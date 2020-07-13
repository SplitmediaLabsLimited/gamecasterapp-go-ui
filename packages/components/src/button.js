import { compose as o } from 'lodash/fp';
import React from 'react';
import { Box } from '@theme-ui/components';
import styled from '@emotion/styled';

import { boxSizes, variant } from '@go-ui/core';

import {
  applyAlpha,
  getColor,
  highlightColor,
  readableThemeColor,
} from '@go-ui/color';

export const variations = (color) => {
  const styles = {
    fill: {
      bg: color,
      color: readableThemeColor(color, 'base.900', 'white'),
      '&:hover': {
        bg: highlightColor(0.2, color),
        color: (t) =>
          readableThemeColor(
            highlightColor(0.2, color)(t),
            'base.900',
            'white'
          ),
      },
      '&:focus': {
        boxShadow: (t) =>
          '0 0 0 3px ' +
          o(
            applyAlpha(0.45),
            getColor(
              color.startsWith('base') || color.startsWith('muted')
                ? 'base.400'
                : color
            )
          )(t),
      },
    },
    outline: {
      color: color,
      borderColor: color,
      '&:hover': {
        borderColor: highlightColor(
          0.2,
          color.startsWith('base') ? 'accent' : color
        ),
        color: highlightColor(0.2, color.startsWith('base') ? 'accent' : color),
      },
      '&:focus': {
        boxShadow: (t) =>
          '0 0 0 3px ' +
          o(
            applyAlpha(0.45),
            getColor(color.startsWith('base') ? 'accent' : color)
          )(t),
        ...(color.startsWith('base') && { borderColor: 'accent' }),
      },
    },
    ghost: {
      color: color,
      '&:hover, &:focus': {
        bg: o(applyAlpha(0.45), getColor(color)),
      },
    },
  };

  return variant({
    variants: {
      ...styles,
      fillCircle: styles.fill,
      text: styles.transparent,
      rounded: styles.transparent,
    },
  });
};

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'size',
})(({ color }) => variations(color), boxSizes);

export const Button = React.forwardRef(function Button(props, ref) {
  return (
    <StyledBox
      ref={ref}
      as="button"
      __themeKey="buttons"
      __css={{
        appearance: 'none',
        display: 'inline-flex',
        textAlign: 'center',
        lineHeight: 'inherit',
        textDecoration: 'none',
        fontSize: 'inherit',
        px: 3,
        py: 2,
        color: 'white',
        bg: 'base.500',
        border: 0,
        borderRadius: 4,
        cursor: 'pointer',
        outline: 'none',

        '& > svg': {
          width: '1em',
          height: '1em',
        },
      }}
      {...props}
    />
  );
});

Button.defaultProps = {
  variant: 'fill',
  color: 'base.500',
};

export default Button;
