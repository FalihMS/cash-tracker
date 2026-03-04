"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
  views: {
    label: "Amount",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function TransactionHistoryChart({
  data,
}:{
  data: {
    total_sum:number,
    date: string,
  }[]
}) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
          <CardTitle>Expense History</CardTitle>
      </CardHeader>
      <CardContent className="-pt-4 px-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="transaction_date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              interval={6}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[165px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={'total_sum'} fill={`black`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
