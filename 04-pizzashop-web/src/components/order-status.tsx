type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: OrderStatus
}

/* This OrderStatusMap is going to be used for when the status is pending, it returns Pending, delivering to In Transport
and so on 

Record Util Recap

if we utilize Record<OrderStatus, string> we are saying that the key is any value on the OrderStatus and the v alue is a string
then, on the object, we are going to see that the autocomplete will suggest any value of that type

*/

const OrderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  delivering: 'In Transport',
  delivered: 'Delivered',
  canceled: 'Cancelled',
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}

      {status === 'canceled' && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}

      {['processing', 'delivering'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-amber-400" />
      )}

      {status === 'delivered' && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}

      <span className="font-medium text-muted-foreground">
        {OrderStatusMap[status]}
      </span>
    </div>
  )
}
