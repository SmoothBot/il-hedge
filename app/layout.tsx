import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry';
import './globals.css';

export const metadata: Metadata = {
  title: 'UniV3 IL Hedging Visualizer',
  description: 'Interactive tool for analyzing Uniswap V3 impermanent loss hedging strategies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}