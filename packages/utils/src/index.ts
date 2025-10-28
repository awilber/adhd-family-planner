// Date and time utilities for ADHD time management
export * from './time';
export * from './notifications';
export * from './featureFlags';

// ADHD-specific helper functions
export const isQuickWin = (timeEstimate?: number): boolean => {
  return timeEstimate !== undefined && timeEstimate <= 5;
};

export const getTimeCategory = (timeEstimate?: number): 'quick' | 'medium' | 'long' => {
  if (!timeEstimate) return 'medium';
  if (timeEstimate <= 5) return 'quick';
  if (timeEstimate <= 15) return 'medium';
  return 'long';
};

export const formatTimeEstimate = (minutes?: number): string => {
  if (!minutes) return '';
  if (minutes <= 5) return '≤5 min';
  if (minutes <= 15) return `${minutes} min`;
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};