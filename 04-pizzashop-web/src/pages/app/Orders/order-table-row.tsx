import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ArrowRight, Search, Table, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliveredOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

export interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const cachedOrdersList = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    cachedOrdersList.forEach(([cachedKey, cachedData]) => {
      if (!cachedData) {
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(cachedKey, {
        ...cachedData,
        orders: cachedData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }

          return order
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancellingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliveredOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered')
      },
    })

  return (
    <>
      <TableRow key={order.orderId}>
        <TableCell>
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogTrigger asChild>
              <Button variant={'outline'} size={'xs'}>
                <Search className="h-3 w-3" />
                <span className="sr-only">Order Details</span>
              </Button>
            </DialogTrigger>

            <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {order.orderId}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {formatDistanceToNow(new Date(order.createdAt), {
            addSuffix: true,
          })}
        </TableCell>
        <TableCell className="text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-medium text-muted-foreground">
              <OrderStatus status={order.status} key={order.orderId} />
            </span>
          </div>
        </TableCell>
        <TableCell className="font-medium">{order.customerName}</TableCell>
        <TableCell className="font-medium">
          {order.total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </TableCell>
        <TableCell>
          {order.status === 'pending' && (
            <Button
              disabled={isApprovingOrder}
              onClick={() => approveOrderFn({ orderId: order.orderId })}
              variant={'outline'}
              className="pl-0"
              size={'xs'}
            >
              <ArrowRight className="m-3 mr-2 h-3" />
              Approve
            </Button>
          )}
          {order.status === 'processing' && (
            <Button
              disabled={isDispatchingOrder}
              onClick={() => dispatchOrderFn({ orderId: order.orderId })}
              variant={'outline'}
              className="pl-0"
              size={'xs'}
            >
              <ArrowRight className="m-3 mr-2 h-3" />
              In Transport
            </Button>
          )}
          {order.status === 'delivering' && (
            <Button
              variant={'outline'}
              disabled={isDeliveringOrder}
              onClick={() => deliverOrderFn({ orderId: order.orderId })}
              className="pl-0"
              size={'xs'}
            >
              <ArrowRight className="m-3 mr-2 h-3" />
              Delivered
            </Button>
          )}
        </TableCell>
        <TableCell>
          <Button
            variant={'ghost'}
            onClick={() => cancelOrderFn({ orderId: order.orderId })}
            disabled={
              !['pending', 'processing'].includes(order.status) ||
              isCancellingOrder
            }
            size={'xs'}
          >
            <X className="m-3 h-3" /> Cancel
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}
