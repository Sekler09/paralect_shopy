import { createTheme } from '@mantine/core';

import * as components from './components';

const mainTheme = createTheme({
  fontFamily: 'Inter, sans-serif',
  fontFamilyMonospace: 'monospace',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
  },
  lineHeights: {
    md: '1.45',
  },
  primaryColor: 'blue',
  primaryShade: 6,
  black: '#201F22',
  colors: {
    black: [
      '#201F22',
      '#201F22',
      '#201F22',
      '#201F22',
      '#201F22',
      '#201F22',
      '#201F22',
      '#201F22',
      '#201F22',
      '#201F22',
      '#201F22',
    ],
  },
  components,
});

export default mainTheme;
