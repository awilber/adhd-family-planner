import React from 'react';
import { View } from 'react-native';
import { useThemeContext } from '../theme/ThemeProvider';
import { ThemeSelector } from './ThemeSelector';

interface TopBannerProps {
  children?: React.ReactNode;
}

export function TopBanner({ children }: TopBannerProps) {
  const { theme } = useThemeContext();

  return (
    <View style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: theme.colors.neutral[100],
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.neutral[300],
      paddingHorizontal: 16,
      paddingVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
      }}>
        <View style={{ flex: 1 }}>
          {children}
        </View>
        <View style={{ marginLeft: 16 }}>
          <ThemeSelector />
        </View>
      </View>
    </View>
  );
}