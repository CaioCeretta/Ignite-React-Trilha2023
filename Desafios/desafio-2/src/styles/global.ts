import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props => props.theme['base-input'])};
  }

  body {
    background-color: ${props => props.theme['background']};

  }

  body, input, textarea, button {
    font-family: 'Baloo 2';
    font-weight: 400;
    font-size: 1rem;

  }





`