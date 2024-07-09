import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/get-orders'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableFilters } from './order-table-filter'
import { OrderTableRow } from './order-table-row'

export function Orders() {
  /*
  One thing we should be aware of when creating pagination, is that the status should not be controlled by a state, because
  the state is not stored on every page refresh, so if i was to be on the page 8, and then press a F5 to refresh the page,
  it would go bcak to the page 1

  So when we want a state to be stored on that specific page, or when we want to send the link to someone of that page, one
  better approach would be to always utilize the search params

  const [page, setPage] = useState(0);
  */

  const [searchParams, setSearchParams] = useSearchParams()

  /* Coerce means convert, so it will make the pageIndex to be converted into number if it is not one already

  the transform, will transform the number obtained from the previous step. and subract 1 from it, so on the user screen
  it will be 1, but on the code side we will treat is as zero

  the parse is retrieving the value from page from the useParam and if it does not exist it will

  Break down of what would happen

  URL contains ?page=3, then the searchParams.get('page') will return 3
  3 is a string, so it will be coerced to the number 3
  then 3 is transformed to 2 by subtracting 1
  pageIndex will be 2
  */

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  /* If we make a function call whenever a parameter changes, we need to include then on the query key, otherwise, the
  key will already exist on the cache and that query will not be executed again */
  const { data: results } = useQuery({
    queryKey: ['orders', pageIndex, customerName, orderId, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        customerName,
        orderId,
        status: status === 'all' ? null : status,
      }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())

      return state
    })
  }

  return (
    <>
      <Helmet title="Orders" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <div className="space-y-3">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-14"></TableHead>
                  <TableHead className="w-[140px]">ID</TableHead>
                  <TableHead className="w-[180px]">Completed</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="w-[140px]">Order Total</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[1px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results?.orders.map((order) => {
                  return <OrderTableRow order={order} key={order.orderId} />
                })}
              </TableBody>
            </Table>
          </div>

          {results && (
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={results.meta.pageIndex}
              totalCount={results.meta.totalCount}
              perPage={results.meta.perPage}
            />
          )}
        </div>
      </div>
    </>
  )
}
