import { darken, rem, transparentize } from 'polished';
import { fromPairs } from 'lodash/fp';

const heading = {
  color: 'text',
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading',
};

const paletteColors = {
  primary: {
    100: '#D8ADFD',
    200: '#BB6FFC',
    300: '#9E32FB',
    400: '#8E2DE1',
  },
  base: {
    100: '#FCFCFC',
    200: '#DFE7EF',
    300: '#B8C5D3',
    400: '#748AA1',
    500: '#818791',
    600: '#3A414A',
    700: '#292E33',
    800: '#1F2327',
    900: '#16191C',
  },
  system: {
    success: '#26A575',
    warning: '#BF9442',
    danger: '#E83C3A',
    info: '#3DA7D3',
  },
};

const focusTransition = {
  transitionDuration: '.15s',
  transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
  transitionProperty:
    'background-color,border-color,color,fill,stroke,opacity,box-shadow,transform',
};

let buttons = fromPairs(
  [
    [
      'fill',
      {
        '&[disabled], &[disabled]:hover': {
          cursor: 'not-allowed',
          backgroundColor: 'base.600',
          color: 'base.500',
        },
      },
    ],
    [
      'outline',
      {
        border: '1px solid',
        bg: 'transparent',
        '&[disabled]': {
          bg: 'transparent',
          color: 'base.600',
          borderColor: 'base.600',
          cursor: 'not-allowed',
        },
        '&[disabled]:hover': {
          color: 'base.600',
          borderColor: 'base.600',
        },
      },
    ],
    [
      'ghost',
      {
        bg: 'transparent',
        textTransform: 'uppercase',
        fontWeight: 'bold',

        '&[disabled]': {
          color: 'base.600',
          bg: 'transparent',
        },
      },
    ],
    [
      'fillCircle',
      {
        borderRadius: 9999,
        '&[disabled]': {
          cursor: 'not-allowed',
          backgroundColor: 'base.600',
          color: 'base.500',
        },
      },
    ],
    [
      'ghostCircle',
      {
        bg: 'transparent',
        borderRadius: 9999,
        textTransform: 'uppercase',
        fontWeight: 'bold',

        '&[disabled]': {
          color: 'base.600',
          bg: 'transparent',
        },
      },
    ],
  ].map(([key, val]) => [
    key,
    {
      display: 'flex',
      lineHeight: 1,
      alignItems: 'center',
      ...focusTransition,
      ...val,
    },
  ])
);

// add common styles to all button variants

export const base = {
  space: [
    0,
    rem(4),
    rem(8),
    rem(16),
    rem(32),
    rem(64),
    rem(128),
    rem(256),
    rem(512),
  ],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [
    rem(12),
    rem(14),
    rem(16),
    rem(18),
    rem(20),
    rem(26),
    rem(48),
    rem(64),
    rem(96),
  ],
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    headings: [44 / 26, 35 / 20, 27 / 18],
    caption: ['1.25rem', '1.875rem'],
    content: ['1.375rem', '1.625rem'],
    paragraph: 1.5,
  },
  colors: {
    text: paletteColors.base[100],
    background: paletteColors.base[800],
    accent: paletteColors.primary[300],
    primary: paletteColors.primary[300],
    secondary: paletteColors.base[300],
    gray: paletteColors.base[500],
    rating: '#f7bf06',
    highlight: paletteColors.base[600],
    control: darken(0.05, paletteColors.base[600]),
    muted: darken(0.05, paletteColors.base[600]),
    white: '#FCFCFC',
    label: '#FCFCFC',
    volume: '#25a776',
    founder: '#F3C414',
    ...paletteColors,
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    body: {
      bg: 'base.800',
      color: 'text',
      lineHeight: 'body',
    },
    h1: {
      fontWeight: 'heading',
      fontSize: 5,
      lineHeight: 'headings.0',
    },
    h2: {
      fontWeight: 'heading',
      fontSize: 4,
      lineHeight: 'headings.1',
    },
    h3: {
      fontWeight: 'heading',
      fontSize: 3,
      lineHeight: 'headings.2',
    },
    h4: {
      ...heading,
      fontSize: 2,
    },
    h5: {
      ...heading,
      fontSize: 1,
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
    p: {
      fontWeight: 'body',
      lineHeight: 'paragraph',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      fontSize: 1,
    },
    a: {
      color: 'base.500',
      textTransform: 'uppercase',
      textDecoration: 'none',
      fontWeight: 'heading',

      ...focusTransition,
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    img: {
      maxWidth: '100%',
    },
    spinner: {
      color: 'base.300',
    },
  },
  text: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'headings.2',
    },
    p: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      fontSize: 1, // remove when theme.styles are set in global-styles.js
    },
  },
  images: {
    avatar: {
      borderRadius: 99999,
    },
  },
  buttons,
  links: {
    styles: {
      a: {
        color: 'base.500',
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontWeight: 'heading',

        '&:hover, &:focus': {
          color: 'primary.100',
        },
        ...focusTransition,
      },
    },
  },
  forms: {
    label: {
      fontSize: 2,
    },
    input: {
      lineHeight: 1,
      bg: 'base.600',
      color: 'base.200',
      outline: 'none',
      border: 'unset',
      borderRadius: '0.25rem',
      '&::placeholder': {
        color: 'base.500',
      },

      ...focusTransition,

      '&:focus': {
        boxShadow: (t) => '0 0 0 2px ' + t.colors.primary[400],
        zIndex: 1,
      },

      disabled: {
        color: (t) => darken(0.25, t.colors.base[500]),
        bg: 'base.900',

        '&::placeholder': {
          color: (t) => darken(0.25, t.colors.base[500]),
        },
      },

      invalid: {
        bg: (t) => transparentize(0.9, t.colors.system.danger),
        boxShadow: (t) => '0 0 0 2px ' + t.colors.system.danger,
      },

      success: {
        bg: (t) => transparentize(0.9, t.colors.system.success),
        boxShadow: (t) => '0 0 0 2px ' + t.colors.system.success,
      },
    },
    dashedInput: {
      lineHeight: 1,
      color: 'base.200',
      borderRadius: 0,
      border: 'unset',
      borderBottom: '1px dashed',
      borderColor: 'base.600',
      outline: 'none',

      ...focusTransition,

      '&:focus': {
        borderColor: 'transparent',
        borderRadius: 4,
        boxShadow: (t) => '0 0 0 2px ' + t.colors.primary[400],
      },
    },
    select: {
      borderRadius: '0.25rem',
      bg: 'base.600',
      color: 'base.200',
      outline: 'none',
      border: 'unset',

      ...focusTransition,

      '&::placeholder': {
        color: 'base.500',
      },

      '&:focus': {
        boxShadow: (t) => '0 0 0 2px ' + t.colors.primary[400],
        zIndex: 1,
      },

      disabled: {
        color: (t) => darken(0.25, t.colors.base[500]),
        bg: 'base.900',

        '&::placeholder': {
          color: (t) => darken(0.25, t.colors.base[500]),
        },
      },

      invalid: {
        bg: (t) => transparentize(0.9, t.colors.system.danger),
        boxShadow: (t) => '0 0 0 2px ' + t.colors.system.danger,
      },

      success: {
        bg: (t) => transparentize(0.9, t.colors.system.success),
        boxShadow: (t) => '0 0 0 2px ' + t.colors.system.success,
      },
    },
    textarea: {
      bg: 'base.600',
      color: 'base.200',
      outline: 'none',
      border: 'unset',

      ...focusTransition,

      '&::placeholder': {
        color: 'base.500',
      },

      '&:focus': {
        boxShadow: (t) => '0 0 0 2px ' + t.colors.primary[400],
        zIndex: 1,
      },

      disabled: {
        color: (t) => darken(0.25, t.colors.base[500]),
        bg: 'base.900',

        '&::placeholder': {
          color: (t) => darken(0.25, t.colors.base[500]),
        },
      },

      invalid: {
        bg: (t) => transparentize(0.9, t.colors.system.danger),
        boxShadow: (t) => '0 0 0 2px ' + t.colors.system.danger,
      },

      success: {
        bg: (t) => transparentize(0.9, t.colors.system.success),
        boxShadow: (t) => '0 0 0 2px ' + t.colors.system.success,
      },
    },

    slider: {
      track: {
        bg: 'base.500',
      },
      trackHighlight: {
        bg: 'primary.300',
      },

      handle: {
        boxShadow: (t) => '0 0 2px 0 ' + t.colors.base[900],
        '&:focus': {
          boxShadow: (t) => `0 0 0 3px  ${t.colors.primary[300]},
            0 0 5px 3px ${t.colors.base[900]}
          `,
          outline: 'none',
        },
      },
    },
  },
};

export default base;
