# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview
A Next.js application for visualizing and analyzing Uniswap V3 impermanent loss (IL) hedging strategies using options (long straddles).

## Project Structure
```
il/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with MUI theme
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── HedgeChart.tsx     # Recharts visualization
│   ├── ParameterControls.tsx # MUI sliders for parameters
│   └── StatsDisplay.tsx   # Statistics cards
├── lib/                   # Utilities and logic
│   ├── calculations.ts    # IL and options calculations
│   └── theme.ts          # Material UI theme config
└── il.html               # Original standalone version
```

## Tech Stack
- **Next.js 14** with TypeScript and App Router
- **Material UI v5** for component library
- **Recharts** for data visualization
- **Emotion** for styled components

## Key Features
- Interactive parameter controls with Material UI sliders
- Real-time chart updates showing IL, straddle P&L, and hedged results
- Statistics dashboard showing max losses and hedge efficiency
- Responsive design with improved UX
- Professional styling with consistent theme

## Development Commands
```bash
npm install       # Install dependencies
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Calculation Logic
- Implements Uniswap V3 IL formula for concentrated liquidity
- Models long straddle: max(p - 1, 0) + max(1 - p, 0) - cost
- Range parameter r defines liquidity bounds: [1/r, r]
- Price range: -25% to +25% from initial price