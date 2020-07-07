import React from 'react';
import { jsx } from '@theme-ui/core';
import { css as sx } from '@theme-ui/css';
import Theme from '@go-ui/theme';
import { addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider } from '@theme-ui/core';
import { theme } from './theme';
import { Global, css } from '@emotion/core';

import 'modern-normalize';

addDecorator((storyFn) => (
  <ThemeProvider theme={Theme}>
    <Global
      styles={sx({
        fontFamily: 'body',
        lineHeight: 'body',
        fontWeight: 'body',
        variant: 'styles',
      })}
    />
    {storyFn()}
  </ThemeProvider>
));

addParameters({
  options: {
    showRoots: true,
    theme: theme,
  },
  viewport: {
    viewports: {
      small: {
        name: 'Small (40em)',
        styles: {
          width: 40 * 16 + 'px',
          height: '100%',
        },
      },
      medium: {
        name: 'Medium (56em)',
        styles: {
          width: 56 * 16 + 'px',
          height: '100%',
        },
      },
      large: {
        name: 'Large (64em)',
        styles: {
          width: 64 * 16 + 'px',
          height: '100%',
        },
      },
      responsive: {
        name: 'Responsive',
        styles: {
          width: '100%',
          height: '100%',
        },
      },
    },
    defaultViewport: 'Small Mobile',
  },
});
