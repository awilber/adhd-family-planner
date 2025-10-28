# ADHD Family Planner

A cross-platform ADHD-centric family coordination app built with React Native + Expo, AWS Amplify, and a focus on reducing time blindness and task initiation barriers.

## 🎯 Key Features

- **ADHD-First Design**: Time estimates, quick-wins, visual progress tracking
- **Family Coordination**: Shared calendar, role-based views, timestamped communication
- **Cross-Platform**: iOS, Android, Web, TV Mode (read-only large display)
- **Offline-First**: Works without internet, syncs when connected
- **Customizable**: DB-driven layouts, themes, and categories

## 🏗️ Architecture

```
Frontend: React Native + Expo + React Native Web (TypeScript)
Backend: AWS Amplify (AppSync GraphQL + Cognito Auth + S3)
Notifications: Amazon Pinpoint (APNs/FCM)
Hosting: AWS Amplify CI/CD
Testing: Jest + React Native Testing Library
```

## 📁 Monorepo Structure

```
/
├── apps/
│   ├── mobile/          # Expo React Native app
│   └── web/             # Expo React Native Web app
├── packages/
│   ├── ui/              # Design system components
│   ├── models/          # Generated types & data access
│   └── utils/           # Shared utilities
├── backend/
│   ├── amplify/         # AWS infrastructure
│   └── functions/       # Lambda functions
├── .github/workflows/   # CI/CD pipelines
└── docs/               # Architecture & planning docs
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm or yarn
- Expo CLI
- AWS Amplify CLI

### Installation

```bash
# Clone and install dependencies
git clone <repo-url>
cd adhd-family-planner
pnpm install

# Initialize Amplify backend
cd backend
amplify init
amplify push

# Start development servers
pnpm dev:mobile  # Expo dev server
pnpm dev:web     # Web dev server
```

### Environment Setup

1. Copy `.env.example` to `.env.local` in each app
2. Configure AWS Amplify environment variables
3. Set up push notification credentials (APNs/FCM)

## 🧪 Testing

```bash
pnpm test          # Run all tests
pnpm test:unit     # Unit tests only
pnpm test:e2e      # End-to-end tests
pnpm lint          # ESLint + Prettier
pnpm typecheck     # TypeScript validation
```

## 📱 Platform Support

- **iOS**: Native app via Expo
- **Android**: Native app via Expo  
- **Web**: Desktop/tablet browser via React Native Web
- **TV Mode**: Large display read-only view

## 🎨 Design System

The design system is extracted from ADHD-friendly planner templates featuring:
- Warm, calming color palette
- Time-based task organization
- Visual progress tracking
- Clear categorization with color coding

See `packages/ui/` for component library and `docs/design-tokens.md` for full token specification.

## 🔄 Deployment

### Development
- **Branch**: `develop` → Auto-deploy to dev environment

### Staging  
- **Branch**: `release/*` → Auto-deploy to staging environment

### Production
- **Branch**: `main` → Auto-deploy to production environment

All deployments use AWS Amplify CI/CD with automated testing gates.

## 📚 Documentation

- [Architecture Overview](docs/architecture.md)
- [Design Tokens](docs/design-tokens.md)
- [Deployment Runbook](docs/runbook.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Project Backlog](docs/planning/backlog.md)

## 🏃‍♂️ Development Workflow

This project uses Git Flow:
- `main`: Production releases
- `develop`: Integration branch
- `feature/*`: New features
- `release/*`: Release preparation
- `hotfix/*`: Critical fixes

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed workflow and PR guidelines.

## 📞 Support

For ADHD-specific design decisions and accessibility considerations, see our [ADHD Design Guidelines](docs/adhd-design-guidelines.md).

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.