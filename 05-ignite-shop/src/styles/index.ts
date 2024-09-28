import { createStitches } from "@stitches/react";

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme
}  = createStitches({
  theme: {
    colors: {
      rocketseat: '#8257e6',

      white: '#fff',

      'gray-900': '#121214',
      'gray-800': '#202024',
      'gray-300': '#c4c4cc',
      'gray-100': '#e1e1e6',

      'green-500': '#00875f',
      'green-300': '#00b37e',
    },

    fontSizes: {
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem'
    }
  }
})