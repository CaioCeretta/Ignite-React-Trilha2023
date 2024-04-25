import { Coffee } from "../Coffee";
import { CoffeeListContainer } from "./styles";
import coffe1 from '../../assets/Coffee1.png'
import coffe2 from '../../assets/Coffee2.png'
import coffe3 from '../../assets/Coffee3.png'
import coffe4 from '../../assets/Coffee4.png'

export function CoffeeList() {

  return (
    <>
    <h1>Nossos cafés</h1>
  <CoffeeListContainer>
    
    <Coffee imgUrl={coffe1}
      description="coffee" name="Expresso Tradicional" price={10} types={['espresso', 'bliblibli']}/>
    <Coffee imgUrl={coffe2}
      description="coffee" name="Expresso Americano" price={10} types={['espresso', 'bliblibli']}/>
    <Coffee imgUrl={coffe3}
      description="coffee" name="Expresso Tradicional" price={10} types={['espresso', 'bliblibli']}/>
    <Coffee imgUrl={coffe4}
      description="coffee" name="Expresso Tradicional" price={10} types={['espresso', 'bliblibli']}/>
        <Coffee imgUrl={coffe1}
          description="coffee" name="Expresso Tradicional" price={10} types={['espresso', 'bliblibli']} />
        <Coffee imgUrl={coffe2}
          description="coffee" name="Expresso Americano" price={10} types={['espresso', 'bliblibli']} />
        <Coffee imgUrl={coffe3}
          description="coffee" name="Expresso Tradicional" price={10} types={['espresso', 'bliblibli']} />

  </CoffeeListContainer>
    </>
  )

}