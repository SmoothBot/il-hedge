'use client';

import React from 'react';
import {
  Paper,
  Typography,
  Slider,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { AxisRanges } from '@/lib/calculations';

interface AxisControlsProps {
  axisRanges: AxisRanges;
  onAxisRangesChange: (ranges: AxisRanges) => void;
}

export default function AxisControls({
  axisRanges,
  onAxisRangesChange,
}: AxisControlsProps) {
  const [xPreset, setXPreset] = React.useState<string>('10');

  const handleXPresetChange = (_: React.MouseEvent<HTMLElement>, value: string | null) => {
    if (value) {
      setXPreset(value);
      const range = parseInt(value);
      onAxisRangesChange({
        ...axisRanges,
        xMin: -range,
        xMax: range,
      });
    }
  };

  const handleYRangeChange = (_: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      // Single slider value from 0-100 controls symmetric range
      // When value is 0, both min and max should be 0
      onAxisRangesChange({
        ...axisRanges,
        yMin: value === 0 ? 0 : -value,
        yMax: value,
      });
    }
  };

  const handleXRangeChange = (_: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      // Single slider value controls symmetric range
      onAxisRangesChange({
        ...axisRanges,
        xMin: -value,
        xMax: value,
      });
      setXPreset('custom');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
        Axis Controls
      </Typography>
      
      <Box mb={2}>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          X-Axis Range
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="caption" sx={{ minWidth: 45 }}>
            ±{axisRanges.xMax}%
          </Typography>
          <Slider
            value={axisRanges.xMax}
            onChange={handleXRangeChange}
            min={0}
            max={100}
            step={5}
            size="small"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `±${value}%`}
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          Y-Axis Range
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Typography variant="caption" sx={{ minWidth: 45 }}>
            {axisRanges.yMax === 0 ? '0%' : `±${axisRanges.yMax}%`}
          </Typography>
          <Slider
            value={axisRanges.yMax}
            onChange={handleYRangeChange}
            min={0}
            max={100}
            step={5}
            size="small"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `±${value}%`}
          />
        </Box>
      </Box>
    </Paper>
  );
}