import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface ChecklistItemProps {
  id: string;
  title: string;
  completed: boolean;
  timeEstimate?: number; // minutes
  notes?: string;
  onToggle: (id: string) => void;
  onLongPress?: (id: string) => void;
  style?: ViewStyle;
  testID?: string;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  id,
  title,
  completed,
  timeEstimate,
  notes,
  onToggle,
  onLongPress,
  style,
  testID,
}) => {
  const theme = useTheme();

  const getTimeIndicatorStyle = () => {
    if (!timeEstimate) return null;
    
    if (timeEstimate <= 5) {
      return theme.components.timeIndicator.quick;
    } else if (timeEstimate <= 15) {
      return theme.components.timeIndicator.medium;
    } else {
      return theme.components.timeIndicator.long;
    }
  };

  const timeIndicator = getTimeIndicatorStyle();

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: theme.spacing[4],
    backgroundColor: completed 
      ? theme.colors.neutral[50] 
      : theme.colors.neutral[0],
    borderRadius: theme.borderRadius.base,
    borderWidth: 1,
    borderColor: completed 
      ? theme.colors.categories.quick 
      : theme.colors.neutral[200],
    marginBottom: theme.spacing[2],
    minHeight: 56, // Accessibility touch target
  };

  const checkboxStyle: ViewStyle = {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 2,
    borderColor: completed 
      ? theme.colors.categories.quick 
      : theme.colors.neutral[400],
    backgroundColor: completed 
      ? theme.colors.categories.quick 
      : 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing[3],
    marginTop: 2, // Align with text baseline
  };

  const contentStyle: ViewStyle = {
    flex: 1,
    flexDirection: 'column',
  };

  const titleRowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: notes ? theme.spacing[1] : 0,
  };

  const titleStyle: TextStyle = {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.medium,
    color: completed 
      ? theme.colors.neutral[600] 
      : theme.colors.neutral[800],
    fontFamily: theme.fonts.body,
    lineHeight: theme.lineHeight.normal,
    textDecorationLine: completed ? 'line-through' : 'none',
    flex: 1,
    marginRight: timeEstimate ? theme.spacing[2] : 0,
  };

  const notesRowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'flex-start',
  };

  const notesStyle: TextStyle = {
    fontSize: theme.fontSize.sm,
    color: theme.colors.neutral[600],
    fontFamily: theme.fonts.body,
    lineHeight: theme.lineHeight.relaxed,
    fontStyle: 'italic',
  };

  const timeChipStyle: ViewStyle = {
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    borderRadius: theme.borderRadius.full,
    backgroundColor: timeIndicator?.backgroundColor || theme.colors.neutral[200],
  };

  const timeTextStyle: TextStyle = {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: timeIndicator?.textColor || theme.colors.neutral[700],
    fontFamily: theme.fonts.body,
  };

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={() => onToggle(id)}
      onLongPress={() => onLongPress?.(id)}
      activeOpacity={0.8}
      testID={testID}
    >
      <View style={checkboxStyle}>
        {completed && (
          <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>
            ✓
          </Text>
        )}
      </View>
      
      <View style={contentStyle}>
        <View style={titleRowStyle}>
          <Text style={titleStyle}>{title}</Text>
          {timeEstimate && (
            <View style={timeChipStyle}>
              <Text style={timeTextStyle}>
                {timeIndicator?.text || `${timeEstimate}m`}
              </Text>
            </View>
          )}
        </View>
        
        {notes && (
          <View style={notesRowStyle}>
            <Text style={notesStyle} numberOfLines={2}>
              {notes}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Styles handled inline for better theme integration
});