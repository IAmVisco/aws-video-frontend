import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

export const theme = extendTheme({
  config,
  semanticTokens: {
    colors: {
      'chakra-body-bg': {
        _light: 'gray.100',
      },
    },
  },
});
