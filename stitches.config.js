import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      yellow: '#ffff80',
      pink: '#ff80bf',
      purple: '#9580ff',
      red: '#ff9580',
      orange: '#ffca80',
      green: '#8aff80',
      cyan: '#80ffea',
      primary: '#f2f2f2',
      secondary: '#8f9ba8',
      background: '#08070b',
      hover: '#212024',
      command: 'rgba(255, 255, 255, 0.05)',
    },
    fonts: {
      body: 'var(--font-jetbrains-mono), monospace',
      code: 'var(--font-jetbrains-mono), monospace',
      heading: 'var(--font-jetbrains-mono), monospace',
    },
    space: {
      navHeightDesktop: '60px',
      navHeightMobile: '110px',
    },
    transitions: {
      duration: '0.2s',
    },
    radii: {
      borderRadius: '8px',
    },
  },
  media: {
    bp1: '(min-width: 425px)',
    bp2: '(min-width: 760px)',
    bp3: '(max-width: 780px)',
    bp4: '(max-width: 1024px)',
  },
});

const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'JetBrains Mono',
      src: 'url("/static/fonts/JetBrainsMono-Medium.ttf") format("truetype")',
      fontWeight: 500,
      fontStyle: 'normal',
      fontDisplay: 'swap',
    },
    {
      fontFamily: 'JetBrains Mono',
      src: 'url("/static/fonts/JetBrainsMono-MediumItalic.ttf") format("truetype")',
      fontWeight: 500,
      fontStyle: 'italic',
      fontDisplay: 'swap',
    },
  ],
  '*': {
    fontFamily: '$body',
  },
  'html, body': {
    margin: 0,
    padding: 0,
    WebkitFontSmoothing: 'antialiased',
    background: '$background',
  },
  kbd: {
    color: '$background',
    background: '$secondary',
    padding: '1px 5px',
    borderRadius: '4px',
    transition: 'background $duration ease-in-out',
    fontFamily: '$code',
    fontSize: '14px',
  },
  svg: {
    width: '32px',
    height: '32px',
    fill: 'white',
  },
  figure: { margin: 0 },
  twitterwidget: { margin: '0 auto' },
 
  code: {
    background: '#151417',
    borderRadius: '$borderRadius',
    color: '$primary',
    fontFamily: '$code',
    fontSize: '15px',
  },
  ':not(pre) > code': { padding: 4 },

  h1: {
    fontFamily: '$heading',
    fontSize: 48,
    lineHeight: '50px',
    margin: '0 0 20px',
    color: '$primary',
  },
  h2: {
    color: '$primary',
    margin: '60px 0 0',
    fontSize: 24,
  },
  'h3, h3 a': {
    color: '$primary',
    fontSize: 18,
    margin: '20px 0 0',
  },

  ul: { margin: 0 },
  img: {
    borderRadius: '8px',
    minWidth: '100%',
    maxWidth: '100%',
  },
  p: {
    margin: '20px 0',
    color: '$secondary',
  },
  strong: {
    color: '$primary',
    fontWeight: 500,
  },
  blockquote: {
    borderLeft: '4px solid $hover',
    color: '$secondary',
    fontStyle: 'italic',
    margin: 0,
    paddingLeft: 20,
  },
  a: {
    borderBottom: '.5px solid $secondary',
    color: '$primary',
    textDecoration: 'none',
    transition: 'opacity $duration ease-in-out',
  },
  'a:hover, a:focus': { opacity: 0.8 },
});

globalStyles();