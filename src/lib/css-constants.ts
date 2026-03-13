export const TailwindBreakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xl2: 1536,
} as const;

export type TailwindBreakpointsUnion = keyof typeof TailwindBreakpoints;

const CSSConstants = {
  colors: {
    light: '#e5e0d2',
    accent: '#a88e6b',
    dark: '#171717',
    white: '#ffffff',
    black: '#000000',
  },
} as const;

export type ColorsUnion = keyof (typeof CSSConstants)['colors'];

export default CSSConstants;
