import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skelleton'

export interface MonthCancelledOrdersCardProps {}

export function MonthCancelledOrdersCard() {
  const { data: monthCancelledOrders } = useQuery({
    queryKey: ['metrics', 'month-canceled-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancels (month)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCancelledOrders ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCancelledOrders.amount}
            </span>
            {monthCancelledOrders?.amount >= 0 ? (
              <>
                <p className="text-xs text-muted-foreground">
                  An increase of{' '}
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthCancelledOrders.diffFromLastMonth}%
                  </span>{' '}
                  in relation to the previous month
                </p>
              </>
            ) : (
              <>
                <p className="text-xs text-muted-foreground">
                  A decrease of{' '}
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthCancelledOrders.diffFromLastMonth}%
                  </span>{' '}
                  in relation to the previous month
                </p>
              </>
            )}
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
