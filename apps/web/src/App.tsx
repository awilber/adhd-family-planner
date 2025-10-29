import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ThemeProvider, Button, SectionCard, ChecklistItem, useThemeContext } from '@adhd-planner/ui';
import { formatTimeEstimate, isQuickWin } from '@adhd-planner/utils';
import { allTasks, getQuickWinTasks, weeklyTasks, speedCleaningTasks, monthlyTasks, PlannerTask } from '@adhd-planner/models/src/plannerData';

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
      contentContainerStyle={{ padding: 8 }}
    >
      <View style={{ 
        maxWidth: 1400, 
        marginLeft: 'auto', 
        marginRight: 'auto',
        width: '100%'
      }}>
        
        {/* Header */}
        <View style={{ marginBottom: 8 }}>
          <Text style={{ 
            fontSize: theme.fontSize['3xl'], 
            fontWeight: theme.fontWeight.bold,
            color: theme.colors.neutral[900],
            textAlign: 'center',
            marginBottom: 8
          }}>
            ADHD Family Planner
          </Text>
          <Text style={{ 
            fontSize: theme.fontSize.lg, 
            color: theme.colors.neutral[600],
            textAlign: 'center',
            marginBottom: 16
          }}>
            Reduce overwhelm, increase consistency
          </Text>
        </View>

        {/* Multi-column layout */}
        <View style={{ 
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'space-between'
        }}>
          
          {/* Quick Wins Section */}
          <View style={{ minWidth: 350, flex: 1, marginBottom: 8 }}>
            <SectionCard
              title="⚡ Quick Wins (≤5min)"
              category="quick"
            >
              {quickWinTasks.map((task) => (
                <ChecklistItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  timeEstimate={task.timeEstimate}
                  notes={task.room}
                  completed={task.completed}
                  onToggle={() => handleTaskToggle(task.id)}
                  onLongPress={() => handleTaskLongPress(task.id)}
                />
              ))}
            </SectionCard>
          </View>

          {/* Daily Tasks Section */}
          <View style={{ minWidth: 350, flex: 1, marginBottom: 8 }}>
            <SectionCard
              title="📋 Daily Structure"
              category="schedule"
            >
              {dailyTasks.map((task) => (
                <ChecklistItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  timeEstimate={task.timeEstimate}
                  notes={task.room}
                  completed={task.completed}
                  onToggle={() => handleTaskToggle(task.id)}
                  onLongPress={() => handleTaskLongPress(task.id)}
                />
              ))}
            </SectionCard>
          </View>

          {/* Weekly Kitchen Tasks */}
          <View style={{ minWidth: 350, flex: 1, marginBottom: 8 }}>
            <SectionCard
              title="🍳 Weekly Kitchen"
              category="cleaning"
            >
              {weeklyKitchenTasks.map((task) => (
                <ChecklistItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  timeEstimate={task.timeEstimate}
                  notes={task.room}
                  completed={task.completed}
                  onToggle={() => handleTaskToggle(task.id)}
                  onLongPress={() => handleTaskLongPress(task.id)}
                />
              ))}
            </SectionCard>
          </View>

          {/* Speed Cleaning */}
          <View style={{ minWidth: 350, flex: 1, marginBottom: 8 }}>
            <SectionCard
              title="💨 Speed Cleaning"
              category="maintenance"
            >
              {speedCleanTasks.map((task) => (
                <ChecklistItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  timeEstimate={task.timeEstimate}
                  notes={task.room}
                  completed={task.completed}
                  onToggle={() => handleTaskToggle(task.id)}
                  onLongPress={() => handleTaskLongPress(task.id)}
                />
              ))}
            </SectionCard>
          </View>

          {/* Monthly Deep Tasks */}
          <View style={{ minWidth: 350, flex: 1, marginBottom: 8 }}>
            <SectionCard
              title="🗓️ Monthly Deep Clean"
              category="seasonal"
            >
              {monthlyKitchenTasks.map((task) => (
                <ChecklistItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  timeEstimate={task.timeEstimate}
                  notes={task.room}
                  completed={task.completed}
                  onToggle={() => handleTaskToggle(task.id)}
                  onLongPress={() => handleTaskLongPress(task.id)}
                />
              ))}
            </SectionCard>
          </View>

          {/* Routines Section */}
          <View style={{ minWidth: 350, flex: 1, marginBottom: 8 }}>
            <SectionCard
              title="🔄 Current Routines"
              category="notes"
            >
              {mockRoutines.map((routine) => (
                <View key={routine.id} style={{ 
                  padding: theme.spacing[3],
                  backgroundColor: theme.colors.neutral[100],
                  borderRadius: theme.borderRadius.base,
                  marginBottom: theme.spacing[2]
                }}>
                  <Text style={{ 
                    fontSize: theme.fontSize.base,
                    fontWeight: theme.fontWeight.medium,
                    color: theme.colors.neutral[800]
                  }}>
                    {routine.title}
                  </Text>
                </View>
              ))}
              <Button
                title="+ Add Routine"
                onPress={() => console.log('Add routine pressed')}
                variant="secondary"
                size="sm"
              />
            </SectionCard>
          </View>

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