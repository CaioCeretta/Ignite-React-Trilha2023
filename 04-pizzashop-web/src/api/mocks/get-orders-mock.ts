import { http, HttpResponse } from 'msw'

import type { GetOrdersResponse } from '../get-orders'

type Orders = GetOrdersResponse['orders']

type OrderStatus = GetOrdersResponse['orders'][number]['status']

const statuses: OrderStatus[] = [
  'pending',
  'processing',
  'delivering',
  'delivered',
  'canceled',
]

const orders: Orders = Array.from({ length: 60 }).map((_, i) => {
  return {
    orderId: `order-${i + 1}`,
    customerName: `customer-${i + 1}`,
    createdAt: new Date().toISOString(),
    total: 2400,
    status: statuses[i % 5],
  }
})

export const GetOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    /* This function URL transforms a string, that in this case is an URL, into something we can read by parts */
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0

    const customerName = searchParams.get('customerName')

    const orderId = searchParams.get('orderId')

    const status = searchParams.get('status')

    let filteredOrders = orders

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId),
      )
    }

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName),
      )
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) =>
        order.status.includes(status),
      )
    }

    /*
    Pagination refresher: filteredOrders will have 60 lines. For pagination, we are using the slice method.
    The slice method's first parameter is the beginning index from where we want to slice, and the second parameter is the
    ending index (exclusive).
    In this example, if we are on page 1 (assuming pageIndex is 0-based), the beginning index would be 0 * 10 = 0, and it
    would end at (0 + 1) * 10 = 10, returning the first 10 results. On page 2 (pageIndex = 1), 
    the slice would start at 1 * 10 = 10 and end at (1 + 1) * 10 = 20, returning the next 10 results, and so on.
    */

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  },
)

/* That request is the same request as the fetch api, which means i don't have direct access to the params */
