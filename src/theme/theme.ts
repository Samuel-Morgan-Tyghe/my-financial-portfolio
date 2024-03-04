import { extendTheme } from '@chakra-ui/react'

// Example color scheme approximation
const colors = {
  brand: {
    50: '#f2e5d5', // A light beige, good for backgrounds
    100: '#e2cbb1', // Lighter brown, suitable for lighter elements
    200: '#d2b18d', // Soft brown, great for hover states
    300: '#c29669', // Medium brown, for less emphasized text
    400: '#b37b45', // Deeper brown, good for important text
    500: '#a36021', // Rich brown, excellent for accents and CTAs
    600: '#824c1a', // Darker brown, for serious or impactful elements
    700: '#613813', // Deeper shade, for critical interactive elements
    800: '#41240c', // Almost black, for text or critical UI components
    900: '#210a06', // Near black, great for text or borders
  },
}

// Placeholder for the font family, replace with your choice
const fonts = {
  heading: '"Avenir Next", sans-serif',
  body: '"Roboto", sans-serif',
}

// Extend the theme to include custom colors, fonts, etc.
const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        overflow: 'hidden',
      },
      color: 'brand.900',
    },
  },
  colors,
  fonts,
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold', // Example of customizing a component
      },
      variants: {
        primary: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        secondary: {
          bg: 'brand.100',
          color: 'brand.500',
          _hover: {
            bg: 'brand.200',
          },
        },
      },
    },
    // Add other component customizations here
  },
})

export default theme
