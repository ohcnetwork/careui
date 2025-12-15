import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

const chartData = [
  { month: "Jan", desktop: 186 },
  { month: "Feb", desktop: 305 },
  { month: "Mar", desktop: 237 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
}

export const chartDoc: ComponentDoc = {

    id: 'chart',
    name: 'Chart',
    description: 'A collection of chart components built with Recharts.',
    installation: {
      cli: 'npx shadcn@latest add chart',
      manual: 'Copy and paste the chart component source code into your project.'
    },
    usage: `import { ChartContainer } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis } from "recharts"`,
    preview: {
      code: `const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
}

<ChartContainer config={chartConfig} className="h-[200px]">
  <BarChart data={chartData}>
    <XAxis dataKey="month" />
    <YAxis />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
  </BarChart>
</ChartContainer>`,
      component: React.createElement(ChartContainer as any, {
        config: chartConfig,
        className: "h-[200px] w-full"
      },
        React.createElement(BarChart as any, {
          data: chartData
        },
          React.createElement(XAxis as any, { dataKey: "month" }),
          React.createElement(YAxis as any, {}),
          React.createElement(ChartTooltip as any, {
            content: React.createElement(ChartTooltipContent as any, {})
          }),
          React.createElement(Bar as any, {
            dataKey: "desktop",
            fill: "var(--color-desktop)",
            radius: 4
          })
        )
      )
    }
}
