'use server'

import Products from "./products"

export interface PageProps {}

export const Page = (props: PageProps) => {
 return (
 <> 
  <Products />
 </> 
 ) 
}


export default Page