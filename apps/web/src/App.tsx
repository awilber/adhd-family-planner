import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ThemeProvider, Button, SectionCard, ChecklistItem } from '@adhd-planner/ui';
import { formatTimeEstimate, isQuickWin } from '@adhd-planner/utils';
import { allTasks, getQuickWinTasks, weeklyTasks, speedCleaningTasks, monthlyTasks, PlannerTask } from '@adhd-planner/models/src/plannerData';

const mockRoutines = [
  { id: '1', title: 'Morning Routine', category: 'personal' as const },
  { id: '2', title: 'Kitchen Cleanup', category: 'cleaning' as const },
  { id: '3', title: 'Evening Wind-down', category: 'personal' as const },
];

function App() {
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
    <ThemeProvider initialTheme="dark">
      {({ theme }) => (
        <ScrollView 
          style={{ flex: 1, backgroundColor: theme.colors.neutral[50] }}
          contentContainerStyle={{ padding: 8, minHeight: '100vh' }}
        >
          <View style={{ 
            maxWidth: 1400, 
            marginLeft: 'auto', 
            marginRight: 'auto'
          }}>
            {/* Header - Full Width */}
            <View style={{ marginBottom: 16, alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 36, 
                fontWeight: 'bold', 
                color: theme.colors.primary[500],
                marginBottom: 8,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                ADHD Family Planner
              </Text>
              <Text style={{ 
                fontSize: 18, 
                color: theme.colors.neutral[500],
                textAlign: 'center',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                Cross-platform family coordination designed ADHD-first
              </Text>
            </View>

            {/* Multi-column Layout Container */}
            <View style={{ 
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
              justifyContent: 'space-between'
            }}>
              {/* Quick Wins Section */}
              <View style={{ minWidth: 350, flex: 1, marginBottom: 8 }}>
                <SectionCard 
                  title="Quick Wins (≤5 min)" 
                  category="quick"
                  headerAction={
                    <Button 
                      title="Add Task" 
                      variant="quick-win" 
                      size="sm" 
                      onPress={() => console.log('Add quick win')}
                    />
                  }
                >
                  <View>
                    {quickWinTasks.map(task => (
                      <ChecklistItem
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                        timeEstimate={task.timeEstimate}
                        onToggle={handleTaskToggle}
                        onLongPress={handleTaskLongPress}
                      />
                    ))}
                    {quickWinTasks.length === 0 && (
                      <Text style={{ 
                        color: theme.colors.neutral[400], 
                        fontStyle: 'italic', 
                        textAlign: 'center',
                        padding: 16,
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}>
                        No quick wins available. Great job! 🎉
                      </Text>
                    )}
                  </View>
                </SectionCard>
              </View>

              {/* Daily Tasks Section */}
              <View style={{ minWidth: 350, flex: 1, marginBottom: 8 }}>
                <SectionCard 
                  title="Daily Tasks" 
                  category="cleaning"
                  headerAction={
                    <Button 
                      title="Add Task" 
                      variant="primary" 
                      size="sm" 
                      onPress={() => console.log('Add task')}
                    />
                  }
                >
                  <View>
                    {dailyTasks.slice(0, 8).map(task => (
                      <ChecklistItem
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                        timeEstimate={task.timeEstimate}
                        notes={task.timeEstimate && task.timeEstimate > 15 ? 'Consider breaking this into smaller steps' : undefined}
                        onToggle={handleTaskToggle}
                        onLongPress={handleTaskLongPress}
                      />
                    ))}
                  </View>
                </SectionCard>
              </View>

              {/* Weekly Kitchen Tasks Section */}
              <View style={{ minWidth: 350, flex: 1, marginBottom: 8 }}>
                <SectionCard 
                  title="Weekly Kitchen Tasks (Monday)" 
                  category="cleaning"
                  headerAction={
                    <Button 
                      title="Mark All Done" 
                      variant="secondary" 
                      size="sm" 
                      onPress={() => console.log('Mark all kitchen done')}
                    />
                  }
                >
                  <View>
                    {weeklyKitchenTasks.map(task => (
                      <ChecklistItem
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                        timeEstimate={task.timeEstimate}
                        onToggle={handleTaskToggle}
                        onLongPress={handleTaskLongPress}
                      />
                    ))}
                  </View>
                </SectionCard>
              </View>

              {/* Speed Cleaning Section */}
              <View style={{ minWidth: 350, flex: 1, marginBottom: 8 }}>
                <SectionCard 
                  title="Kitchen Speed Clean (5-10 mins)" 
                  category="quick"
                  headerAction={
                    <Button 
                      title="Start Timer" 
                      variant="quick-win" 
                      size="sm" 
                      onPress={() => console.log('Start speed clean timer')}
                    />
                  }
                >
                  <View>
                    {speedCleanTasks.slice(0, 6).map(task => (
                      <ChecklistItem
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                        timeEstimate={task.timeEstimate}
                        onToggle={handleTaskToggle}
                        onLongPress={handleTaskLongPress}
                      />
                    ))}
                  </View>
                </SectionCard>
              </View>

              {/* Monthly Kitchen Deep Clean */}
              <View style={{ minWidth: 350, flex: 1, marginBottom: 8 }}>
                <SectionCard 
                  title="Monthly Kitchen Deep Clean" 
                  category="notes"
                  headerAction={
                    <Button 
                      title="Schedule" 
                      variant="ghost" 
                      size="sm" 
                      onPress={() => console.log('Schedule monthly clean')}
                    />
                  }
                >
                  <View>
                    {monthlyKitchenTasks.map(task => (
                      <ChecklistItem
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                        timeEstimate={task.timeEstimate}
                        notes={task.timeEstimate && task.timeEstimate > 20 ? 'Schedule when you have dedicated time' : undefined}
                        onToggle={handleTaskToggle}
                        onLongPress={handleTaskLongPress}
                      />
                    ))}
                  </View>
                </SectionCard>
              </View>

              {/* Routines Section */}
              <View style={{ minWidth: 350, flex: 1, marginBottom: 8 }}>
                <SectionCard 
                  title="Daily Routines" 
                  category="schedule"
                >
                  <View>
                    {mockRoutines.map(routine => (
                      <View 
                        key={routine.id}
                        style={{ 
                          flexDirection: 'row', 
                          alignItems: 'center', 
                          padding: 12,
                          backgroundColor: theme.colors.neutral[100],
                          borderRadius: 8,
                          marginBottom: 8,
                          borderWidth: 1,
                          borderColor: theme.colors.neutral[200]
                        }}
                      >
                        <Text style={{ 
                          flex: 1, 
                          fontSize: 16, 
                          fontWeight: '500',
                          color: theme.colors.neutral[700],
                          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}>
                          {routine.title}
                        </Text>
                        <Button 
                          title="Start" 
                          variant="secondary" 
                          size="sm" 
                          onPress={() => console.log('Start routine:', routine.id)}
                        />
                      </View>
                    ))}
                  </View>
                </SectionCard>
              </View>

              {/* Design System Demo */}
              <View style={{ minWidth: 350, flex: 1, marginBottom: 8 }}>
                <SectionCard 
                  title="Design System Demo" 
                  category="notes"
                >
                  <View style={{ gap: 12 }}>
                    <View>
                      <Text style={{ 
                        fontSize: 18, 
                        fontWeight: '600', 
                        marginBottom: 8,
                        color: theme.colors.neutral[700],
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}>
                        Button Variants
                      </Text>
                      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                        <Button title="Primary" variant="primary" onPress={() => {}} />
                        <Button title="Secondary" variant="secondary" onPress={() => {}} />
                        <Button title="Ghost" variant="ghost" onPress={() => {}} />
                        <Button title="Quick Win" variant="quick-win" onPress={() => {}} />
                      </View>
                    </View>

                    <View>
                      <Text style={{ 
                        fontSize: 18, 
                        fontWeight: '600', 
                        marginBottom: 8,
                        color: theme.colors.neutral[700],
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}>
                        Time Estimates
                      </Text>
                      <View style={{ gap: 4 }}>
                        {[3, 8, 15, 30, 60].map(minutes => (
                          <Text 
                            key={minutes}
                            style={{ 
                              fontSize: 16,
                              color: theme.colors.neutral[600],
                              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                            }}
                          >
                            {minutes} minutes → {formatTimeEstimate(minutes)}
                          </Text>
                        ))}
                      </View>
                    </View>

                    <View>
                      <Text style={{ 
                        fontSize: 18, 
                        fontWeight: '600', 
                        marginBottom: 8,
                        color: theme.colors.neutral[700],
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}>
                        ADHD-Friendly Features
                      </Text>
                      <View style={{ gap: 4 }}>
                        <Text style={{ color: theme.colors.neutral[600], fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>• Large touch targets (44px minimum)</Text>
                        <Text style={{ color: theme.colors.neutral[600], fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>• Clear visual time estimates</Text>
                        <Text style={{ color: theme.colors.neutral[600], fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>• Quick-win highlighting</Text>
                        <Text style={{ color: theme.colors.neutral[600], fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>• Color-coded categories</Text>
                        <Text style={{ color: theme.colors.neutral[600], fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>• Generous spacing and contrast</Text>
                        <Text style={{ color: theme.colors.neutral[600], fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>• Immediate completion feedback</Text>
                      </View>
                    </View>
                  </View>
                </SectionCard>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </ThemeProvider>
  );
}

export default App;