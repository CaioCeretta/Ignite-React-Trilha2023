import { globalCss } from ".";

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0, 
  },

  body: {
    backgroundColor: "$gray-900",
    color: "$gray-100",
    '-webkit-font-smoothing': 'antialiased'    
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  }
})