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

      white: '#fff',

      'gray-900': '#121214',
      'gray-800': '#202024',
      'gray-300': '#c4c4cc',
      'gray-100': '#e1e1e6',

      'green-500': '#00875f',
      'green-300': '#00b37e',
    }
  }
})