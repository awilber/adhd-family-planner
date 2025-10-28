import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'quick-win';
export type ButtonSize = 'sm' | 'base' | 'lg';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  timeEstimate?: string;
  style?: ViewStyle;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'base',
  disabled = false,
  fullWidth = false,
  timeEstimate,
  style,
  testID,
}) => {
  const theme = useTheme();

  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: disabled 
              ? theme.colors.neutral[300] 
              : theme.colors.primary[500],
            borderWidth: 0,
          },
          text: {
            color: disabled ? theme.colors.neutral[500] : '#ffffff',
            fontWeight: theme.fontWeight.semibold,
          },
        };
      
      case 'secondary':
        return {
          container: {
            backgroundColor: disabled 
              ? theme.colors.neutral[100] 
              : theme.colors.secondary[500],
            borderWidth: 0,
          },
          text: {
            color: disabled ? theme.colors.neutral[500] : '#ffffff',
            fontWeight: theme.fontWeight.semibold,
          },
        };
      
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: disabled 
              ? theme.colors.neutral[300] 
              : theme.colors.primary[500],
          },
          text: {
            color: disabled 
              ? theme.colors.neutral[500] 
              : theme.colors.primary[500],
            fontWeight: theme.fontWeight.medium,
          },
        };
      
      case 'quick-win':
        return {
          container: {
            backgroundColor: disabled 
              ? theme.colors.neutral[300] 
              : theme.colors.categories.quick,
            borderWidth: 0,
          },
          text: {
            color: disabled ? theme.colors.neutral[500] : '#ffffff',
            fontWeight: theme.fontWeight.semibold,
          },
        };
      
      default:
        return getVariantStyles();
    }
  };

  const getSizeStyles = (): { container: ViewStyle; text: TextStyle } => {
    const buttonConfig = theme.components.button;
    
    return {
      container: {
        height: buttonConfig.height[size],
        paddingHorizontal: buttonConfig.padding[size].horizontal,
        paddingVertical: buttonConfig.padding[size].vertical,
      },
      text: {
        fontSize: size === 'sm' ? theme.fontSize.sm : 
                 size === 'lg' ? theme.fontSize.xl : 
                 theme.fontSize.base,
      },
    };
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const containerStyle: ViewStyle = {
    ...styles.container,
    ...variantStyles.container,
    ...sizeStyles.container,
    borderRadius: theme.borderRadius.md,
    width: fullWidth ? '100%' : undefined,
    opacity: disabled ? 0.6 : 1,
  };

  const textStyle: TextStyle = {
    ...styles.text,
    ...variantStyles.text,
    ...sizeStyles.text,
    fontFamily: theme.fonts.body,
  };

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      testID={testID}
    >
      <Text style={textStyle}>
        {title}
        {timeEstimate && (
          <Text style={styles.timeEstimate}> • {timeEstimate}</Text>
        )}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
  },
  timeEstimate: {
    opacity: 0.8,
    fontWeight: '400',
  },
});