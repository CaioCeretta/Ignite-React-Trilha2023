import { CoffeImg, CoffeeCard, Types } from "./styles";

interface CoffeeProps {
  imgUrl: string;
  types: string[];
  name: string;
  description: string;
  price: number;
}


export function Coffee({ imgUrl, types, name, description, price }: CoffeeProps) {
  return (
    <CoffeeCard>
      <CoffeImg>
        <img src={imgUrl} alt={name} />
      </CoffeImg>
      <Types>
        {types.map(type => (
          <span key={type}>{type}</span>
        ))}
      </Types>

      <p>{name}</p>
      <p>{description}</p>
      <p>{price}</p>
    </CoffeeCard>
  )
}