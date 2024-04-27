import styled from "styled-components";

export const HeaderContainer = styled.div`
  background: ${props => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
  
  display: flex;
  justify-content: space-between;
  align-items: center;

`

export const ButtonTransaction = styled.button`
  background: ${props => props.theme['green-500']};
  color: ${props => props.theme['white']};

  font-weight: bold;

  height: 50px;
  border: 0;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  /* transition: background-color 0.2s; */

  &:hover {
    background: ${props => props.theme['green-700']};
    transition: background-color 0.2s;
    /*
    * if i use the transition inside the hover, the transition effect will only happen on the mouse in, not on the mouse
    out, if i set the transition outside of the hover, it will happen in both times
     */ 
  }
`