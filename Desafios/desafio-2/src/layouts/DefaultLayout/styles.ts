import styled from "styled-components";

export const LayoutContainer = styled.div`

  max-width: 100rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;

  background: ${props => props.theme['yellow-light']};
  border-radius: 8px;


`