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
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
        {Object.entries(themes).map(([key, themeConfig]) => (
          <Text
            key={key}
            onPress={() => handleThemeChange(key as ThemeKey)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 6,
              backgroundColor: currentTheme === key 
                ? theme.colors.primary[500] 
                : theme.colors.neutral[200],
              color: currentTheme === key 
                ? '#ffffff' 
                : theme.colors.neutral[700],
              fontSize: theme.fontSize.sm,
              fontWeight: currentTheme === key ? theme.fontWeight.medium : theme.fontWeight.normal,
              marginRight: 8,
              marginBottom: 4,
            }}
          >
            {themeConfig.name}
          </Text>
        ))}
      </View>
    </View>
  );
}