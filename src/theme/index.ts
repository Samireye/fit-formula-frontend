import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
      },
    }),
  },
  components: {
    Container: {
      baseStyle: {
        maxW: ['100%', '100%', '80%', '1200px'],
        px: [4, 6, 8],
      },
    },
    FormControl: {
      baseStyle: {
        marginBottom: 4,
      },
    },
    Input: {
      baseStyle: {
        field: {
          width: 'full',
        },
      },
    },
  },
  colors: {
    brand: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      200: '#81E6D9',
      300: '#4FD1C5',
      400: '#38B2AC',
      500: '#319795',
      600: '#2C7A7B',
      700: '#285E61',
      800: '#234E52',
      900: '#1D4044',
    },
  },
})

export default theme
