import React from 'react';
import { View, Text } from 'react-native';
import { useThemeContext } from '../theme/ThemeProvider';
import { themes, ThemeKey } from '../theme/tokens';

interface ThemeSelectorProps {
  style?: any;
}

export function ThemeSelector({ style }: ThemeSelectorProps) {
  const { theme, setTheme, currentTheme } = useThemeContext();

  const handleThemeChange = (themeKey: ThemeKey) => {
    setTheme(themeKey);
  };

  return (
    <View style={[{
      position: 'relative',
    }, style]}>
      <Text style={{
        fontSize: theme.fontSize.sm,
        color: theme.colors.neutral[600],
        marginBottom: 4,
      }}>
        Theme
      </Text>
      <View style={{
        backgroundColor: theme.colors.neutral[100],
        borderWidth: 1,
        borderColor: theme.colors.neutral[300],
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        minWidth: 120,
      }}>
        <Text
          style={{
            fontSize: theme.fontSize.sm,
            color: theme.colors.neutral[700],
            textAlign: 'center',
          }}
        >
          {themes[currentTheme]?.name || 'Select Theme'}
        </Text>
        
        {/* Dropdown options - simplified for available themes */}
        <View style={{
          position: 'absolute' as any,
          top: 35,
          left: 0,
          right: 0,
          backgroundColor: theme.colors.neutral[50],
          borderWidth: 1,
          borderColor: theme.colors.neutral[300],
          borderRadius: 6,
          zIndex: 1000,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}>
          {['dark', 'midnight'].map((themeKey) => (
            <Text
              key={themeKey}
              onPress={() => handleThemeChange(themeKey as ThemeKey)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                fontSize: theme.fontSize.sm,
                color: theme.colors.neutral[700],
                backgroundColor: currentTheme === themeKey 
                  ? theme.colors.primary[500] 
                  : 'transparent',
                borderBottomWidth: themeKey === 'midnight' ? 0 : 1,
                borderBottomColor: theme.colors.neutral[200],
              }}
            >
              {themes[themeKey as ThemeKey]?.name}
            </Text>
          ))}
        </View>
      </View>
      </View>
    </View>
  );
}