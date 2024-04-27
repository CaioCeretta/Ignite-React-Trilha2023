export const defaultTheme = {
  white: '#fff',

  'gray-100': '#E1E1E6',
  'gray-300': '#C4C4CC',
  'gray-400': '#8D8D99',
  'gray-500': '#7C7C8A',
  'gray-600': '#323238',
  'gray-700': '#29292E',
  'gray-800': '#202024',
  'gray-900': '#121214',

  'green-300': '#00B37E',
  'green-500': '#00875F',
  'green-700': '#015F43',

  'red-300': '#F75A68',
  'red-500': '#AB222E',
  'red-700': '#7A1921',
} as const
/* 
  The importance of the as const at the end of the object, is because if we don't declare it, we can see that
  
  when we call the the ${props => props.theme['']} it will understand the properties that i have, but if we look on the
  property type, we are going to see that, for example, 'green-500' is a string, even though the content of the green-500
  is, in fact, a string, but when we utilize that as const, the typing of the same 'green-500', will now be the hexadecimal
  value, and when we are creating the layout, we will know what color it represents inside our theme.

  Another benefit of it, is that it is going to tell the compiler that the object properties should be considered readonly
  and prevent accidental modification of its values. Without it, every property wll be typed as string and we could inadvertently
  assign a diferent value type to a property or modify its value later in the code, which might lead to unexpected behavior
*/