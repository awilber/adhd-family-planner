export interface ReminderSettings {
  enabled: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  defaultTimes: string[];
}

export const defaultReminderSettings: ReminderSettings = {
  enabled: true,
  quietHoursStart: '22:00',
  quietHoursEnd: '08:00',
  defaultTimes: ['09:00', '14:00', '18:00'],
};

export const isQuietHours = (settings: ReminderSettings): boolean => {
  if (!settings.quietHoursStart || !settings.quietHoursEnd) return false;
  
  const now = new Date();
  const currentTime = now.getHours() * 100 + now.getMinutes();
  const quietStart = parseInt(settings.quietHoursStart.replace(':', ''));
  const quietEnd = parseInt(settings.quietHoursEnd.replace(':', ''));
  
  if (quietStart > quietEnd) {
    // Quiet hours span midnight
    return currentTime >= quietStart || currentTime <= quietEnd;
  } else {
    return currentTime >= quietStart && currentTime <= quietEnd;
  }
};