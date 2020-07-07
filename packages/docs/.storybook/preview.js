import { ThemeProvider } from '@theme-ui/core';
import Theme from '@go-ui/theme';
import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';

addDecorator((storyFn) => (
  <ThemeProvider theme={Theme}>{storyFn()}</ThemeProvider>
));

addParameters({
  options: {
    showRoots: true,
  },
});

addParameters({
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
