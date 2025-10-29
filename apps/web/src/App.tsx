import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ThemeProvider, Button, SectionCard, ChecklistItem, useThemeContext } from '@personal-planner/ui';
import { formatTimeEstimate, isQuickWin } from '@personal-planner/utils';
import { allTasks, getQuickWinTasks, weeklyTasks, speedCleaningTasks, monthlyTasks, PlannerTask } from '@personal-planner/models/src/plannerData';

const mockRoutines = [
  { id: '1', title: 'Morning Routine', category: 'personal' as const },
  { id: '2', title: 'Kitchen Cleanup', category: 'cleaning' as const },
  { id: '3', title: 'Evening Wind-down', category: 'personal' as const },
];

function AppContent() {
  const { theme } = useThemeContext();
  const [tasks, setTasks] = useState<PlannerTask[]>(allTasks);
  
  const handleTaskToggle = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleTaskLongPress = (taskId: string) => {
    console.log('Task long pressed:', taskId);
  };

  // Get different task categories with proper typing
  const quickWinTasks = tasks.filter(task => task.isQuickWin);
  const dailyTasks = tasks.filter(task => task.category === 'daily' && !task.isQuickWin);
  const weeklyKitchenTasks = tasks.filter(task => task.category === 'weekly' && task.room === 'Kitchen');
  const speedCleanTasks = tasks.filter(task => task.category === 'room-based' && task.room === 'Kitchen');
  const monthlyKitchenTasks = tasks.filter(task => task.category === 'monthly' && task.room === 'Kitchen');

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: theme.colors.neutral[50] }}
      contentContainerStyle={{ padding: 12 }}
    >
      <View style={{ 
        maxWidth: 1200, 
        marginLeft: 'auto', 
        marginRight: 'auto',
        width: '100%'
      }}>
        
        {/* Compact Header */}
        <View style={{ marginBottom: 12, alignItems: 'center' }}>
          <Text style={{ 
            fontSize: theme.fontSize['2xl'], 
            fontWeight: theme.fontWeight.bold,
            color: theme.colors.neutral[900],
            marginBottom: 4
          }}>
            Personal Planner
          </Text>
          <Text style={{ 
            fontSize: theme.fontSize.base, 
            color: theme.colors.neutral[600],
            textAlign: 'center'
          }}>
            Organize your tasks and routines
          </Text>
        </View>

        {/* Three-Column Grid Layout */}
        <View style={{ 
          flexDirection: 'row',
          gap: 12,
          minHeight: 400 // Prevent too much vertical stretching
        }}>
          
          {/* Column 1 - Quick Actions */}
          <View style={{ flex: 1, minWidth: 280 }}>
            {/* Quick Wins - Compact */}
            <View style={{ marginBottom: 12 }}>
              <SectionCard
                title="⚡ Quick Wins"
                category="quick"
              >
                <View style={{ maxHeight: 200 }}>
                  {quickWinTasks.slice(0, 4).map((task) => (
                    <View key={task.id} style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 6,
                      paddingHorizontal: 8,
                      marginBottom: 4,
                      backgroundColor: task.completed ? theme.colors.neutral[100] : theme.colors.neutral[100],
                      borderRadius: 6,
                      borderLeftWidth: 3,
                      borderLeftColor: theme.colors.categories.quick
                    }}>
                      <Text style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: task.completed ? theme.colors.categories.quick : theme.colors.neutral[200],
                        textAlign: 'center',
                        lineHeight: 20,
                        color: 'white',
                        fontSize: 12,
                        marginRight: 8
                      }}>
                        {task.completed ? '✓' : ''}
                      </Text>
                      <Text style={{
                        flex: 1,
                        fontSize: theme.fontSize.sm,
                        color: theme.colors.neutral[800],
                        textDecorationLine: task.completed ? 'line-through' : 'none'
                      }}>
                        {task.title}
                      </Text>
                      <Text style={{
                        fontSize: theme.fontSize.xs,
                        color: theme.colors.neutral[500],
                        marginLeft: 4
                      }}>
                        {task.timeEstimate}m
                      </Text>
                    </View>
                  ))}
                </View>
              </SectionCard>
            </View>

            {/* Speed Cleaning - Compact */}
            <View style={{ marginBottom: 12 }}>
              <SectionCard
                title="💨 Speed Clean"
                category="maintenance"
              >
                <View style={{ maxHeight: 150 }}>
                  {speedCleanTasks.slice(0, 3).map((task) => (
                    <View key={task.id} style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 6,
                      paddingHorizontal: 8,
                      marginBottom: 4,
                      backgroundColor: task.completed ? theme.colors.neutral[100] : theme.colors.neutral[100],
                      borderRadius: 6,
                      borderLeftWidth: 3,
                      borderLeftColor: theme.colors.categories.maintenance
                    }}>
                      <Text style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: task.completed ? theme.colors.categories.maintenance : theme.colors.neutral[200],
                        textAlign: 'center',
                        lineHeight: 20,
                        color: 'white',
                        fontSize: 12,
                        marginRight: 8
                      }}>
                        {task.completed ? '✓' : ''}
                      </Text>
                      <Text style={{
                        flex: 1,
                        fontSize: theme.fontSize.sm,
                        color: theme.colors.neutral[800],
                        textDecorationLine: task.completed ? 'line-through' : 'none'
                      }}>
                        {task.title}
                      </Text>
                      <Text style={{
                        fontSize: theme.fontSize.xs,
                        color: theme.colors.neutral[500],
                        marginLeft: 4
                      }}>
                        {task.timeEstimate}m
                      </Text>
                    </View>
                  ))}
                </View>
              </SectionCard>
            </View>
          </View>

          {/* Column 2 - Daily Structure */}
          <View style={{ flex: 1, minWidth: 280 }}>
            <View style={{ marginBottom: 12 }}>
              <SectionCard
                title="📋 Daily Structure"
                category="schedule"
              >
                <View style={{ maxHeight: 300 }}>
                  {dailyTasks.slice(0, 6).map((task) => (
                    <View key={task.id} style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 8,
                      paddingHorizontal: 10,
                      marginBottom: 6,
                      backgroundColor: task.completed ? theme.colors.neutral[100] : theme.colors.neutral[100],
                      borderRadius: 8,
                      borderLeftWidth: 4,
                      borderLeftColor: theme.colors.categories.schedule
                    }}>
                      <Text style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: task.completed ? theme.colors.categories.schedule : theme.colors.neutral[200],
                        textAlign: 'center',
                        lineHeight: 24,
                        color: 'white',
                        fontSize: 14,
                        marginRight: 10
                      }}>
                        {task.completed ? '✓' : ''}
                      </Text>
                      <View style={{ flex: 1 }}>
                        <Text style={{
                          fontSize: theme.fontSize.base,
                          color: theme.colors.neutral[800],
                          textDecorationLine: task.completed ? 'line-through' : 'none',
                          marginBottom: 2
                        }}>
                          {task.title}
                        </Text>
                        <Text style={{
                          fontSize: theme.fontSize.xs,
                          color: theme.colors.neutral[500]
                        }}>
                          {task.room} • {task.timeEstimate}min
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </SectionCard>
            </View>

            {/* Monthly Deep Clean - Below Daily Structure */}
            <View style={{ marginBottom: 12 }}>
              <SectionCard
                title="🗓️ Monthly Deep"
                category="seasonal"
              >
                <View style={{ maxHeight: 180 }}>
                  {monthlyKitchenTasks.slice(0, 3).map((task) => (
                    <View key={task.id} style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 6,
                      paddingHorizontal: 8,
                      marginBottom: 4,
                      backgroundColor: task.completed ? theme.colors.neutral[100] : theme.colors.neutral[100],
                      borderRadius: 6,
                      borderLeftWidth: 3,
                      borderLeftColor: theme.colors.categories.seasonal
                    }}>
                      <Text style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: task.completed ? theme.colors.categories.seasonal : theme.colors.neutral[200],
                        textAlign: 'center',
                        lineHeight: 20,
                        color: 'white',
                        fontSize: 12,
                        marginRight: 8
                      }}>
                        {task.completed ? '✓' : ''}
                      </Text>
                      <Text style={{
                        flex: 1,
                        fontSize: theme.fontSize.sm,
                        color: theme.colors.neutral[800],
                        textDecorationLine: task.completed ? 'line-through' : 'none'
                      }}>
                        {task.title}
                      </Text>
                      <Text style={{
                        fontSize: theme.fontSize.xs,
                        color: theme.colors.neutral[500],
                        marginLeft: 4
                      }}>
                        {task.timeEstimate}m
                      </Text>
                    </View>
                  ))}
                </View>
              </SectionCard>
            </View>
          </View>

          {/* Column 3 - Weekly & Routines */}
          <View style={{ flex: 1, minWidth: 280 }}>
            {/* Weekly Kitchen Tasks */}
            <View style={{ marginBottom: 12 }}>
              <SectionCard
                title="🍳 Weekly Kitchen"
                category="cleaning"
              >
                <View style={{ maxHeight: 280 }}>
                  {weeklyKitchenTasks.slice(0, 6).map((task) => (
                    <View key={task.id} style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 6,
                      paddingHorizontal: 8,
                      marginBottom: 4,
                      backgroundColor: task.completed ? theme.colors.neutral[100] : theme.colors.neutral[100],
                      borderRadius: 6,
                      borderLeftWidth: 3,
                      borderLeftColor: theme.colors.categories.cleaning
                    }}>
                      <Text style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: task.completed ? theme.colors.categories.cleaning : theme.colors.neutral[200],
                        textAlign: 'center',
                        lineHeight: 20,
                        color: 'white',
                        fontSize: 12,
                        marginRight: 8
                      }}>
                        {task.completed ? '✓' : ''}
                      </Text>
                      <Text style={{
                        flex: 1,
                        fontSize: theme.fontSize.sm,
                        color: theme.colors.neutral[800],
                        textDecorationLine: task.completed ? 'line-through' : 'none'
                      }}>
                        {task.title}
                      </Text>
                      <Text style={{
                        fontSize: theme.fontSize.xs,
                        color: theme.colors.neutral[500],
                        marginLeft: 4
                      }}>
                        {task.timeEstimate}m
                      </Text>
                    </View>
                  ))}
                </View>
              </SectionCard>
            </View>

            {/* Routines - Compact */}
            <View style={{ marginBottom: 12 }}>
              <SectionCard
                title="🔄 Routines"
                category="notes"
              >
                <View style={{ maxHeight: 150 }}>
                  {mockRoutines.map((routine) => (
                    <View key={routine.id} style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 6,
                      paddingHorizontal: 8,
                      marginBottom: 4,
                      backgroundColor: theme.colors.neutral[100],
                      borderRadius: 6,
                      borderLeftWidth: 3,
                      borderLeftColor: theme.colors.categories.notes
                    }}>
                      <Text style={{
                        flex: 1,
                        fontSize: theme.fontSize.sm,
                        color: theme.colors.neutral[800]
                      }}>
                        {routine.title}
                      </Text>
                      <Text style={{
                        fontSize: theme.fontSize.xs,
                        color: theme.colors.categories.notes,
                        fontWeight: theme.fontWeight.medium
                      }}>
                        Start
                      </Text>
                    </View>
                  ))}
                </View>
              </SectionCard>
            </View>
          </View>
        </View>

        {/* Mobile: Stack columns vertically on small screens */}
        <View style={{ 
          display: 'none', // Show only on mobile via media queries in actual implementation
          flexDirection: 'column',
          gap: 12
        }}>
          {/* Mobile layout would go here - for now keeping desktop 3-column */}
        </View>
      </View>
    </ScrollView>
  );
}

function App() {
  return (
    <ThemeProvider initialTheme="dark">
      <AppContent />
    </ThemeProvider>
  );
}

export default App;