import { useRouter } from "next/router"

export default function Product() {
  const router = useRouter()

  const { id } = router.query


  return (
    <>
    <h1>Product Page</h1>
    <h1>useRouter value {JSON.stringify(router.query)}</h1>
    </>
  )
}