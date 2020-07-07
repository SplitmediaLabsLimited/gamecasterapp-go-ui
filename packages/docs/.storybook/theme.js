import Theme from '@go-ui/theme';
import { create } from '@storybook/theming/create';

import logoSvg from '../static/logo.svg';

export const theme = create({
  base: 'dark',
  colorPrimary: Theme.colors.primary[400],
  colorSecondary: Theme.colors.base[400],

  // UI
  appBg: Theme.colors.base[800],
  appContentBg: Theme.colors.base[700],
  appBorderColor: Theme.colors.base[600],
  appBorderRadius: 4,

  // Typography
  fontBase:
    '"Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontCode: 'monospace',

  // Text colors
  textColor: Theme.colors.white,
  textInverseColor: Theme.colors.base[800],

  // Toolbar default and active colors
  barTextColor: Theme.colors.base[300],
  barSelectedColor: Theme.colors.primary[100],
  barBg: Theme.colors.base[600],

  // Form colors
  inputBg: Theme.colors.base[600],
  inputBorder: Theme.colors.base[600],
  inputTextColor: Theme.colors.white,
  inputBorderRadius: 4,

  brandTitle: 'XGC Frontend Storybook',
  brandUrl: 'https://xapps-designdoc.now.sh',
  brandImage: logoSvg,
});
