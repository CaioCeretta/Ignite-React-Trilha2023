import styled from "styled-components";

export const HomeContainer = styled.main`
  
  align-items: center;
  justify-content: center;

`

export const HeroContainer = styled.section`

  padding: 2rem 10rem;
  display: flex;
  justify-content: space-between;

`


export const HeroContent = styled.div`
  
`

export const Heading = styled.div`
padding-right: 2rem;
  h1 {
    line-height: 2.5rem;
    font-weight: bold;
    font-size: 3rem;
  }

  p {
    margin-top: 20px;
    font-size: 1.5rem;
  }

`




export const Specialties = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`
const Specialty = styled.div`
  
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 12px
    
  
`



export const Info = styled(Specialty)`
svg {
  border-radius: 100px;
  background-color: #C4A484;
  color: white;
  padding: 4px;
}
`

export const Delivery = styled(Specialty)`
  svg {
  border-radius: 100px;
  background-color: #FDB725;
  color: white;
  padding: 4px;
}
`

export const Packaging = styled(Specialty)`
svg {
  border-radius: 100px;
  background-color: #C4A484;
  color: white;
  padding: 4px;
}
`

export const Receive = styled(Specialty)`
svg {
  border-radius: 100px;
  background-color: ${props => props.theme['purple-medium']};
  color: white;
  padding: 4px;
}
`

export const HeroImage = styled.img`
`