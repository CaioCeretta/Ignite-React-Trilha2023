import { http, HttpResponse } from 'msw'

import { DispatchOrderParams } from '../dispatch-order'

export const dispatchOrderMock = http.patch<DispatchOrderParams, never, never>(
  '/orders/:orderId/dispatch',
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    } else {
      return new HttpResponse(null, { status: 204 })
    }
  },
)
