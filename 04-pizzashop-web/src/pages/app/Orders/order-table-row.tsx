import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

export interface OrderTableRowProps {
  i: number
}

export function OrderTableRow({ i }: OrderTableRowProps) {
  return (
    <>
      <TableRow key={i}>
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
          jjiodwqajdioqwhd98qdsadas
        </TableCell>
        <TableCell className="text-muted-foreground">15 minutes ago</TableCell>
        <TableCell className="text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            <span className="font-medium text-muted-foreground">Pending</span>
          </div>
        </TableCell>
        <TableCell className="font-medium">Caio Ceretta Soares</TableCell>
        <TableCell className="font-medium">U$ 30,10</TableCell>
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
