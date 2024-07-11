import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-mont-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export interface MonthRevenueCardProps {}

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthRevenue,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Full Month Revenue
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue && (
          <>
            {monthRevenue.amount >= 0 ? (
              <>
                <span className="text-2xl font-bold tracking-tight">
                  $ {monthRevenue.amount}
                </span>
                <p className="text-xs text-muted-foreground">
                  An increase of{' '}
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthRevenue.diffFromLastMonth}
                  </span>{' '}
                  in relation to the previous month
                </p>
              </>
            ) : (
              <>
                <span className="text-2xl font-bold tracking-tight">
                  {monthRevenue.amount}
                </span>
                <p className="text-xs text-muted-foreground">
                  A decrease of{' '}
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthRevenue.diffFromLastMonth}
                  </span>{' '}
                  in relation to the previous month
                </p>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
