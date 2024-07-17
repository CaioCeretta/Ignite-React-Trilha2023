import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skelleton'

export interface MonthOrdersAmountCardProps {}

export function MonthOrdersAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount,
  })

  console.log(monthOrdersAmount?.amount)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Orders (month)
        </CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {/* {monthOrdersAmount.amount.toLocaleString('en-US')} */}
            </span>
            {monthOrdersAmount.amount >= 0 ? (
              <>
                <p className="text-xs text-muted-foreground">
                  An increase of{' '}
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthOrdersAmount.diffFromLastMonth}{' '}
                  </span>{' '}
                  in relation to the previous month
                </p>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                A decrease of{' '}
                <span className="text-rose-500 dark:text-rose-400">
                  {monthOrdersAmount.diffFromLastMonth}
                </span>{' '}
                in relation to the previous month
              </p>
            )}
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
