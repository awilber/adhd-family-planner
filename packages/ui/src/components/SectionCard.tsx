import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface SectionCardProps {
  title: string;
  category?: keyof typeof import('../theme/tokens').colors.categories;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  category,
  children,
  headerAction,
  style,
  testID,
}) => {
  const theme = useTheme();

  const getCategoryColor = () => {
    if (!category) return theme.colors.primary[500];
    return theme.colors.categories[category];
  };

  const containerStyle: ViewStyle = {
    backgroundColor: theme.components.card.backgroundColor,
    borderRadius: theme.components.card.borderRadius,
    borderWidth: theme.components.card.borderWidth,
    borderColor: theme.components.card.borderColor,
    padding: theme.components.card.padding,
    marginBottom: theme.spacing[4],
  };

  const headerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[4],
    paddingBottom: theme.spacing[3],
    borderBottomWidth: 2,
    borderBottomColor: getCategoryColor(),
  };

  const titleStyle: TextStyle = {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.neutral[800],
    fontFamily: theme.fonts.heading,
    flex: 1,
  };

  return (
    <View style={[containerStyle, style]} testID={testID}>
      <View style={headerStyle}>
        <Text style={titleStyle}>{title}</Text>
        {headerAction && <View>{headerAction}</View>}
      </View>
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles handled inline for better theme integration
});