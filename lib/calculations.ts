export interface DataPoint {
  priceChange: number;
  impermanentLoss: number;
  straddlePnl: number;
  combined: number;
}

export interface HedgeParameters {
  straddleCost: number;
  straddleScale: number;
  rangeWidth: number;
}

export interface AxisRanges {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export function calculateHedgeData(params: HedgeParameters, priceRange: number = 0.25): DataPoint[] {
  const { straddleCost, straddleScale, rangeWidth } = params;
  const data: DataPoint[] = [];
  
  const lower = 1 / rangeWidth;
  const upper = rangeWidth;
  
  for (let i = -priceRange; i <= priceRange; i += 0.01) {
    const priceRatio = 1 + i;
    let il: number;
    
    if (priceRatio < lower || priceRatio > upper) {
      il = 1;
    } else {
      const sqrtL = Math.sqrt(lower);
      const sqrtU = Math.sqrt(upper);
      const sqrtP = Math.sqrt(priceRatio);
      const x = (sqrtP - sqrtL) / (sqrtU - sqrtL);
      const y = 1 - x;
      const value = 2 * Math.sqrt(x * y);
      il = 1 - value;
    }
    
    const call = Math.max(priceRatio - 1, 0);
    const put = Math.max(1 - priceRatio, 0);
    const straddle = straddleScale * (call + put - straddleCost);
    
    data.push({
      priceChange: i * 100,
      impermanentLoss: -il * 100,
      straddlePnl: straddle * 100,
      combined: (-il + straddle) * 100
    });
  }
  
  return data;
}