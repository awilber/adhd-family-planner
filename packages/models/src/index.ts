// Placeholder for generated GraphQL models
// These will be generated from the GraphQL schema in backend/amplify

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Household {
  id: string;
  name: string;
  adminUserId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  householdId: string;
  title: string;
  completed: boolean;
  timeEstimate?: number;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Routine {
  id: string;
  householdId: string;
  title: string;
  description?: string;
  cadence: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  isQuickWin: boolean;
  createdAt: string;
  updatedAt: string;
}

// Re-export for convenience
export * from './types';
export * from './queries';