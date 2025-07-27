'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Chart color palette
const COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  muted: '#6b7280',
};

const CHART_COLORS = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.success,
  COLORS.warning,
  COLORS.danger,
];

interface ChartProps {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactElement;
}

export function ChartContainer({
  title,
  description,
  className,
  children,
}: ChartProps) {
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface AreaChartComponentProps {
  data: any[];
  xAxisKey: string;
  areaKey: string;
  title?: string;
  description?: string;
  color?: string;
  className?: string;
}

export function AreaChartComponent({
  data,
  xAxisKey,
  areaKey,
  title,
  description,
  color = COLORS.primary,
  className,
}: AreaChartComponentProps) {
  return (
    <ChartContainer
      title={title}
      description={description}
      className={className}
    >
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey={xAxisKey} className="text-muted-foreground" />
        <YAxis className="text-muted-foreground" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
          }}
        />
        <Area
          type="monotone"
          dataKey={areaKey}
          stroke={color}
          fill={color}
          fillOpacity={0.2}
        />
      </AreaChart>
    </ChartContainer>
  );
}

interface LineChartComponentProps {
  data: any[];
  xAxisKey: string;
  lines: { key: string; color?: string; name?: string }[];
  title?: string;
  description?: string;
  className?: string;
}

export function LineChartComponent({
  data,
  xAxisKey,
  lines,
  title,
  description,
  className,
}: LineChartComponentProps) {
  return (
    <ChartContainer
      title={title}
      description={description}
      className={className}
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey={xAxisKey} className="text-muted-foreground" />
        <YAxis className="text-muted-foreground" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
          }}
        />
        <Legend />
        {lines.map((line, index) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            stroke={line.color || CHART_COLORS[index % CHART_COLORS.length]}
            strokeWidth={2}
            name={line.name || line.key}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}

interface BarChartComponentProps {
  data: any[];
  xAxisKey: string;
  bars: { key: string; color?: string; name?: string }[];
  title?: string;
  description?: string;
  className?: string;
}

export function BarChartComponent({
  data,
  xAxisKey,
  bars,
  title,
  description,
  className,
}: BarChartComponentProps) {
  return (
    <ChartContainer
      title={title}
      description={description}
      className={className}
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey={xAxisKey} className="text-muted-foreground" />
        <YAxis className="text-muted-foreground" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
          }}
        />
        <Legend />
        {bars.map((bar, index) => (
          <Bar
            key={bar.key}
            dataKey={bar.key}
            fill={bar.color || CHART_COLORS[index % CHART_COLORS.length]}
            name={bar.name || bar.key}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}

interface PieChartComponentProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  title?: string;
  description?: string;
  className?: string;
}

export function PieChartComponent({
  data,
  dataKey,
  nameKey,
  title,
  description,
  className,
}: PieChartComponentProps) {
  return (
    <ChartContainer
      title={title}
      description={description}
      className={className}
    >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey={dataKey}
          label={({ name, value }) => `${name}: ${value}`}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
          }}
        />
        <Legend />
      </PieChart>
    </ChartContainer>
  );
}
