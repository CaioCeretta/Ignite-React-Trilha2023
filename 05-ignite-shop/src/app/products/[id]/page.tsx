import Product from "./product";

export default function Page({ params}: { params: {id: string}}) {
  return <Product id={`${params.id}`} />
}