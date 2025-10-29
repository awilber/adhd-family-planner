/**
 * Design tokens extracted from ADHD-friendly planner templates
 * Optimized for reducing cognitive load and supporting executive function
 */

export const colors = {
  primary: {
    50: '#fef7f0',
    100: '#fdeee1',
    200: '#fad5b8',
    300: '#f7b88f',
    400: '#f49666',
    500: '#f1743d', // Main coral/peach
    600: '#d65d2b',
    700: '#b14821',
    800: '#8c3617',
    900: '#67250d',
  },
  secondary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Calm blue
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  categories: {
    cleaning: '#f1743d',     // Coral/peach
    schedule: '#38bdf8',     // Calm blue
    seasonal: '#fbbf24',     // Warm yellow
    maintenance: '#8b5cf6',  // Soft purple
    quick: '#10b981',        // Success green
    notes: '#f472b6',        // Gentle pink
  },
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
} as const;

export const fonts = {
  heading: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  body: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  mono: 'JetBrains Mono, Consolas, monospace',
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,   // Minimum for body text
  lg: 18,     // Preferred body text
  xl: 20,
  '2xl': 24,  // Section headers
  '3xl': 30,  // Page headers
  '4xl': 36,  // Display text
  '5xl': 48,  // TV mode
} as const;

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

export const lineHeight = {
  tight: 1.25,
  normal: 1.5,    // Default for body text
  relaxed: 1.75,  // For dense content
  loose: 2.0,     // For important instructions
} as const;

export const spacing = {
  0: 0,
  1: 4,    // 0.25rem
  2: 8,    // 0.5rem
  3: 12,   // 0.75rem
  4: 16,   // 1rem
  5: 20,   // 1.25rem
  6: 24,   // 1.5rem
  8: 32,   // 2rem
  10: 40,  // 2.5rem
  12: 48,  // 3rem
  16: 64,  // 4rem
  20: 80,  // 5rem
  24: 96,  // 6rem
} as const;

export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,    // Default for cards
  md: 12,     // Buttons
  lg: 16,     // Section cards
  xl: 20,     // Featured elements
  '2xl': 24,  // Hero sections
  full: 9999, // Pills/badges
} as const;

export const shadows = {
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
} as const;

// Component-specific tokens
export const components = {
  button: {
    height: {
      sm: 32,
      base: 44,   // Minimum touch target
      lg: 56,     // TV mode
    },
    padding: {
      sm: { horizontal: 16, vertical: 8 },
      base: { horizontal: 24, vertical: 12 },
      lg: { horizontal: 32, vertical: 16 },
    },
  },
  card: {
    padding: 20,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral[50],
    borderColor: colors.neutral[200],
    borderWidth: 1,
  },
  timeIndicator: {
    quick: {
      backgroundColor: colors.categories.quick,
      text: '≤5 min',
      textColor: '#ffffff',
    },
    medium: {
      backgroundColor: colors.categories.schedule,
      text: '5-15 min',
      textColor: '#ffffff',
    },
    long: {
      backgroundColor: colors.categories.maintenance,
      text: '15+ min',
      textColor: '#ffffff',
    },
  },
} as const;

// Theme configurations
export const themes = {
  'planner-original': {
    name: 'Planner Original',
    colors,
    fonts,
    fontSize,
    fontWeight,
    lineHeight,
    spacing,
    borderRadius,
    shadows,
    components,
  },
  'dark': {
    name: 'Dark Mode',
    colors: {
      ...colors,
      // Invert neutral colors for dark mode
      neutral: {
        50: '#171717',   // Dark background
        100: '#262626',  // Slightly lighter
        200: '#404040',  // Card backgrounds
        300: '#525252',  // Borders
        400: '#737373',  // Muted text
        500: '#a3a3a3',  // Secondary text
        600: '#d4d4d4',  // Primary text
        700: '#e5e5e5',  // High contrast text
        800: '#f5f5f5',  // Very high contrast
        900: '#fafafa',  // Maximum contrast
      },
    },
    fonts,
    fontSize,
    fontWeight,
    lineHeight,
    spacing,
    borderRadius,
    shadows,
    components: {
      ...components,
      card: {
        ...components.card,
        backgroundColor: '#404040', // Dark card background
        borderColor: '#525252',     // Dark border
      },
    },
  },
  'low-stim': {
    name: 'Low Stimulation',
    colors: {
      ...colors,
      primary: colors.neutral,
      categories: {
        cleaning: colors.neutral[600],
        schedule: colors.neutral[500],
        seasonal: colors.neutral[400],
        maintenance: colors.neutral[600],
        quick: colors.neutral[700],
        notes: colors.neutral[500],
      },
    },
    fonts,
    fontSize,
    fontWeight,
    lineHeight,
    spacing,
    borderRadius,
    shadows,
    components: {
      ...components,
      timeIndicator: {
        quick: {
          backgroundColor: colors.neutral[700],
          text: '≤5 min',
          textColor: '#ffffff',
        },
        medium: {
          backgroundColor: colors.neutral[600],
          text: '5-15 min',
          textColor: '#ffffff',
        },
        long: {
          backgroundColor: colors.neutral[500],
          text: '15+ min',
          textColor: '#ffffff',
        },
      },
    },
  },
} as const;

export type Theme = typeof themes['planner-original'];
export type ThemeKey = keyof typeof themes;