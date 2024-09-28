# Key differences between stiches and styled components


  
  **Stitches Course Explanation**
  
  Stitches is an alternative to styled-components, but it has an API, a way of writing its styling, a bit different. It's
  better for us to deal with visual components that have many styling variation based on properties.
  For example, let's imagine we havBe we have a button and this button can be of many different colors, sizes, icons, and
  so on.
  When we have those type of components, in styled components, we end up having a syntax where it's a little "different"
  so to say, and stitches comes up to deal with these problems.

  Stitches idea is that it works really well with next, with next SSR, and much more, we will dwelve deeper into this.

  Here for the styling, inside src we have a styles folBder and an index.ts

  in this index.ts we are going to import the function createStitches from react

  like
  
  export const config = createStitches({})

  inside the create stitches we are going to create a theme property where we are going to have many properties to it,
  just like we would do in tailwind, for example
  theme: {
    colors: {
      white: "#fff",
      "gray-900": "#121214"
      ...
    },
    fontSies: {
      md: "1.125rem",
      ...
    }
  }

  and that variable config will also return to us a set of configurations and we can export that in different ways: like

  export const {
    config,
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme
  } = createStiches({})

  Now, let's go the index.tsx. For us to create a styled component, we are going to
  do similar to the styled-components lib

  Create a Button constant, which is a styled 'button', and all the properties we
  want to it. e.g.

  const Button = styled('button', { /// coode })

  that styled needs to be the one we exported from the styles index.

  one thing to keep in mind is that the syntax is different from the styled-components,
  here we are passing the properties like a normal css, for instance:

  const Button = styled.button`
    background-color: #fff"
    ...
  `

  in stitches we are going to pass a js object, the syntax will be different, like a js syntax.

  const Button = styled('button', {
    backgroundColor: "#fff"
  })

  and stitches will also come integrated with ts, so a ctrl + space will bring us
  all the possible properties. And it will also already understand the properties
  we set on the theme, so it will also suggest the theme colors we've created, with
  $rocketseat, for example

  and call it as a simple component

  return (
    <Button>Send</Button>
  )

  and if we pass a property like borderRadius, instead of writing it as '8px',
  we simply write it as 8, except in cases like padding: '4px 8px'

  if we have a tag inside that component, such as a span, we would simply write
  span {
    *styling*
  }

  inside the component.

  








  **Stitches vs Styled ComponentsGPT Explanation:**
  
  Stiches generates atomic CSS and tries to pre-generate styles at build time whenever possible. This means it processes
  most of styles before our app is running, leaving less work to do during runtime

  Example:
    
    import { styled } from '@stitches/react';

    const Button = styled('button', {
      padding: '12px 24px',
      backgroundColor: 'blue',
      color: 'white',
      borderRadius: '4px',
      border: 'none',
      '&:hover': {
        backgroundColor: 'darkblue',
      },
    });

    function App() {
      return <Button>Click Me</Button>;
    }

  ### How It Works:

  1. At build time (before the app runs in the browser), Stitches processes the styles and breaks them down into smaller,
  reusable CSS classes (this is called atomic CSS).

  1. It pre-generates these small, atomic classes, so when the app runs, the browser just needs to reuse these pre-generated
  classes.

  Stitches will reuse the same classes for common styles like padding, backgroundColor, etc., instead of generating them
  multiple times.

  Stitches (Build Time Optimization)
  Stitches, on the other hand, uses atomic CSS and tries to pre-generate styles at build time whenever possible. This means
  it processes most of the styles before your app is running, leaving less work to do during runtime.


  **Styled-Components: **

  Styled Components generates styles at runtime, meaning when your app runs, the styles are dynamically processed and
  injected into the DOM. This approach works well for flexibility but can impact performance as your application grows.

  Example: 

  import styled from 'styled-components';

  const Button = styled.button`
    padding: 12px 24px;
    background-color: blue;
    color: white;
    border-radius: 4px;
    border: none;
    &:hover {
      background-color: darkblue;
    }
  `;

  function App() {
    return <Button>Click Me</Button>;
  }

  How it works:

    1. At runtime (when the app is running in the browser), Styled Components creates a CSS class based on the styles
   defined in the template literal.
   
    2. It injects the generated class and styles into the DOM.
   
    3. Each new component (even if it shares the same styles) will generate new styles at runtime.
   
As your app gets bigger, more components and styles are generated at runtime, which can lead to a slight performance
decrease, especially on slower devices or large apps. Each component's style is processed every time the app renders,
adding overhead.



