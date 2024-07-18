'use client'

export interface ProductProps {
  id: string;
}

export const Product = ({id}: ProductProps) => {
 return (
 <> 
  <h1>Product {id}</h1>
 </> 
 ) 
}


export default Product