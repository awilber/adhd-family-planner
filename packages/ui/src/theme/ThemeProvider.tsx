import React, { createContext, useContext, useState, ReactNode } from 'react';
import { themes, Theme, ThemeKey } from './tokens';

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeKey;
  currentTheme: ThemeKey;
  setTheme: (themeName: ThemeKey) => void;
  isDark: boolean;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeKey;
  initialColorMode?: 'light' | 'dark';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'planner-original',
  initialColorMode = 'light',
}) => {
  const [themeName, setThemeName] = useState<ThemeKey>(initialTheme);
  const [isDark, setIsDark] = useState(initialColorMode === 'dark');

  const theme = themes[themeName];

  const setTheme = (newThemeName: ThemeKey) => {
    setThemeName(newThemeName);
  };

  const toggleColorMode = () => {
    setIsDark(prev => !prev);
    // Note: Dark mode implementation would modify theme colors
    // For MVP, we'll use the low-stim theme as the "dark" alternative
    if (!isDark && themeName === 'planner-original') {
      setThemeName('low-stim');
    } else if (isDark && themeName === 'low-stim') {
      setThemeName('planner-original');
    }
  };

  const contextValue: ThemeContextType = {
    theme,
    themeName,
    currentTheme: themeName,
    setTheme,
    isDark,
    toggleColorMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context.theme;
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};