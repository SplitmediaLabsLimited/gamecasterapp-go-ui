import React from 'react';
import { keyframes } from '@emotion/core';
import { Box } from '@theme-ui/components';
import styled from '@emotion/styled';

const DURATION = 2;

const spin = keyframes({
  '100%': { transform: 'rotate(360deg)' },
});

const dash = keyframes({
  '0%': { strokeDasharray: '1, 150', strokeDashoffset: '0' },
  '50%': { strokeDasharray: '90, 150', strokeDashoffset: '-35' },
  '100%': { strokeDasharray: '90, 150', strokeDashoffset: '-124' },
});

const SpinningSVG = styled(Box)(
  {
    animationName: spin,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
  (props) => ({ animationDuration: props.duration + 's' })
);

SpinningSVG.defaultProps = {
  as: 'svg',
};

const DashCircle = styled(Box)(
  {
    animationName: dash,

    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  (props) => ({
    animationDuration: Math.max(props.duration - 0.5, 0.5) + 's',
  })
);

DashCircle.defaultProps = {
  as: 'circle',
};

export const Spinner = React.forwardRef(
  (
    {
      size = 65,
      strokeWidth = 4,
      title = 'Loading...',
      duration = DURATION,
      ...props
    },
    ref
  ) => {
    return (
      <SpinningSVG
        ref={ref}
        viewBox="0 0 50 50"
        width={size}
        height={size}
        fill="none"
        stroke="currentcolor"
        role="img"
        {...props}
        __css={{
          color: 'accent',
          overflow: 'visible',
        }}
        duration={duration}>
        <title>{title}</title>

        <DashCircle
          cx="25"
          cy="25"
          r="20"
          __css={{
            transformOrigin: 'center',
          }}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          duration={duration}
        />
      </SpinningSVG>
    );
  }
);
