# IL Hedge Visualizer

A tool for visualizing impermanent loss hedging strategies for Uniswap V3 positions using options.

## Overview

This app helps analyze how long straddle options can hedge against impermanent loss in concentrated liquidity positions. Adjust parameters to explore different hedging scenarios and see the combined P&L in real-time.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Features

- Interactive chart showing IL, straddle P&L, and hedged results
- Adjustable parameters:
  - Straddle cost (option premium)
  - Scale factor (position sizing)
  - UniV3 range width
  - Chart zoom controls
- Real-time calculation updates
- Responsive design

## Tech Stack

- Next.js 14
- TypeScript
- Material UI
- Recharts

## License

MIT
