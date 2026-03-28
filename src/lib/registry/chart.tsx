import React from "react";
import { type ComponentDoc } from "@/lib/types";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ─── Shared data & configs ───────────────────────────────────────────────────

const interactiveChartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
];

const interactiveChartConfig = {
  views: { label: "Page Views" },
  desktop: { label: "Desktop", color: "var(--chart-2)" },
  mobile: { label: "Mobile", color: "var(--chart-1)" },
} satisfies ChartConfig;

const simpleChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const simpleChartConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#60a5fa" },
} satisfies ChartConfig;

// ─── Interactive preview component ───────────────────────────────────────────

const ChartDemo = () => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof interactiveChartConfig>("desktop");

  const total = React.useMemo(
    () => ({
      desktop: interactiveChartData.reduce(
        (acc, curr) => acc + curr.desktop,
        0
      ),
      mobile: interactiveChartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  return React.createElement(
    Card,
    { className: "py-0 pb-4" },
    React.createElement(
      CardHeader,
      { className: "flex flex-col items-stretch border-b p-0! sm:flex-row" },
      React.createElement(
        "div",
        {
          className:
            "flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!",
        },
        React.createElement(CardTitle, {}, "Bar Chart - Interactive"),
        React.createElement(
          CardDescription,
          {},
          "Showing total visitors for the last 3 months"
        )
      ),
      React.createElement(
        "div",
        { className: "flex" },
        ...(["desktop", "mobile"] as const).map((key) =>
          React.createElement(
            "button",
            {
              key,
              "data-active": activeChart === key,
              className:
                "relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6",
              onClick: () => setActiveChart(key),
            },
            React.createElement(
              "span",
              { className: "text-xs text-muted-foreground" },
              interactiveChartConfig[key].label
            ),
            React.createElement(
              "span",
              { className: "text-lg leading-none font-bold sm:text-3xl" },
              total[key].toLocaleString()
            )
          )
        )
      )
    ),
    React.createElement(
      CardContent,
      { className: "px-2 sm:p-6" },
      React.createElement(
        ChartContainer as any,
        {
          config: interactiveChartConfig,
          className: "aspect-auto h-[250px] w-full",
        },
        React.createElement(
          BarChart as any,
          {
            accessibilityLayer: true,
            data: interactiveChartData,
            margin: { left: 12, right: 12 },
          },
          React.createElement(CartesianGrid as any, { vertical: false }),
          React.createElement(XAxis as any, {
            dataKey: "date",
            tickLine: false,
            axisLine: false,
            tickMargin: 8,
            minTickGap: 32,
            tickFormatter: (value: string) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            },
          }),
          React.createElement(ChartTooltip as any, {
            content: React.createElement(ChartTooltipContent, {
              className: "w-[150px]",
              nameKey: "views",
              labelFormatter: (value: React.ReactNode) =>
                new Date(String(value)).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
            }),
          }),
          React.createElement(Bar as any, {
            dataKey: activeChart,
            fill: `var(--color-${activeChart})`,
          })
        )
      )
    )
  );
};

// ─── ComponentDoc ─────────────────────────────────────────────────────────────

export const chartDoc: ComponentDoc = {
  id: "chart",
  name: "Chart",
  description:
    "Beautiful charts built using Recharts. Fully customizable and composable.",
  installation: {
    cli: "npx shadcn@latest add chart",
    manual:
      "Install recharts, then copy and paste the chart component source code into your project.",
  },
  usage: `import { Bar, BarChart } from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

export function MyChart() {
  return (
    <ChartContainer>
      <BarChart data={data}>
        <Bar dataKey="value" />
        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  )
}`,
  preview: {
    code: `"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  // ... 30 days of data
]

const chartConfig = {
  views: {
    label: "Page Views",
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

export function ChartDemo() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop")

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  return (
    <Card className="py-0 pb-4">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
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
                  className="w-[150px]"
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
            <Bar dataKey={activeChart} fill={\`var(--color-\${activeChart})\`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}`,
    component: React.createElement(ChartDemo),
  },
  examples: [
    {
      name: "Basic",
      description: "A simple bar chart with two data series.",
      code: `"use client"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart } from "recharts"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function ChartExample() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`,
      preview: React.createElement(
        ChartContainer as any,
        {
          config: simpleChartConfig,
          className: "min-h-[200px] w-full",
        },
        React.createElement(
          BarChart as any,
          { accessibilityLayer: true, data: simpleChartData },
          React.createElement(Bar as any, {
            dataKey: "desktop",
            fill: "var(--color-desktop)",
            radius: 4,
          }),
          React.createElement(Bar as any, {
            dataKey: "mobile",
            fill: "var(--color-mobile)",
            radius: 4,
          })
        )
      ),
    },
    {
      name: "Grid",
      description: "Bar chart with a cartesian grid.",
      code: `"use client"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid } from "recharts"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function ChartBarDemoGrid() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`,
      preview: React.createElement(
        ChartContainer as any,
        {
          config: simpleChartConfig,
          className: "min-h-[200px] w-full",
        },
        React.createElement(
          BarChart as any,
          { accessibilityLayer: true, data: simpleChartData },
          React.createElement(CartesianGrid as any, { vertical: false }),
          React.createElement(Bar as any, {
            dataKey: "desktop",
            fill: "var(--color-desktop)",
            radius: 4,
          }),
          React.createElement(Bar as any, {
            dataKey: "mobile",
            fill: "var(--color-mobile)",
            radius: 4,
          })
        )
      ),
    },
    {
      name: "Axis",
      description: "Bar chart with a labelled X axis.",
      code: `"use client"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function ChartBarDemoAxis() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`,
      preview: React.createElement(
        ChartContainer as any,
        {
          config: simpleChartConfig,
          className: "min-h-[200px] w-full",
        },
        React.createElement(
          BarChart as any,
          { accessibilityLayer: true, data: simpleChartData },
          React.createElement(CartesianGrid as any, { vertical: false }),
          React.createElement(XAxis as any, {
            dataKey: "month",
            tickLine: false,
            tickMargin: 10,
            axisLine: false,
            tickFormatter: (value: string) => value.slice(0, 3),
          }),
          React.createElement(Bar as any, {
            dataKey: "desktop",
            fill: "var(--color-desktop)",
            radius: 4,
          }),
          React.createElement(Bar as any, {
            dataKey: "mobile",
            fill: "var(--color-mobile)",
            radius: 4,
          })
        )
      ),
    },
    {
      name: "Tooltip",
      description: "Bar chart with a custom tooltip.",
      code: `"use client"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function ChartBarDemoTooltip() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`,
      preview: React.createElement(
        ChartContainer as any,
        {
          config: simpleChartConfig,
          className: "min-h-[200px] w-full",
        },
        React.createElement(
          BarChart as any,
          { accessibilityLayer: true, data: simpleChartData },
          React.createElement(CartesianGrid as any, { vertical: false }),
          React.createElement(XAxis as any, {
            dataKey: "month",
            tickLine: false,
            tickMargin: 10,
            axisLine: false,
            tickFormatter: (value: string) => value.slice(0, 3),
          }),
          React.createElement(ChartTooltip as any, {
            content: React.createElement(ChartTooltipContent, {}),
          }),
          React.createElement(Bar as any, {
            dataKey: "desktop",
            fill: "var(--color-desktop)",
            radius: 4,
          }),
          React.createElement(Bar as any, {
            dataKey: "mobile",
            fill: "var(--color-mobile)",
            radius: 4,
          })
        )
      ),
    },
    {
      name: "Legend",
      description: "Bar chart with a grid, axis, tooltip, and legend.",
      code: `"use client"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function ChartBarDemoLegend() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`,
      preview: React.createElement(
        ChartContainer as any,
        {
          config: simpleChartConfig,
          className: "min-h-[200px] w-full",
        },
        React.createElement(
          BarChart as any,
          { accessibilityLayer: true, data: simpleChartData },
          React.createElement(CartesianGrid as any, { vertical: false }),
          React.createElement(XAxis as any, {
            dataKey: "month",
            tickLine: false,
            tickMargin: 10,
            axisLine: false,
            tickFormatter: (value: string) => value.slice(0, 3),
          }),
          React.createElement(ChartTooltip as any, {
            content: React.createElement(ChartTooltipContent, {}),
          }),
          React.createElement(ChartLegend as any, {
            content: React.createElement(ChartLegendContent, {}),
          }),
          React.createElement(Bar as any, {
            dataKey: "desktop",
            fill: "var(--color-desktop)",
            radius: 4,
          }),
          React.createElement(Bar as any, {
            dataKey: "mobile",
            fill: "var(--color-mobile)",
            radius: 4,
          })
        )
      ),
    },
  ],
};
