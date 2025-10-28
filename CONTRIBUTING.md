# Contributing to ADHD Family Planner

Thank you for your interest in contributing to the ADHD Family Planner! This guide will help you get started with development and ensure your contributions align with our ADHD-first design principles.

## 🎯 Project Mission

This app is designed **ADHD-first** to support executive function, reduce time blindness, and minimize task initiation barriers. Every feature should consider:
- **Cognitive load reduction**
- **Visual clarity and progress tracking**
- **Time awareness and estimation**
- **Quick wins and momentum building**
- **Family coordination without overwhelm**

## 🏗️ Development Setup

### Prerequisites

- **Node.js 18+**
- **pnpm 8+** (required for monorepo)
- **Expo CLI** for mobile development
- **AWS Amplify CLI** for backend
- **Git** with Git Flow workflow knowledge

### Initial Setup

```bash
# Clone the repository
git clone <repo-url>
cd adhd-family-planner

# Install dependencies
pnpm install

# Setup git hooks
pnpm postinstall

# Initialize Amplify backend (first time only)
cd backend
amplify init
amplify push
cd ..

# Start development servers
pnpm dev          # Both mobile and web
pnpm dev:mobile   # Mobile only (Expo)
pnpm dev:web      # Web only
```

### Environment Configuration

1. Copy environment templates:
```bash
cp apps/mobile/.env.example apps/mobile/.env.local
cp apps/web/.env.example apps/web/.env.local
```

2. Configure AWS credentials and app-specific variables
3. Set up push notification credentials (APNs/FCM)

## 🌿 Git Workflow (Git Flow)

We use Git Flow for branch management:

### Branch Types

- **`main`**: Production releases only
- **`develop`**: Integration branch for development
- **`feature/*`**: New features (`feature/checklist-time-estimates`)
- **`release/*`**: Release preparation (`release/v1.2.0`)
- **`hotfix/*`**: Critical production fixes (`hotfix/auth-security-patch`)

### Starting New Work

```bash
# Start a new feature
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Work on your feature
git add .
git commit -m "feat: add time estimation to ChecklistItem component"

# Push and create PR to develop
git push origin feature/your-feature-name
```

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(ui): add time estimation indicators to task items
fix(auth): resolve household invitation email bug
docs(readme): update installation instructions
style(button): improve focus states for accessibility
refactor(api): simplify task creation mutation
test(checklist): add unit tests for completion logic
chore(deps): update react-native to 0.72.3
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`  
**Scopes**: `ui`, `auth`, `tasks`, `calendar`, `notifications`, `sync`, `api`

## 🎨 Design System Guidelines

### ADHD-First Design Principles

1. **High Contrast**: Minimum 4.5:1 ratio for text
2. **Large Touch Targets**: 44px minimum, 56px preferred
3. **Clear Visual Hierarchy**: Obvious size and weight differences
4. **Generous Spacing**: Prevent overwhelm with whitespace
5. **Time Awareness**: Always show estimates and progress
6. **Quick Wins**: Prominently feature ≤5 minute tasks

### Using the Design System

```tsx
import { Button, SectionCard, ChecklistItem, useTheme } from '@adhd-planner/ui';

// Always use theme tokens
const theme = useTheme();
const customStyle = {
  padding: theme.spacing[4],
  borderRadius: theme.borderRadius.lg,
  backgroundColor: theme.colors.primary[50],
};

// Prefer design system components
<Button 
  variant="quick-win" 
  timeEstimate="3 min"
  onPress={handleQuickTask}
>
  Quick Clean Kitchen
</Button>
```

### Color Usage Guidelines

- **Primary (coral/peach)**: Active tasks, primary actions
- **Secondary (calm blue)**: Scheduled items, secondary actions  
- **Categories**: Consistent color coding (cleaning=coral, schedule=blue)
- **Status**: Green=success, Yellow=warning, Red=error
- **Quick wins**: Always use `categories.quick` (green)

## 🧪 Testing Standards

### Required Tests

Every PR must include:

- **Unit tests** for new functions/components (>80% coverage)
- **Integration tests** for API interactions
- **Accessibility tests** for UI components
- **Cross-platform tests** (iOS, Android, Web)

### Running Tests

```bash
pnpm test              # All tests
pnpm test:unit         # Unit tests only  
pnpm test:integration  # Integration tests
pnpm test:e2e          # End-to-end tests
pnpm lint              # Linting and formatting
pnpm typecheck         # TypeScript validation
```

### Writing ADHD-Friendly Tests

Focus on user scenarios that matter for ADHD:

```tsx
describe('ChecklistItem', () => {
  it('should prominently display time estimates for planning', () => {
    render(<ChecklistItem timeEstimate={3} title="Quick task" />);
    expect(screen.getByText('≤5 min')).toBeVisible();
  });

  it('should provide immediate completion feedback', () => {
    const { user } = render(<ChecklistItem title="Test task" />);
    user.press(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
    // Should see completion animation/feedback
  });
});
```

## 📝 Code Standards

### TypeScript

- **Strict mode enabled**: No `any` types
- **Interface over type**: Use interfaces for object shapes
- **Explicit return types**: For public functions
- **Descriptive names**: `timeEstimateMinutes` not `time`

```tsx
interface TaskCreationProps {
  title: string;
  timeEstimateMinutes?: number;
  category: CategoryKey;
  onSave: (task: TaskInput) => Promise<void>;
}

const createTask = async (input: TaskInput): Promise<Task> => {
  // Implementation
};
```

### React/React Native

- **Functional components** with hooks
- **Descriptive prop names**: `isQuickWin` not `quick`
- **Accessibility props**: Always include `testID`, `accessibilityLabel`
- **Performance**: Use `useMemo`/`useCallback` for expensive operations

```tsx
const ChecklistItem: React.FC<ChecklistItemProps> = ({
  title,
  timeEstimateMinutes,
  isCompleted,
  onToggle,
}) => {
  const handlePress = useCallback(() => {
    onToggle();
    // Haptic feedback for completion satisfaction
    if (!isCompleted) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [isCompleted, onToggle]);

  return (
    <TouchableOpacity
      testID={`checklist-item-${title}`}
      accessibilityLabel={`${title}, ${isCompleted ? 'completed' : 'not completed'}`}
      onPress={handlePress}
    >
      {/* Component content */}
    </TouchableOpacity>
  );
};
```

### Performance Guidelines

- **Optimize for ADHD attention spans**: Fast loading, immediate feedback
- **Minimize bundle size**: Tree-shake unused code
- **Efficient renders**: Avoid unnecessary re-renders
- **Offline-first**: Always consider disconnected state

## 🔐 Security & Privacy

### Data Protection

- **No secrets in code**: Use environment variables
- **Child data protection**: COPPA compliance required
- **Household isolation**: Test multitenancy thoroughly
- **Auth tokens**: Secure storage and rotation

### GraphQL Security

```graphql
type Task @auth(rules: [
  { allow: private, provider: userPools }
  { allow: owner, ownerField: "householdId", operations: [read, update] }
]) {
  # Ensure household-based isolation
}
```

## 🚀 Pull Request Process

### Before Submitting

1. **Run all checks**: `pnpm lint && pnpm typecheck && pnpm test`
2. **Test on devices**: iOS, Android, and web browser
3. **Accessibility audit**: Screen reader, keyboard navigation
4. **ADHD user testing**: Does it reduce or increase cognitive load?

### PR Template

```markdown
## Description
Brief description of changes and ADHD-specific benefits.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## ADHD Impact Assessment
- [ ] Reduces cognitive load
- [ ] Improves time awareness
- [ ] Supports executive function
- [ ] Enhances visual clarity
- [ ] Maintains or improves accessibility

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Cross-platform testing completed
- [ ] Accessibility testing completed
- [ ] Manual ADHD user scenarios tested

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated (if needed)
- [ ] No console.log statements
- [ ] TypeScript strict mode compliance
```

### Review Process

1. **Automated checks** must pass (CI/CD pipeline)
2. **Code review** by maintainer
3. **ADHD accessibility review** for UI changes  
4. **Security review** for auth/data changes
5. **Performance review** for optimization impact

## 🎯 Feature Guidelines

### ADHD-First Feature Development

When implementing new features, always consider:

#### Executive Function Support
- **Working Memory**: Minimize steps, show progress
- **Planning**: Time estimates, step breakdowns
- **Organization**: Clear categorization, visual grouping
- **Attention**: Reduce distractions, highlight priorities
- **Time Management**: Visual timers, deadlines, estimates
- **Self-Regulation**: Gentle reminders, positive feedback
- **Cognitive Flexibility**: Multiple view options, customization
- **Impulse Control**: Confirmation steps, undo options

#### Time Blindness Mitigation
- Always show time estimates
- Use visual time indicators (color-coded)
- Provide countdown timers for timed tasks
- Show "time since started" for long tasks
- Highlight quick wins (≤5 minutes)

#### Task Initiation Support
- Break large tasks into small steps
- Show "next action" clearly
- Provide templates and examples
- Reduce decision fatigue with smart defaults
- Celebrate completion immediately

## 🐛 Bug Report Guidelines

When reporting bugs, include:

### ADHD-Specific Context
- **Task complexity** when bug occurred
- **Time of day** (energy levels matter)
- **Distraction level** of environment
- **Stress/overwhelm state** of user
- **Device/platform** used

### Technical Details
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots/videos** (very helpful for UI issues)
- **Console logs** (if applicable)
- **Device/browser versions**

## 🎨 Accessibility Standards

### WCAG 2.1 AA Compliance

- **Color contrast**: 4.5:1 for normal text, 3:1 for large text
- **Touch targets**: 44px minimum for interactive elements
- **Focus indicators**: Visible and high-contrast
- **Screen reader**: All content accessible via assistive technology
- **Keyboard navigation**: All functionality available without mouse

### ADHD-Specific Accessibility

- **Large text options**: Support system font scaling
- **Reduced motion**: Respect `prefers-reduced-motion`
- **High contrast mode**: Test with system accessibility settings
- **Voice control**: Ensure voice navigation works
- **Simplified UI mode**: "Low stimulation" theme available

## 📚 Resources

### ADHD Understanding
- [ADDitude Magazine](https://www.additudemag.com/) - ADHD insights
- [How to ADHD YouTube](https://www.youtube.com/channel/UC-nPM1_kSZf91ZGkcgy_95Q) - Educational content
- [Russell Barkley lectures](https://www.youtube.com/user/RussellBarkleyPhD) - Scientific foundation

### Technical Resources
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Design Resources
- [Design System Documentation](./docs/design-tokens.md)
- [Component Library Storybook](http://localhost:6006) (when running locally)
- [Figma Design Files](https://figma.com/...) (if available)

## 🤝 Code of Conduct

### Our Commitment

We are committed to providing a welcoming, inclusive environment for everyone, with special sensitivity to:

- **Neurodivergent perspectives**: ADHD, autism, dyslexia, etc.
- **Family diversity**: Single parents, co-parents, blended families
- **Technical skill levels**: Welcome both experts and newcomers
- **Communication styles**: Direct communication is valued and safe

### Expected Behavior

- **Be respectful** of different ADHD experiences and coping strategies
- **Be patient** with questions and learning processes
- **Provide constructive feedback** with specific, actionable suggestions
- **Assume positive intent** in communications
- **Support accessibility** and inclusive design practices

### Unacceptable Behavior

- Dismissing ADHD as "not real" or "just an excuse"
- Suggesting harmful "treatments" or unsolicited medical advice
- Discriminating against any user group or family structure
- Harassment, trolling, or inflammatory language
- Publishing private information without consent

## 📞 Getting Help

### Technical Support
- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and community support
- **Discord/Slack**: Real-time development chat (if available)

### ADHD-Specific Guidance
- **User Experience Questions**: Tag with `adhd-ux` label
- **Accessibility Issues**: Tag with `accessibility` label
- **Feature Requests**: Use ADHD impact assessment template

### Emergency Contact
For security issues or code of conduct violations:
- **Security**: email security@[domain] (do not file public issues)
- **Conduct**: email conduct@[domain] for private reporting

---

## 🎉 Recognition

Contributors who demonstrate exceptional understanding of ADHD needs and accessibility will be highlighted in our:

- **README Contributors Section**
- **Release Notes**: Special recognition for ADHD-focused improvements
- **Community Spotlights**: Regular highlighting of inclusive contributions

Thank you for helping build a tool that truly serves the ADHD community! 🧠✨