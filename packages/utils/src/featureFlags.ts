export interface FeatureFlags {
  gamification: boolean;
  kidMode: boolean;
  aiNudges: boolean;
  executiveFunctionTagging: boolean;
  tvMode: boolean;
}

export const defaultFeatureFlags: FeatureFlags = {
  gamification: false,      // Future feature
  kidMode: false,          // Future feature
  aiNudges: false,         // Future feature
  executiveFunctionTagging: false, // Future feature
  tvMode: true,            // Available in MVP
};

export const getFeatureFlag = (flag: keyof FeatureFlags): boolean => {
  // In a real app, this would read from environment variables or API
  return defaultFeatureFlags[flag];
};

export const isFeatureEnabled = (flag: keyof FeatureFlags): boolean => {
  return getFeatureFlag(flag);
};