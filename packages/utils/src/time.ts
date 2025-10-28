import { format, addMinutes, startOfDay, endOfDay } from 'date-fns';

export const formatTimeForADHD = (date: Date): string => {
  return format(date, 'h:mm a');
};

export const getTodayRange = () => {
  const now = new Date();
  return {
    start: startOfDay(now),
    end: endOfDay(now),
  };
};

export const addTimeEstimate = (startTime: Date, minutes: number): Date => {
  return addMinutes(startTime, minutes);
};

export const getTimeOfDayLabel = (hour: number): string => {
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
};