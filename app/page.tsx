'use client';

import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
} from '@mui/material';
import { GitHub } from '@mui/icons-material';
import HedgeChart from '@/components/HedgeChart';
import ParameterControls from '@/components/ParameterControls';
import AxisControls from '@/components/AxisControls';
import { calculateHedgeData, HedgeParameters, AxisRanges } from '@/lib/calculations';

export default function Home() {
  const [parameters, setParameters] = useState<HedgeParameters>({
    straddleCost: 0.005,
    straddleScale: 1.4,
    rangeWidth: 1.21,
  });

  const [axisRanges, setAxisRanges] = useState<AxisRanges>({
    xMin: -10,
    xMax: 10,
    yMin: -50,
    yMax: 50,
  });

  const data = useMemo(() => calculateHedgeData(parameters, 1.0), [parameters]);

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            UniV3 IL Hedging Visualizer
          </Typography>
          <IconButton
            color="inherit"
            href="https://github.com/SmoothBot/il-hedge"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} sx={{ mt: 2, mb: 2, px: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box sx={{ position: 'sticky', top: 16 }}>
              <AxisControls
                axisRanges={axisRanges}
                onAxisRangesChange={setAxisRanges}
              />
              
              <ParameterControls
                parameters={parameters}
                onParametersChange={setParameters}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            <HedgeChart data={data} axisRanges={axisRanges} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}