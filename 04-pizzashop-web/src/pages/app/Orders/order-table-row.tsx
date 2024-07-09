import { formatDistanceToNow } from 'date-fns'
import { ArrowRight, Search, X } from 'lucide-react'

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
  return (
    <>
      <TableRow key={order.orderId}>
        <TableCell>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'} size={'xs'}>
                <Search className="h-3 w-3" />
                <span className="sr-only">Order Details</span>
              </Button>
            </DialogTrigger>

            <OrderDetails />
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
          <Button variant={'ghost'} className="pl-0" size={'xs'}>
            <X className="m-3 h-3" /> Cancel
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}
