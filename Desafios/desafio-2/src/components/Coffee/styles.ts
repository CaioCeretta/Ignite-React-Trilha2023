import styled from "styled-components";

export const CoffeeCard = styled.div`

  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme['base-card']};

  
  p {
    color: ${props => props.theme['base-text']}
  }

`

export const CoffeImg = styled.div`
    width: 60px;
    bottom: 10px;
    border-radius: 999px;
    position: relative;

    > img {
    
    border-radius: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

`

export const Types = styled.div`
  display: flex;
  gap: 10px;


  > span {
    border-radius: 999px;
    background-color: ${props => props.theme['yellow-light']};
    color: ${props => props.theme['yellow-dark']};
    font-weight: bold;
    padding: 3px;
    font-size: 12px;
  }

`