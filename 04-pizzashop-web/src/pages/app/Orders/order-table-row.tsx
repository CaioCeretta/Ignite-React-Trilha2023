import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { CancelOrder } from '@/api/cancel-order'
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

  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: CancelOrder,
    async onSuccess(_, { orderId }) {
      const cachedOrdersList = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      })

      cachedOrdersList.forEach(([cachedKey, cachedData]) => {
        if (!cachedData) {
          return 0
        }

        queryClient.setQueryData<GetOrdersResponse>(cachedKey, {
          ...cachedData,
          orders: cachedData.orders.map((order) => {
            if (order.orderId === orderId) {
              return { ...order, status: 'canceled' }
            }

            return order
          }),
        })
      })
    },
  })

  return (
    <>
      <TableRow key={order.orderId}>
        <TableCell>
          {/* 
          Now the open or closed of that dialog is being held by a state, it opens if the isDetailOpen is true, and it
          only turns into true if the open button is clicked on
           */}
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
          {formatDistanceToNow(order.createdAt, {
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
          <Button variant={'outline'} className="pl-0" size={'xs'}>
            <ArrowRight className="m-3 mr-2 h-3" />
            Approve
          </Button>
        </TableCell>
        <TableCell>
          <Button
            variant={'ghost'}
            onClick={() => cancelOrderFn({ orderId: order.orderId })}
            disabled={!['pending', 'processing'].includes(order.status)}
            size={'xs'}
          >
            <X className="m-3 h-3" /> Cancel
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}
