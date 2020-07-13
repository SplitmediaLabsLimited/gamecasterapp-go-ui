import styled from '@emotion/styled';
import { css as sx, variant } from '@go-ui/core';
import { Box } from '@theme-ui/components';
import * as P from 'polished';
import React from 'react';
import { variations } from './button';

const sizeVariants = variant({
  prop: 'size',
  variants: {
    xsmall: {
      p: 1,
      fontSize: P.rem(12),
      lineHeight: P.rem(14),
      '> svg': {
        width: P.em(12),
        height: P.em(12),
      },
    },
    small: {
      p: 1,
      '> svg': {
        width: '1em',
        height: '1em',
      },
    },
    medium: {
      p: 2,
      '> svg': {
        width: '1em',
        height: '1em',
      },
    },
    large: {
      p: 3,
      '> svg': {
        width: P.em(24),
        height: P.em(24),
      },
    },
  },
});

const StyledBox = styled(Box, { shouldForwardProp: (prop) => prop !== 'size' })(
  ({ color }) => variations(color),
  sizeVariants,
  ({ size }) =>
    !isNaN(size) &&
    sx({
      '> svg': {
        width: P.em(size),
        height: P.em(size),
      },
    })
);

export const IconButton = React.forwardRef(function IconButton(
  { ...props },
  ref
) {
  return (
    <StyledBox
      ref={ref}
      __themeKey="buttons"
      __css={{
        appearance: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'inherit',
        bg: 'transparent',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        outline: 'none',
      }}
      {...props}
    />
  );
});

IconButton.defaultProps = {
  variant: 'fill',
  color: 'base.500',
  size: 'medium',
  as: 'button',
};

export default IconButton;
