# Design Tokens

Design tokens extracted from ADHD-friendly planner templates, optimized for reducing cognitive load and supporting executive function.

## Color Palette

### Primary Colors
```json
{
  "primary": {
    "50": "#fef7f0",
    "100": "#fdeee1", 
    "200": "#fad5b8",
    "300": "#f7b88f",
    "400": "#f49666", 
    "500": "#f1743d", // Main coral/peach
    "600": "#d65d2b",
    "700": "#b14821",
    "800": "#8c3617",
    "900": "#67250d"
  }
}
```

### Secondary Colors
```json
{
  "secondary": {
    "50": "#f0f9ff",
    "100": "#e0f2fe",
    "200": "#bae6fd",
    "300": "#7dd3fc",
    "400": "#38bdf8",
    "500": "#0ea5e9", // Calm blue
    "600": "#0284c7",
    "700": "#0369a1",
    "800": "#075985",
    "900": "#0c4a6e"
  }
}
```

### Category Colors
```json
{
  "categories": {
    "cleaning": "#f1743d",     // Coral/peach
    "schedule": "#38bdf8",     // Calm blue  
    "seasonal": "#fbbf24",     // Warm yellow
    "maintenance": "#8b5cf6",  // Soft purple
    "quick": "#10b981",        // Success green
    "notes": "#f472b6"         // Gentle pink
  }
}
```

### Status Colors
```json
{
  "status": {
    "success": "#10b981",
    "warning": "#f59e0b", 
    "error": "#ef4444",
    "info": "#3b82f6"
  }
}
```

### Neutral Colors  
```json
{
  "neutral": {
    "50": "#fafafa",
    "100": "#f5f5f5",
    "200": "#e5e5e5", 
    "300": "#d4d4d4",
    "400": "#a3a3a3",
    "500": "#737373",
    "600": "#525252",
    "700": "#404040",
    "800": "#262626",
    "900": "#171717"
  }
}
```

## Typography

### Font Families
```json
{
  "fonts": {
    "heading": "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    "body": "Inter, -apple-system, BlinkMacSystemFont, sans-serif", 
    "mono": "JetBrains Mono, Consolas, monospace"
  }
}
```

### Font Sizes (ADHD-optimized for readability)
```json
{
  "fontSize": {
    "xs": "12px",
    "sm": "14px", 
    "base": "16px",   // Minimum for body text
    "lg": "18px",     // Preferred body text
    "xl": "20px",
    "2xl": "24px",    // Section headers
    "3xl": "30px",    // Page headers
    "4xl": "36px",    // Display text
    "5xl": "48px"     // TV mode
  }
}
```

### Font Weights
```json
{
  "fontWeight": {
    "normal": 400,
    "medium": 500,
    "semibold": 600,
    "bold": 700
  }
}
```

### Line Heights (generous for readability)
```json
{
  "lineHeight": {
    "tight": 1.25,
    "normal": 1.5,    // Default for body text
    "relaxed": 1.75,  // For dense content
    "loose": 2.0      // For important instructions
  }
}
```

## Spacing

### Spacing Scale (8px base unit)
```json
{
  "spacing": {
    "0": "0",
    "1": "4px",    // 0.25rem
    "2": "8px",    // 0.5rem  
    "3": "12px",   // 0.75rem
    "4": "16px",   // 1rem
    "5": "20px",   // 1.25rem
    "6": "24px",   // 1.5rem
    "8": "32px",   // 2rem
    "10": "40px",  // 2.5rem
    "12": "48px",  // 3rem
    "16": "64px",  // 4rem
    "20": "80px",  // 5rem
    "24": "96px"   // 6rem
  }
}
```

## Border Radius

```json
{
  "borderRadius": {
    "none": "0",
    "sm": "4px",
    "base": "8px",    // Default for cards
    "md": "12px",     // Buttons
    "lg": "16px",     // Section cards
    "xl": "20px",     // Featured elements
    "2xl": "24px",    // Hero sections
    "full": "9999px"  // Pills/badges
  }
}
```

## Shadows (subtle, calming)

```json
{
  "boxShadow": {
    "sm": "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    "base": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    "md": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    "lg": "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    "xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
  }
}
```

## Component Tokens

### Buttons
```json
{
  "button": {
    "height": {
      "sm": "32px",
      "base": "44px",   // Minimum touch target
      "lg": "56px"      // TV mode
    },
    "padding": {
      "sm": "8px 16px",
      "base": "12px 24px", 
      "lg": "16px 32px"
    }
  }
}
```

### Cards
```json
{
  "card": {
    "padding": "20px",
    "borderRadius": "12px",
    "backgroundColor": "neutral.50",
    "border": "1px solid neutral.200"
  }
}
```

### Time Indicators
```json
{
  "timeIndicator": {
    "quick": {
      "backgroundColor": "categories.quick",
      "text": "≤5 min",
      "textColor": "white"
    },
    "medium": {
      "backgroundColor": "categories.schedule", 
      "text": "5-15 min",
      "textColor": "white"
    },
    "long": {
      "backgroundColor": "categories.maintenance",
      "text": "15+ min", 
      "textColor": "white"
    }
  }
}
```

## Accessibility Guidelines

### Contrast Ratios
- **Body text**: Minimum 4.5:1 against background
- **Large text**: Minimum 3:1 against background  
- **Interactive elements**: Minimum 3:1 against background

### Touch Targets
- **Minimum size**: 44px × 44px (iOS/Android guidelines)
- **Preferred size**: 56px × 56px for primary actions
- **TV mode**: 80px × 80px minimum

### Focus States
- **Outline**: 2px solid primary.500 with 2px offset
- **Background**: primary.50 for subtle highlight
- **Animation**: 150ms ease-in-out transition

## ADHD-Specific Considerations

### Color Psychology
- **Warm colors** (coral, peach) for active/urgent tasks
- **Cool colors** (blue, teal) for calming/routine tasks  
- **Muted tones** prevent overstimulation
- **High contrast** supports focus and reduces eye strain

### Visual Hierarchy
- **Size progression**: Clear jumps between font sizes
- **Weight contrast**: Bold headers, regular body text
- **Color coding**: Consistent category associations
- **Whitespace**: Generous spacing prevents overwhelm

### Time Management Support
- **Visual time estimates**: Color-coded duration indicators
- **Progress visualization**: Checkbox grids and completion bars
- **Quick wins**: Prominent display of ≤5 minute tasks
- **Chunking**: Section breaks every 5-7 items max