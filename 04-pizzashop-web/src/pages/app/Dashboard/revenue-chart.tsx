import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export interface RevenueChartProps {}

const data = [
  { date: '12/10', revenue: 1200 },
  { date: '12/11', revenue: 200 },
  { date: '12/12', revenue: 900 },
  { date: '12/13', revenue: 640 },
  { date: '12/14', revenue: 1500 },
  { date: '12/15', revenue: 800 },
  { date: '12/16', revenue: 300 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Daily Revenue</CardTitle>
          <CardDescription>Daily Revenue in the Period</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              dy={16}
              dx={16}
            />
            <YAxis
              stroke="#888"
              dx={-16}
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })
              }
            />

            <CartesianGrid vertical={false} className="stroke-muted" />

            <Line
              type="linear"
              strokeWidth={2}
              dataKey={'revenue'}
              stroke={colors.violet['500']}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
