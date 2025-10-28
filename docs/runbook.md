# Deployment & Operations Runbook

## Quick Reference

| Environment | Branch | URL | Status |
|-------------|--------|-----|--------|
| Development | `develop` | https://dev.adhd-planner.com | Auto-deploy |
| Staging | `release/*` | https://staging.adhd-planner.com | Manual approve |
| Production | `main` | https://adhd-planner.com | Manual approve |

## Initial Setup & Deployment

### Prerequisites

- AWS Account with appropriate permissions
- Amplify CLI installed and configured
- Node.js 18+ and pnpm 8+
- Expo CLI for mobile builds
- Domain name and SSL certificates

### First-Time Infrastructure Setup

#### 1. AWS Amplify Backend Initialization

```bash
# Clone repository
git clone <repo-url>
cd adhd-family-planner

# Install dependencies
pnpm install

# Initialize Amplify backend (development)
cd backend
amplify init

# Follow prompts:
# - Project name: adhd-family-planner-dev
# - Environment name: dev  
# - Default editor: Visual Studio Code
# - App type: javascript
# - Javascript framework: react-native
# - Source Directory Path: src
# - Distribution Directory Path: build
# - Build Command: npm run build
# - Start Command: npm start

# Deploy backend resources
amplify push

# Note the generated outputs:
# - GraphQL endpoint
# - Region
# - UserPool ID
# - IdentityPool ID
# - S3 bucket names
```

#### 2. Configure Environment Variables

Create environment files for each app:

```bash
# Mobile app environment
cat > apps/mobile/.env.local << EOF
EXPO_PUBLIC_AWS_REGION=us-east-1
EXPO_PUBLIC_USER_POOL_ID=us-east-1_XXXXXXXXX
EXPO_PUBLIC_USER_POOL_WEB_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXX
EXPO_PUBLIC_IDENTITY_POOL_ID=us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
EXPO_PUBLIC_GRAPHQL_ENDPOINT=https://XXXXXXXXXXXXXXXXXXXXXX.appsync-api.us-east-1.amazonaws.com/graphql
EXPO_PUBLIC_S3_BUCKET=adhdplanner-storage-XXXXXXXXX
EXPO_PUBLIC_ENVIRONMENT=development
EOF

# Web app environment  
cat > apps/web/.env.local << EOF
VITE_AWS_REGION=us-east-1
VITE_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_USER_POOL_WEB_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_IDENTITY_POOL_ID=us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
VITE_GRAPHQL_ENDPOINT=https://XXXXXXXXXXXXXXXXXXXXXX.appsync-api.us-east-1.amazonaws.com/graphql
VITE_S3_BUCKET=adhdplanner-storage-XXXXXXXXX
VITE_ENVIRONMENT=development
EOF
```

#### 3. Setup Push Notifications

```bash
# Add Amazon Pinpoint to Amplify project
amplify add notifications

# Choose:
# - Amazon Pinpoint
# - Configure for both iOS and Android
# - Enable in-app messaging

# Configure APNs (iOS)
# - Upload APNs certificate to Pinpoint console
# - Set bundle ID: com.adhdplanner.app

# Configure FCM (Android) 
# - Create Firebase project
# - Generate FCM server key
# - Add to Pinpoint console

amplify push
```

#### 4. Create Additional Environments

```bash
# Staging environment
amplify env add staging

# Production environment  
amplify env add production

# Deploy to each environment
amplify env checkout staging && amplify push
amplify env checkout production && amplify push
```

### GitHub Actions Setup

#### 1. Repository Secrets Configuration

Add these secrets to GitHub repository settings:

```bash
# AWS Credentials
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1

# Amplify App IDs (from Amplify console)
AMPLIFY_APP_ID_DEV=d1234567890
AMPLIFY_APP_ID_STAGING=d0987654321  
AMPLIFY_APP_ID_PROD=d1122334455

# Environment URLs
DEV_URL=https://dev.adhd-planner.com
STAGING_URL=https://staging.adhd-planner.com
PRODUCTION_URL=https://adhd-planner.com

# S3 Buckets for hosting (if using separate hosting)
S3_BUCKET_DEV=adhd-planner-dev-hosting
S3_BUCKET_STAGING=adhd-planner-staging-hosting
S3_BUCKET_PROD=adhd-planner-prod-hosting

# CloudFront Distribution IDs
CLOUDFRONT_ID_DEV=E123456789ABCD
CLOUDFRONT_ID_STAGING=E234567890BCDE
CLOUDFRONT_ID_PROD=E345678901CDEF

# Mobile app deployment
EXPO_TOKEN=your_expo_token_here

# Security scanning
SNYK_TOKEN=your_snyk_token_here
LHCI_GITHUB_APP_TOKEN=your_lighthouse_ci_token
```

#### 2. Domain and SSL Setup

```bash
# Configure custom domain in Amplify console
# or via CLI:

amplify add hosting

# Choose:
# - Amazon CloudFront and S3
# - Static hosting
# - Custom domain: adhd-planner.com

# Configure SSL certificate in AWS Certificate Manager
# - Request certificate for *.adhd-planner.com  
# - Validate via DNS
# - Associate with CloudFront distribution
```

## Deployment Procedures

### Standard Deployment Flow

#### Development Environment (Automatic)

```bash
# Push to develop branch triggers automatic deployment
git checkout develop
git pull origin develop
git merge feature/your-feature-name
git push origin develop

# Monitor deployment at:
# https://console.aws.amazon.com/amplify/
```

#### Staging Environment (Release Process)

```bash
# Create release branch
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# Update version numbers
npm version minor  # or patch/major

# Push release branch (triggers staging deployment)
git push origin release/v1.2.0

# Create PR to main branch for production deployment
# Include staging testing results in PR description
```

#### Production Environment (Manual Approval)

```bash
# After staging testing and PR approval
git checkout main
git merge release/v1.2.0
git tag v1.2.0
git push origin main --tags

# Monitor production deployment
# Verify health checks pass
# Run smoke tests against production
```

### Hotfix Deployment

```bash
# Critical production issues
git checkout main
git checkout -b hotfix/critical-auth-fix

# Make minimal fix
git commit -m "fix: resolve authentication timeout issue"

# Deploy to staging first for verification
git push origin hotfix/critical-auth-fix

# After verification, merge to main
git checkout main  
git merge hotfix/critical-auth-fix
git push origin main

# Tag the hotfix
git tag v1.2.1
git push origin --tags
```

### Mobile App Store Deployment

#### iOS App Store

```bash
# Build for iOS (triggered by production deployment)
cd apps/mobile
eas build --platform ios --non-interactive

# Submit to App Store (manual trigger after review)
eas submit --platform ios

# Monitor build status
eas build:list

# Check App Store Connect for review status
```

#### Google Play Store

```bash
# Build for Android
eas build --platform android --non-interactive

# Submit to Play Store  
eas submit --platform android

# Monitor Play Console for review status
```

## Environment Management

### Switching Between Environments

```bash
# View current environment
amplify env list

# Switch to specific environment
amplify env checkout development
amplify env checkout staging  
amplify env checkout production

# Pull latest backend changes
amplify pull
```

### Environment Configuration Differences

| Setting | Development | Staging | Production |
|---------|-------------|---------|------------|
| Log Level | DEBUG | INFO | WARN |
| Database | Shared dev data | Isolated test data | Live user data |
| Push Notifications | Console logging | Test APNs/FCM | Production APNs/FCM |
| Error Reporting | Local only | Sentry staging | Sentry production |
| Analytics | Disabled | Limited tracking | Full analytics |
| Feature Flags | All enabled | Release features | Stable features only |

### Database Management

#### Development Data Reset

```bash
# Reset development database with fresh seed data
amplify env checkout development

# Remove all existing data (GraphQL mutation)
mutation ClearDevelopmentData {
  clearAllData(confirm: "YES_CLEAR_DEV_DATA") {
    success
    message
  }
}

# Run seed data script
cd backend/functions/seedData
npm run seed:development
```

#### Production Data Backup

```bash
# Export production data (weekly backup)
aws dynamodb create-backup \
  --table-name Task-XXXXXXXXXXXXX \
  --backup-name "weekly-backup-$(date +%Y%m%d)"

# List existing backups
aws dynamodb list-backups --table-name Task-XXXXXXXXXXXXX

# Restore from backup (emergency only)
aws dynamodb restore-table-from-backup \
  --target-table-name Task-XXXXXXXXXXXXX-restore \
  --backup-arn arn:aws:dynamodb:us-east-1:123456789012:backup/XXXXX
```

### Monitoring & Health Checks

#### Application Health Endpoints

```bash
# Development
curl https://dev.adhd-planner.com/health
# Expected: {"status": "ok", "environment": "development", "version": "1.2.0"}

# Staging  
curl https://staging.adhd-planner.com/health
# Expected: {"status": "ok", "environment": "staging", "version": "1.2.0"}

# Production
curl https://adhd-planner.com/health  
# Expected: {"status": "ok", "environment": "production", "version": "1.2.0"}
```

#### GraphQL API Health

```bash
# Test GraphQL endpoint
curl -X POST https://xxxxx.appsync-api.us-east-1.amazonaws.com/graphql \
  -H "Content-Type: application/json" \
  -H "x-api-key: da2-xxxxxxxxxxxxxxxxxxxxx" \
  -d '{"query": "query { __typename }"}'

# Expected: {"data": {"__typename": "Query"}}
```

#### CloudWatch Metrics

Monitor these key metrics in AWS CloudWatch:

- **API Latency**: AppSync request duration
- **Error Rate**: 4xx/5xx response percentages  
- **Database Performance**: DynamoDB consumed capacity
- **Lambda Duration**: Function execution times
- **DataStore Sync**: Sync success/failure rates

## Troubleshooting Guide

### Common Deployment Issues

#### 1. Amplify Build Failures

**Symptom**: CI/CD pipeline fails at build step

```bash
# Debug build locally
cd backend
amplify status
amplify push --debug

# Check for common issues:
# - Missing environment variables
# - GraphQL schema syntax errors
# - Resource name conflicts
# - IAM permission issues
```

**Resolution Steps**:
1. Verify all environment variables are set
2. Check CloudFormation stack events in AWS console
3. Ensure GraphQL schema is valid
4. Verify IAM roles have required permissions

#### 2. DataStore Sync Issues  

**Symptom**: Data not syncing between devices

```bash
# Check AppSync API status
aws appsync get-graphql-api --api-id XXXXXXXXXXXXXXXXXXXXXX

# Verify DataStore configuration
grep -r "DataStore" apps/mobile/src/
grep -r "amplify" apps/mobile/src/
```

**Resolution Steps**:
1. Clear DataStore cache: `DataStore.clear()`
2. Regenerate models: `amplify codegen models`
3. Check network connectivity
4. Verify authentication tokens are valid

#### 3. Push Notification Failures

**Symptom**: Notifications not delivered

```bash
# Test Pinpoint configuration
aws pinpoint get-app --application-id XXXXXXXXXXXXXXXXXXXXXXXX

# Check notification endpoint registration
aws pinpoint get-endpoints --application-id XXXXX --user-id USER_ID
```

**Resolution Steps**:
1. Verify APNs certificates are valid and uploaded
2. Check FCM server key configuration
3. Ensure device tokens are properly registered
4. Test with Pinpoint console's test message feature

#### 4. Authentication Issues

**Symptom**: Users cannot sign in or session expires unexpectedly

```bash
# Check Cognito User Pool configuration
aws cognito-idp describe-user-pool --user-pool-id us-east-1_XXXXXXXXX

# Verify app client settings
aws cognito-idp describe-user-pool-client \
  --user-pool-id us-east-1_XXXXXXXXX \
  --client-id XXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Resolution Steps**:
1. Verify User Pool domain and callback URLs
2. Check app client OAuth flow configuration
3. Ensure JWT token validation is working
4. Test authentication flow manually

### Performance Issues

#### 1. Slow App Launch

**Diagnostics**:
```bash
# Profile bundle size
cd apps/mobile
npx expo customize metro.config.js
# Add bundle analyzer

# Profile React Native performance
npx flipper
```

**Optimizations**:
- Enable Hermes JavaScript engine
- Implement code splitting for large features
- Optimize image assets and use appropriate formats
- Remove unused dependencies

#### 2. Slow Database Queries

**Diagnostics**:
```bash
# Enable AppSync query logging
aws appsync put-graphql-api \
  --api-id XXXXXXXXXXXXXXXXXXXXXX \
  --log-config '{"cloudWatchLogsRoleArn":"arn:aws:iam::123456789012:role/service-role/AppSyncServiceRole","fieldLogLevel":"ALL"}'
```

**Optimizations**:
- Add appropriate GSI indexes for query patterns
- Implement pagination for large result sets
- Use DataStore predicates to filter locally
- Cache frequently accessed data

### Rollback Procedures

#### Application Rollback

```bash
# Revert to previous Git commit
git checkout main
git log --oneline -10  # Find last good commit
git revert <commit-hash>
git push origin main

# Or rollback Amplify environment
amplify env checkout production
amplify env list  # Shows deployment history
amplify env pull --restore-from-backup
```

#### Database Rollback

```bash
# Restore from automated backup (within 35 days)
aws dynamodb restore-table-from-backup \
  --target-table-name Task-XXXXXXXXXXXXX-restored \
  --backup-arn arn:aws:dynamodb:us-east-1:123456789012:backup/XXXXX

# Point-in-time recovery (if enabled)
aws dynamodb restore-table-to-point-in-time \
  --source-table-name Task-XXXXXXXXXXXXX \
  --target-table-name Task-XXXXXXXXXXXXX-recovered \
  --restore-date-time 2023-06-01T12:00:00.000Z
```

### Emergency Procedures

#### 1. Complete Service Outage

**Immediate Actions** (within 15 minutes):
1. Check AWS Service Health Dashboard
2. Verify domain/DNS configuration
3. Check CloudFront distribution status
4. Examine CloudWatch alarms and metrics

**Communication**:
1. Update status page: status.adhd-planner.com
2. Post to Twitter/social media channels
3. Send email to critical users
4. Update in-app banner (if app is partially functional)

#### 2. Data Breach Response

**Immediate Actions** (within 30 minutes):
1. Isolate affected systems
2. Preserve forensic evidence
3. Assess scope of breach
4. Notify security team and legal counsel

**User Communication** (within 72 hours):
1. Prepare incident report
2. Notify affected users via email
3. Provide steps for users to secure accounts
4. Coordinate with regulatory requirements

#### 3. Critical Security Vulnerability

**Assessment** (within 2 hours):
1. Determine severity and exploitability
2. Check if vulnerability is actively exploited
3. Identify affected versions and environments
4. Prepare security patch

**Deployment** (expedited process):
1. Create hotfix branch with security fix
2. Deploy to staging for immediate testing
3. Deploy to production via emergency approval
4. Monitor for successful fix deployment

## Maintenance Procedures

### Regular Maintenance Tasks

#### Weekly Tasks
- [ ] Review CloudWatch metrics and alarms
- [ ] Check automated backup status
- [ ] Review error logs and fix non-critical issues
- [ ] Update dependencies with security patches
- [ ] Monitor app store reviews and feedback

#### Monthly Tasks  
- [ ] Review and rotate API keys/certificates
- [ ] Analyze performance metrics and optimize
- [ ] Review and update documentation
- [ ] Conduct security audit of new features
- [ ] Review and prune unused AWS resources

#### Quarterly Tasks
- [ ] Full security penetration testing
- [ ] Disaster recovery testing
- [ ] Review and update incident response procedures
- [ ] Capacity planning and scaling assessment
- [ ] User feedback analysis and feature planning

### Automation Scripts

#### Health Check Script

```bash
#!/bin/bash
# health-check.sh - Automated health monitoring

check_endpoint() {
    local url=$1
    local expected_status=$2
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$response" -eq "$expected_status" ]; then
        echo "✅ $url - Status: $response"
    else
        echo "❌ $url - Status: $response (expected: $expected_status)"
        return 1
    fi
}

echo "Checking ADHD Family Planner health..."

check_endpoint "https://adhd-planner.com/health" 200
check_endpoint "https://staging.adhd-planner.com/health" 200  
check_endpoint "https://dev.adhd-planner.com/health" 200

# Check GraphQL endpoint
check_endpoint "https://xxxxx.appsync-api.us-east-1.amazonaws.com/graphql" 400

echo "Health check completed."
```

#### Backup Verification Script

```bash
#!/bin/bash
# backup-verify.sh - Verify database backups exist

TABLES=("Task" "User" "Household" "Event" "Message")

for table in "${TABLES[@]}"; do
    echo "Checking backups for $table..."
    
    aws dynamodb list-backups \
        --table-name "$table-XXXXXXXXXXXXX" \
        --max-items 5 \
        --output table
done
```

### Contact Information

#### On-Call Rotation
- **Primary**: [Name] - [Phone] - [Email]
- **Secondary**: [Name] - [Phone] - [Email]  
- **Escalation**: [Name] - [Phone] - [Email]

#### Emergency Contacts
- **AWS Support**: [Case URL/Phone]
- **Domain Registrar**: [Support contact]
- **CDN Provider**: [Support contact]
- **Legal/Compliance**: [Contact info]

#### Service Vendors
- **Error Monitoring**: Sentry - [Account details]
- **Analytics**: [Provider] - [Account details]
- **Security Scanning**: Snyk - [Account details]
- **Performance Monitoring**: [Provider] - [Account details]

---

**Last Updated**: [Date]  
**Next Review**: [Date + 3 months]  
**Document Owner**: [Team/Person]