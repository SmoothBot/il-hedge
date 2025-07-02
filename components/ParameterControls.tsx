'use client';

import React from 'react';
import {
  Paper,
  Typography,
  Slider,
  Box,
  Tooltip,
} from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { HedgeParameters } from '@/lib/calculations';

interface ParameterControlsProps {
  parameters: HedgeParameters;
  onParametersChange: (params: HedgeParameters) => void;
}

export default function ParameterControls({
  parameters,
  onParametersChange,
}: ParameterControlsProps) {
  const handleChange = (key: keyof HedgeParameters) => (_: Event, value: number | number[]) => {
    onParametersChange({
      ...parameters,
      [key]: value as number,
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
        Hedge Parameters
      </Typography>
      
      <Box mb={2}>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="caption" color="text.secondary">
            Straddle Cost
          </Typography>
          <Tooltip title="The premium paid for the long straddle option strategy">
            <InfoOutlined sx={{ ml: 0.5, fontSize: 14, color: 'action.disabled' }} />
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="caption" sx={{ minWidth: 45 }}>
            {(parameters.straddleCost * 100).toFixed(1)}%
          </Typography>
          <Slider
            value={parameters.straddleCost}
            onChange={handleChange('straddleCost')}
            min={0}
            max={0.1}
            step={0.005}
            size="small"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${(value * 100).toFixed(1)}%`}
          />
        </Box>
      </Box>

      <Box mb={2}>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="caption" color="text.secondary">
            Straddle Scale
          </Typography>
          <Tooltip title="Multiplier for the straddle position size relative to the LP position">
            <InfoOutlined sx={{ ml: 0.5, fontSize: 14, color: 'action.disabled' }} />
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="caption" sx={{ minWidth: 45 }}>
            {parameters.straddleScale.toFixed(2)}x
          </Typography>
          <Slider
            value={parameters.straddleScale}
            onChange={handleChange('straddleScale')}
            min={0.1}
            max={20.0}
            step={0.05}
            size="small"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value.toFixed(2)}x`}
          />
        </Box>
      </Box>

      <Box>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="caption" color="text.secondary">
            Range Width (r)
          </Typography>
          <Tooltip title="UniV3 liquidity range parameter. Lower = 1/r, Upper = r">
            <InfoOutlined sx={{ ml: 0.5, fontSize: 14, color: 'action.disabled' }} />
          </Tooltip>
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
          Range: [{(1 / parameters.rangeWidth).toFixed(3)}, {parameters.rangeWidth.toFixed(3)}]
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="caption" sx={{ minWidth: 45 }}>
            {parameters.rangeWidth.toFixed(3)}
          </Typography>
          <Slider
            value={parameters.rangeWidth}
            onChange={handleChange('rangeWidth')}
            min={1.001}
            max={2.5}
            step={0.001}
            size="small"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => value.toFixed(3)}
          />
        </Box>
      </Box>
    </Paper>
  );
}