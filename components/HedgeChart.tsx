'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Paper, useTheme } from '@mui/material';
import { DataPoint, AxisRanges } from '@/lib/calculations';

interface HedgeChartProps {
  data: DataPoint[];
  axisRanges: AxisRanges;
}

export default function HedgeChart({ data, axisRanges }: HedgeChartProps) {
  const theme = useTheme();

  return (
    <Paper elevation={3} sx={{ p: 3, height: 1000 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis
            dataKey="priceChange"
            label={{ value: 'Price Change (%)', position: 'insideBottom', offset: -5 }}
            stroke={theme.palette.text.secondary}
            domain={[axisRanges.xMin, axisRanges.xMax]}
            type="number"
            tickFormatter={(value) => `${value}%`}
            allowDataOverflow={true}
          />
          <YAxis
            label={{ value: 'P&L (%)', angle: -90, position: 'insideLeft' }}
            stroke={theme.palette.text.secondary}
            domain={[axisRanges.yMin, axisRanges.yMax]}
            tickFormatter={(value) => `${value}%`}
            scale="linear"
            type="number"
            allowDataOverflow={true}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius,
            }}
            formatter={(value: number) => `${value.toFixed(2)}%`}
          />
          <Legend />
          <ReferenceLine y={0} stroke={theme.palette.divider} strokeWidth={2} />
          <ReferenceLine x={0} stroke={theme.palette.divider} strokeWidth={2} />
          <Line
            type="monotone"
            dataKey="impermanentLoss"
            name="UniV3 IL (Inverted)"
            stroke={theme.palette.error.main}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="straddlePnl"
            name="Straddle P&L"
            stroke={theme.palette.success.main}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="combined"
            name="Hedged Result"
            stroke={theme.palette.primary.main}
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}