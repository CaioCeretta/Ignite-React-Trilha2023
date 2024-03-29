import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${(props) => props.theme['gray-100']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      /*       

      the reason for it to be transparent and not just on the hover, is because, is because if i do it just like that,
      on the hover it would push the icon a little to the top, because it is adding a new border onto it that did not
      exist, so the border transparent, the element will already have the border, and just replace the color

      Even though the only border that will change the color, is the bottom one, i also added the top as transparent
      because we want the icon to be completely centralized into its box. Because on we have three pixels of border
      below it, the icon is 3px up from the center, so the border-top will fix it

      */
      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-300']};
      }

      &.active {
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
`
