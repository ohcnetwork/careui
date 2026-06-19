import { ChartContainer } from "careui";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const admissionsData = [
  { month: "Jan", patients: 186 },
  { month: "Feb", patients: 205 },
  { month: "Mar", patients: 237 },
  { month: "Apr", patients: 273 },
  { month: "May", patients: 209 },
  { month: "Jun", patients: 214 },
];

const admissionsConfig = {
  patients: {
    label: "Patients",
    color: "hsl(var(--chart-1))",
  },
};

export function BarChartExample() {
  return (
    <ChartContainer config={admissionsConfig} className="h-48 w-[400px]">
      <BarChart data={admissionsData} width={400} height={192} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <Bar dataKey="patients" fill="var(--color-patients)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

const vitalsData = [
  { time: "08:00", bpm: 72 },
  { time: "10:00", bpm: 78 },
  { time: "12:00", bpm: 74 },
  { time: "14:00", bpm: 80 },
  { time: "16:00", bpm: 76 },
  { time: "18:00", bpm: 71 },
];

const vitalsConfig = {
  bpm: {
    label: "Heart Rate",
    color: "hsl(var(--chart-2))",
  },
};

export function LineChartExample() {
  return (
    <ChartContainer config={vitalsConfig} className="h-48 w-[400px]">
      <LineChart data={vitalsData} width={400} height={192} accessibilityLayer>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
        <Line
          type="monotone"
          dataKey="bpm"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

const trendData = [
  { week: "W1", consultations: 40, admissions: 24 },
  { week: "W2", consultations: 55, admissions: 28 },
  { week: "W3", consultations: 47, admissions: 22 },
  { week: "W4", consultations: 62, admissions: 35 },
];

const trendConfig = {
  consultations: {
    label: "Consultations",
    color: "hsl(var(--chart-1))",
  },
  admissions: {
    label: "Admissions",
    color: "hsl(var(--chart-2))",
  },
};

export function AreaChartExample() {
  return (
    <ChartContainer config={trendConfig} className="h-48 w-[400px]">
      <AreaChart data={trendData} width={400} height={192} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
        <Area
          type="monotone"
          dataKey="consultations"
          stackId="a"
          stroke="var(--color-consultations)"
          fill="var(--color-consultations)"
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="admissions"
          stackId="b"
          stroke="var(--color-admissions)"
          fill="var(--color-admissions)"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ChartContainer>
  );
}
