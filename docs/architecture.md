# Architecture Overview

## System Architecture

The ADHD Family Planner follows a **cross-platform, offline-first** architecture designed to support ADHD users' need for consistent access and reduced cognitive load.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   iOS Native    │    │  Android Native │    │   Web Browser   │
│  (React Native) │    │ (React Native)  │    │ (RN Web + PWA)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
         ┌─────────────────────────────────────────────────┐
         │           Shared Frontend Layer                 │
         │  • @adhd-planner/ui (Design System)            │
         │  • @adhd-planner/models (Data Models)          │
         │  • @adhd-planner/utils (Business Logic)        │
         └─────────────────────────────────────────────────┘
                                 │
         ┌─────────────────────────────────────────────────┐
         │              AWS Amplify                        │
         │  • DataStore (Offline-first sync)              │
         │  • AppSync (GraphQL API)                       │
         │  • Cognito (Authentication)                    │
         │  • Pinpoint (Push notifications)               │
         │  • S3 (File storage)                           │
         └─────────────────────────────────────────────────┘
```

## Key Architectural Decisions

### 1. Cross-Platform Strategy

**Decision**: React Native + Expo with React Native Web  
**Rationale**: 
- Single codebase reduces maintenance overhead
- ADHD users benefit from consistent UX across devices
- Expo provides reliable cross-platform APIs
- Web deployment enables TV Mode and broader accessibility

**Trade-offs**:
- ✅ Faster development and consistency
- ✅ Shared design system and business logic
- ❌ Some platform-specific optimizations limited
- ❌ Bundle size larger than native alternatives

### 2. Offline-First Architecture

**Decision**: AWS Amplify DataStore for local-first data management  
**Rationale**:
- ADHD users need reliable access regardless of connectivity
- Task completion satisfaction requires immediate feedback
- Reduces anxiety about losing progress during network issues

**Implementation**:
```typescript
// Optimistic updates with automatic sync
await DataStore.save(new Task({
  title: "Quick kitchen clean",
  timeEstimate: 5,
  status: TaskStatus.OPEN
}));
// ↑ Immediately available locally, syncs when connected
```

### 3. Multi-Tenancy via Household Model

**Decision**: Household-based data isolation with GraphQL authorization  
**Rationale**:
- Families need shared coordination without privacy breaches
- Co-parenting situations require clear data boundaries
- Role-based access supports child safety

**Schema Pattern**:
```graphql
type Task @auth(rules: [
  { allow: private, provider: userPools }
  { allow: groups, groups: ["household:{householdId}"] }
]) {
  householdId: ID! @index(name: "byHousehold")
  # ... other fields
}
```

## Data Flow Architecture

### 1. User Interaction Flow

```
User Action (tap checkbox)
         ↓
Component State Update (optimistic)
         ↓
DataStore.save() (local storage)
         ↓
Background Sync (when connected)
         ↓
AppSync Mutation (GraphQL)
         ↓
DynamoDB Update
         ↓
Real-time Subscriptions (other devices)
```

### 2. Offline-First Data Synchronization

```
Local DataStore ←→ AWS AppSync ←→ DynamoDB
      ↑                              ↑
   SQLite DB                   Multi-tenant
   (per device)                  Cloud DB
      ↑                              ↑
 Immediate Access              Household Sharing
```

**Conflict Resolution Strategy**:
- **Last-writer-wins** for most fields (acceptable for MVP)
- **Operational transformation** for collaborative editing (future)
- **Merge-friendly fields** (completion timestamps, notes appending)

### 3. Authentication & Authorization Flow

```
User Login → Cognito User Pool → JWT Token
    ↓
Household Membership Check
    ↓
GraphQL Requests with Authorization Headers
    ↓
AppSync Authorization Rules
    ↓
DynamoDB with RLS (Row-Level Security)
```

## Component Architecture

### 1. Design System Layer (`@adhd-planner/ui`)

**Philosophy**: ADHD-first component design with built-in accessibility

```typescript
// Every component supports ADHD-friendly patterns
<ChecklistItem
  timeEstimate={5}           // Time awareness
  isQuickWin={true}         // Quick win highlighting  
  onComplete={handleComplete} // Immediate feedback
  category="cleaning"        // Color coding
  accessibilityLabel="..."   // Screen reader support
/>
```

**Component Hierarchy**:
```
ThemeProvider (context)
├── Atoms (Button, Input, Checkbox)
├── Molecules (ChecklistItem, TimeIndicator, PillTag)  
├── Organisms (SectionCard, CalendarView, TaskList)
└── Templates (HomeScreen, RoutineScreen, TVMode)
```

### 2. State Management Strategy

**Local State**: React hooks for component-specific UI state  
**Global State**: Amplify DataStore for application data  
**Theme State**: React Context for design system  

```typescript
// Component-level state
const [isExpanded, setIsExpanded] = useState(false);

// Global application data
const tasks = useQuery(Task.createQuery());

// Theme system
const theme = useTheme();
```

### 3. Navigation Architecture

**React Navigation** with role-based screens:

```typescript
// Role-based navigation structure
const getScreensForRole = (role: MemberRole) => {
  switch (role) {
    case MemberRole.CHILD:
      return ['Today', 'MyTasks', 'Rewards']; // Simplified
    case MemberRole.PARENT_A:
    case MemberRole.PARENT_B:
      return ['Today', 'Tasks', 'Calendar', 'Family', 'Settings'];
    case MemberRole.ADMIN:
      return [...parentScreens, 'HouseholdSettings', 'UserManagement'];
  }
};
```

## Backend Architecture

### 1. AWS Amplify Services

**AppSync (GraphQL API)**:
- Real-time subscriptions for family coordination
- Offline mutation queuing
- Automatic conflict resolution
- Fine-grained authorization rules

**DataStore**:
- Local SQLite storage on each device
- Automatic background synchronization
- Optimistic updates for immediate UI feedback
- Cross-platform data model generation

**Cognito**:
- User authentication and session management
- Social login support (Google, Apple)
- Password recovery and email verification
- Multi-factor authentication (optional)

**Pinpoint**:
- Cross-platform push notifications
- Personalized reminder scheduling
- Analytics for notification effectiveness
- A/B testing for reminder optimization

### 2. Database Design

**DynamoDB** with careful modeling for:

**Household Isolation**:
```
PK: HOUSEHOLD#{householdId}
SK: TASK#{taskId}
GSI1PK: USER#{userId}
GSI1SK: DUE#{dueDate}
```

**Time-Based Queries**:
```
PK: HOUSEHOLD#{householdId}  
SK: DAY#{date}#TASK#{taskId}
# Enables efficient "today's tasks" queries
```

**Role-Based Access**:
```
PK: HOUSEHOLD#{householdId}
SK: MEMBER#{userId}
Attributes: { role, permissions, isActive }
```

### 3. Serverless Functions (Lambda)

**Notification Engine**:
```typescript
// Smart reminder scheduling
exports.scheduleReminders = async (event) => {
  const tasks = await getUpcomingTasks();
  
  for (const task of tasks) {
    const reminderTime = calculateOptimalReminderTime(
      task.dueTime,
      task.estimatedMinutes,
      user.preferences.reminderOffsets
    );
    
    await scheduleNotification({
      userId: task.assigneeId,
      message: `Time for: ${task.title} (${task.estimatedMinutes}m)`,
      scheduledFor: reminderTime,
      deepLink: `app://task/${task.id}`
    });
  }
};
```

**Routine Generation**:
```typescript
// Convert routines into recurring tasks
exports.generateRoutineTasks = async (event) => {
  const routines = await getActiveRoutines();
  
  for (const routine of routines) {
    const tasks = generateTasksFromRoutine(routine, {
      startDate: new Date(),
      cadence: routine.cadence,
      assigneeRotation: routine.assigneeRotation
    });
    
    await batchCreateTasks(tasks);
  }
};
```

## Security Architecture

### 1. Multi-Tenant Security

**Household Isolation**:
- All data partitioned by `householdId`
- GraphQL authorization rules enforce boundaries
- No cross-household data access possible

**Role-Based Permissions**:
```graphql
type Task @auth(rules: [
  # Household members can read
  { allow: groups, groups: ["household"] }
  # Only assignee and parents can update  
  { allow: owner, ownerField: "assigneeId" }
  { allow: groups, groups: ["parents"] }
]) {
  # fields...
}
```

### 2. Child Data Protection

**COPPA Compliance**:
- Parental consent required for children under 13
- Limited data collection for child accounts
- Parent access to all child account data
- Secure data deletion upon account termination

**Content Filtering**:
- Child accounts see filtered, age-appropriate content
- No external communication features for children
- Parent oversight of all child activities

### 3. Data Encryption

**At Rest**: All DynamoDB tables encrypted with AWS KMS  
**In Transit**: TLS 1.3 for all API communication  
**Local Storage**: SQLCipher for local DataStore encryption  
**Sensitive Data**: Additional field-level encryption for PII

## Performance Architecture

### 1. Offline Performance

**Local-First Strategy**:
- All reads from local SQLite database
- Writes immediately to local store
- Background sync when connected
- Intelligent prefetching based on usage patterns

**Bundle Optimization**:
```typescript
// Code splitting by platform and feature
const TVModeScreen = lazy(() => 
  Platform.OS === 'web' 
    ? import('./screens/TVModeScreen')
    : Promise.resolve({ default: () => null })
);
```

### 2. Real-Time Updates

**Selective Subscriptions**:
```typescript
// Only subscribe to relevant household data
const subscription = useSubscription(
  Task.createSubscription()
    .where(task => task.householdId.eq(currentHouseholdId))
    .where(task => task.dueAt.between(startOfDay, endOfDay))
);
```

**Optimistic Updates**:
```typescript
// Immediate UI feedback, background sync
const toggleTask = async (taskId: string) => {
  // Update UI immediately
  setTasks(prev => prev.map(task => 
    task.id === taskId 
      ? { ...task, completed: !task.completed }
      : task
  ));
  
  // Sync in background
  await DataStore.save(Task.copyOf(originalTask, updated => {
    updated.completed = !updated.completed;
    updated.completedAt = new Date().toISOString();
  }));
};
```

### 3. Caching Strategy

**GraphQL Query Caching**:
- Apollo Client normalized cache
- Cache invalidation on mutations
- Optimistic response patterns

**Asset Caching**:
- CDN distribution for static assets
- Service worker for web PWA
- Expo asset caching for mobile

## Monitoring & Observability

### 1. Application Monitoring

**AWS CloudWatch**:
- API latency and error rates
- DataStore sync performance
- Lambda function metrics
- Database performance insights

**User Experience Metrics**:
- Task completion rates by time estimate accuracy
- App launch time and responsiveness
- Offline usage patterns
- Feature adoption rates

### 2. ADHD-Specific Analytics

**Executive Function Support**:
- Time estimation accuracy over time
- Quick win completion rates
- Task abandonment patterns
- Optimal reminder timing analysis

**Accessibility Metrics**:
- Screen reader usage patterns
- Large text preference adoption
- Color contrast preference settings
- Voice control interaction rates

## Deployment Architecture

### 1. Environment Strategy

**Development** (`develop` branch):
- Amplify auto-deployment
- Shared development data
- Debug logging enabled
- Faster build pipeline

**Staging** (`release/*` branches):
- Production-like environment
- Isolated test data
- Performance testing
- User acceptance testing

**Production** (`main` branch):
- Blue-green deployment
- Health check monitoring
- Automatic rollback capability
- Zero-downtime deployments

### 2. CI/CD Pipeline

```yaml
# Quality Gates → Build → Test → Deploy → Monitor
Lint & TypeScript → Unit Tests → Integration Tests → E2E Tests
                ↓
        Platform Builds (iOS, Android, Web)
                ↓
        Security Scanning & Performance Tests
                ↓
        Environment-specific Deployment
                ↓
        Health Checks & Monitoring Setup
```

### 3. Scalability Considerations

**Database Scaling**:
- DynamoDB auto-scaling
- Global secondary indexes for complex queries
- Read replicas for high-traffic households

**API Scaling**:
- AppSync automatic scaling
- Lambda concurrent execution limits
- CloudFront CDN for global distribution

**Mobile App Distribution**:
- App Store / Google Play deployment
- Expo OTA updates for JavaScript changes
- Feature flags for gradual rollouts

## Migration Path to ECS/Fargate

While AWS Amplify provides excellent MVP capabilities, the architecture supports future migration to containerized infrastructure:

### Phase 1: Extract Business Logic
- Move complex Lambda functions to dedicated services
- Implement API Gateway + ALB routing
- Containerize notification and routine engines

### Phase 2: Database Migration
- Migrate from AppSync to direct GraphQL server
- Implement custom DataStore sync protocol
- Add Redis for caching and session management

### Phase 3: Container Orchestration
- Deploy GraphQL API on ECS Fargate
- Implement blue-green deployments
- Add comprehensive monitoring with Prometheus/Grafana

This migration path ensures the application can scale to enterprise levels while maintaining the ADHD-first user experience that makes it effective.