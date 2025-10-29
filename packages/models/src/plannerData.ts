// Task data extracted from the original planner screenshots
// This simulates what would come from the database

export interface PlannerTask {
  id: string;
  title: string;
  category: 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'quarterly' | 'room-based';
  timeEstimate?: number; // minutes
  completed: boolean;
  day?: string; // for daily/weekly tasks
  season?: string; // for seasonal tasks
  room?: string; // for room-based tasks
  isQuickWin?: boolean;
}

// From Weekly Cleaning Schedule (Image 1)
export const weeklyTasks: PlannerTask[] = [
  // Monday - Kitchen
  { id: 'w1', title: 'Clean sink', category: 'weekly', timeEstimate: 3, completed: false, day: 'Monday', room: 'Kitchen' },
  { id: 'w2', title: 'Clean stovetop', category: 'weekly', timeEstimate: 5, completed: false, day: 'Monday', room: 'Kitchen' },
  { id: 'w3', title: 'Clean kitchen table', category: 'weekly', timeEstimate: 3, completed: false, day: 'Monday', room: 'Kitchen' },
  { id: 'w4', title: 'Clean microwave', category: 'weekly', timeEstimate: 4, completed: false, day: 'Monday', room: 'Kitchen' },
  { id: 'w5', title: 'Wipe appliances', category: 'weekly', timeEstimate: 5, completed: false, day: 'Monday', room: 'Kitchen' },
  { id: 'w6', title: 'Wipe fridge', category: 'weekly', timeEstimate: 3, completed: false, day: 'Monday', room: 'Kitchen' },
  { id: 'w7', title: 'Sweep & mop', category: 'weekly', timeEstimate: 8, completed: false, day: 'Monday', room: 'Kitchen' },
  { id: 'w8', title: 'Empty trash bin', category: 'weekly', timeEstimate: 2, completed: false, day: 'Monday', room: 'Kitchen' },
  
  // Daily Tasks
  { id: 'd1', title: 'Make bed', category: 'daily', timeEstimate: 2, completed: false, isQuickWin: true },
  { id: 'd2', title: 'Empty trash', category: 'daily', timeEstimate: 3, completed: true, isQuickWin: true },
  { id: 'd3', title: 'Do dishes', category: 'daily', timeEstimate: 8, completed: false },
  { id: 'd4', title: 'Clean sweep kitchen', category: 'daily', timeEstimate: 5, completed: false, isQuickWin: true },
  { id: 'd5', title: 'One load of laundry', category: 'daily', timeEstimate: 5, completed: false, isQuickWin: true },
  { id: 'd6', title: 'Sanitize countertops', category: 'daily', timeEstimate: 3, completed: false, isQuickWin: true },
  { id: 'd7', title: 'Sort mail', category: 'daily', timeEstimate: 4, completed: true, isQuickWin: true },
  { id: 'd8', title: 'Clean living room', category: 'daily', timeEstimate: 10, completed: false },
  { id: 'd9', title: 'Organize pillows', category: 'daily', timeEstimate: 2, completed: false, isQuickWin: true },
  
  // Tuesday - Living Room
  { id: 'w10', title: 'Vacuum & mop floor', category: 'weekly', timeEstimate: 12, completed: false, day: 'Tuesday', room: 'Living Room' },
  { id: 'w11', title: 'Dust electronics', category: 'weekly', timeEstimate: 6, completed: false, day: 'Tuesday', room: 'Living Room' },
  { id: 'w12', title: 'Dust & wipe furniture', category: 'weekly', timeEstimate: 10, completed: false, day: 'Tuesday', room: 'Living Room' },
  { id: 'w13', title: 'Declutter', category: 'weekly', timeEstimate: 8, completed: false, day: 'Tuesday', room: 'Living Room' },
  { id: 'w14', title: 'Spot clean stains', category: 'weekly', timeEstimate: 5, completed: false, day: 'Tuesday', room: 'Living Room' },
  { id: 'w15', title: 'Arrange furniture', category: 'weekly', timeEstimate: 10, completed: false, day: 'Tuesday', room: 'Living Room' },
  { id: 'w16', title: 'Organize entertainment center', category: 'weekly', timeEstimate: 8, completed: false, day: 'Tuesday', room: 'Living Room' },
  { id: 'w17', title: 'Organize shelving', category: 'weekly', timeEstimate: 12, completed: false, day: 'Tuesday', room: 'Living Room' },
  
  // Wednesday - Bedrooms
  { id: 'w18', title: 'Vacuum & mop floor', category: 'weekly', timeEstimate: 15, completed: false, day: 'Wednesday', room: 'Bedrooms' },
  { id: 'w19', title: 'Change sheets', category: 'weekly', timeEstimate: 10, completed: false, day: 'Wednesday', room: 'Bedrooms' },
  { id: 'w20', title: 'Dust & wipe furniture', category: 'weekly', timeEstimate: 12, completed: false, day: 'Wednesday', room: 'Bedrooms' },
  { id: 'w21', title: 'Declutter', category: 'weekly', timeEstimate: 15, completed: false, day: 'Wednesday', room: 'Bedrooms' },
  { id: 'w22', title: 'Tidy clothes & drawer', category: 'weekly', timeEstimate: 20, completed: false, day: 'Wednesday', room: 'Bedrooms' },
  { id: 'w23', title: 'Spot clean stains', category: 'weekly', timeEstimate: 5, completed: false, day: 'Wednesday', room: 'Bedrooms' },
  { id: 'w24', title: 'Air purification', category: 'weekly', timeEstimate: 2, completed: false, day: 'Wednesday', room: 'Bedrooms' },
  { id: 'w25', title: 'Organize clothing', category: 'weekly', timeEstimate: 25, completed: false, day: 'Wednesday', room: 'Bedrooms' },
  
  // Thursday - Bathrooms  
  { id: 'w26', title: 'Wipe mirrors', category: 'weekly', timeEstimate: 5, completed: false, day: 'Thursday', room: 'Bathrooms' },
  { id: 'w27', title: 'Clean toilet, bath & sink', category: 'weekly', timeEstimate: 15, completed: false, day: 'Thursday', room: 'Bathrooms' },
  { id: 'w28', title: 'Vacuum & mop floor', category: 'weekly', timeEstimate: 8, completed: false, day: 'Thursday', room: 'Bathrooms' },
  { id: 'w29', title: 'Stock up toilet paper', category: 'weekly', timeEstimate: 2, completed: false, day: 'Thursday', room: 'Bathrooms' },
  { id: 'w30', title: 'Replace towels & rugs', category: 'weekly', timeEstimate: 5, completed: false, day: 'Thursday', room: 'Bathrooms' },
  { id: 'w31', title: 'Empty trash', category: 'weekly', timeEstimate: 2, completed: false, day: 'Thursday', room: 'Bathrooms' },
  { id: 'w32', title: 'Clean mirrors', category: 'weekly', timeEstimate: 4, completed: false, day: 'Thursday', room: 'Bathrooms' },
  { id: 'w33', title: 'Check for spills', category: 'weekly', timeEstimate: 2, completed: false, day: 'Thursday', room: 'Bathrooms' },
];

// From Room by Room Speed Cleaning (Image 6)
export const speedCleaningTasks: PlannerTask[] = [
  // Kitchen (5-10 mins/tasks)
  { id: 's1', title: 'Pick up & put away items that don\'t belong', category: 'room-based', timeEstimate: 5, completed: false, room: 'Kitchen' },
  { id: 's2', title: 'Put dirty dishes in sink', category: 'room-based', timeEstimate: 3, completed: false, room: 'Kitchen', isQuickWin: true },
  { id: 's3', title: 'Manually wash dishes as needed', category: 'room-based', timeEstimate: 8, completed: false, room: 'Kitchen' },
  { id: 's4', title: 'Disinfect and wipe all counters', category: 'room-based', timeEstimate: 5, completed: false, room: 'Kitchen', isQuickWin: true },
  { id: 's5', title: 'Wipe exteriors of all appliances', category: 'room-based', timeEstimate: 6, completed: false, room: 'Kitchen' },
  { id: 's6', title: 'Wipe down stove tops', category: 'room-based', timeEstimate: 4, completed: false, room: 'Kitchen', isQuickWin: true },
  { id: 's7', title: 'Wipe exteriors of all appliances', category: 'room-based', timeEstimate: 5, completed: false, room: 'Kitchen', isQuickWin: true },
  { id: 's8', title: 'Spot clean all walls', category: 'room-based', timeEstimate: 8, completed: false, room: 'Kitchen' },
  { id: 's9', title: 'Take out trash & recycling', category: 'room-based', timeEstimate: 3, completed: false, room: 'Kitchen', isQuickWin: true },
  { id: 's10', title: 'Wipe exteriors of all appliances', category: 'room-based', timeEstimate: 5, completed: false, room: 'Kitchen', isQuickWin: true },
  { id: 's11', title: 'Clear dining room table', category: 'room-based', timeEstimate: 4, completed: false, room: 'Kitchen', isQuickWin: true },
  
  // Bedrooms (5 mins/tasks)
  { id: 's12', title: 'Pick up & put away items', category: 'room-based', timeEstimate: 5, completed: false, room: 'Bedrooms', isQuickWin: true },
  { id: 's13', title: 'Make the bed', category: 'room-based', timeEstimate: 3, completed: false, room: 'Bedrooms', isQuickWin: true },
  { id: 's14', title: 'Dust all surfaces', category: 'room-based', timeEstimate: 5, completed: false, room: 'Bedrooms', isQuickWin: true },
  { id: 's15', title: 'Vacuum floor', category: 'room-based', timeEstimate: 5, completed: false, room: 'Bedrooms', isQuickWin: true },
  { id: 's16', title: 'Put away clean clothes', category: 'room-based', timeEstimate: 8, completed: false, room: 'Bedrooms' },
  { id: 's17', title: 'Clear clutter from dresser/night stand', category: 'room-based', timeEstimate: 4, completed: false, room: 'Bedrooms', isQuickWin: true },
  
  // Living Room (10-5 mins/tasks)
  { id: 's18', title: 'Pick up & put away items/trash', category: 'room-based', timeEstimate: 5, completed: false, room: 'Living Room', isQuickWin: true },
  { id: 's19', title: 'Dust all surfaces', category: 'room-based', timeEstimate: 8, completed: false, room: 'Living Room' },
  { id: 's20', title: 'Clean & organize desk area', category: 'room-based', timeEstimate: 10, completed: false, room: 'Living Room' },
  { id: 's21', title: 'Wipe down furniture table & chair', category: 'room-based', timeEstimate: 6, completed: false, room: 'Living Room' },
  { id: 's22', title: 'Wipe down electronics', category: 'room-based', timeEstimate: 5, completed: false, room: 'Living Room', isQuickWin: true },
  { id: 's23', title: 'Shake out rugs', category: 'room-based', timeEstimate: 3, completed: false, room: 'Living Room', isQuickWin: true },
  { id: 's24', title: 'Vacuum floor', category: 'room-based', timeEstimate: 8, completed: false, room: 'Living Room' },
  
  // Bathroom (5 mins/tasks)
  { id: 's25', title: 'Clean & disinfect toilet bowl', category: 'room-based', timeEstimate: 5, completed: false, room: 'Bathroom', isQuickWin: true },
  { id: 's26', title: 'Wipe down toilet bowl & surrounding surface', category: 'room-based', timeEstimate: 4, completed: false, room: 'Bathroom', isQuickWin: true },
  { id: 's27', title: 'Clean mirrors', category: 'room-based', timeEstimate: 3, completed: false, room: 'Bathroom', isQuickWin: true },
  { id: 's28', title: 'Dust', category: 'room-based', timeEstimate: 3, completed: false, room: 'Bathroom', isQuickWin: true },
  { id: 's29', title: 'Empty trash can', category: 'room-based', timeEstimate: 2, completed: false, room: 'Bathroom', isQuickWin: true },
  { id: 's30', title: 'Sweep floor', category: 'room-based', timeEstimate: 3, completed: false, room: 'Bathroom', isQuickWin: true },
  { id: 's31', title: 'Spot clean floor stains', category: 'room-based', timeEstimate: 4, completed: false, room: 'Bathroom', isQuickWin: true },
  
  // Everywhere (10-5 mins/tasks)
  { id: 's32', title: 'Vacuum carpet, rugs & other areas', category: 'room-based', timeEstimate: 12, completed: false, room: 'Everywhere' },
  { id: 's33', title: 'Quickly mop floors', category: 'room-based', timeEstimate: 8, completed: false, room: 'Everywhere' },
  { id: 's34', title: 'Clean mirror & glass surfaces', category: 'room-based', timeEstimate: 5, completed: false, room: 'Everywhere', isQuickWin: true },
  { id: 's35', title: 'Quickly empty all trash bins', category: 'room-based', timeEstimate: 4, completed: false, room: 'Everywhere', isQuickWin: true },
  { id: 's36', title: 'Wipe all tables & furniture', category: 'room-based', timeEstimate: 8, completed: false, room: 'Everywhere' },
];

// From Seasonal Cleaning (Image 2)
export const seasonalTasks: PlannerTask[] = [
  // Spring
  { id: 'se1', title: 'Deep clean carpets and rugs', category: 'seasonal', timeEstimate: 90, completed: false, season: 'Spring' },
  { id: 'se2', title: 'Clean and organize kitchen and pantry', category: 'seasonal', timeEstimate: 120, completed: false, season: 'Spring' },
  { id: 'se3', title: 'Wash bedding, pillows, and curtains', category: 'seasonal', timeEstimate: 60, completed: false, season: 'Spring' },
  { id: 'se4', title: 'Clean bathrooms, toilets and tubs', category: 'seasonal', timeEstimate: 45, completed: false, season: 'Spring' },
  { id: 'se5', title: 'Dust and organize closets and cabinets', category: 'seasonal', timeEstimate: 90, completed: false, season: 'Spring' },
  
  // Summer
  { id: 'se6', title: 'Clean ceiling fans and light fixtures', category: 'seasonal', timeEstimate: 30, completed: false, season: 'Summer' },
  { id: 'se7', title: 'Deep clean windows and window sills', category: 'seasonal', timeEstimate: 45, completed: false, season: 'Summer' },
  { id: 'se8', title: 'Vacuum and clean upholstery and curtains', category: 'seasonal', timeEstimate: 60, completed: false, season: 'Summer' },
  { id: 'se9', title: 'Clean and sanitize garbage cans', category: 'seasonal', timeEstimate: 20, completed: false, season: 'Summer' },
  
  // Fall/Autumn
  { id: 'se10', title: 'Deep clean windows and treatments', category: 'seasonal', timeEstimate: 60, completed: false, season: 'Fall' },
  { id: 'se11', title: 'Clean and inspect fireplace and chimney', category: 'seasonal', timeEstimate: 120, completed: false, season: 'Fall' },
  { id: 'se12', title: 'Clean and organize closets for clothing', category: 'seasonal', timeEstimate: 90, completed: false, season: 'Fall' },
  { id: 'se13', title: 'Clean ceiling fans and HVAC vents', category: 'seasonal', timeEstimate: 45, completed: false, season: 'Fall' },
  
  // Winter
  { id: 'se14', title: 'Deep clean carpets and rugs', category: 'seasonal', timeEstimate: 90, completed: false, season: 'Winter' },
  { id: 'se15', title: 'Clean and polish wood floors', category: 'seasonal', timeEstimate: 60, completed: false, season: 'Winter' },
  { id: 'se16', title: 'Clean and sanitize kitchen and bathroom surfaces', category: 'seasonal', timeEstimate: 45, completed: false, season: 'Winter' },
  { id: 'se17', title: 'Clean and organize pantry and kitchen cabinets', category: 'seasonal', timeEstimate: 75, completed: false, season: 'Winter' },
];

// From Monthly Cleaning Checklist (Image 3)
export const monthlyTasks: PlannerTask[] = [
  // Kitchen
  { id: 'm1', title: 'Clean inside of microwave and oven', category: 'monthly', timeEstimate: 20, completed: false, room: 'Kitchen' },
  { id: 'm2', title: 'Wipe down kitchen cabinets and countertops', category: 'monthly', timeEstimate: 15, completed: false, room: 'Kitchen' },
  { id: 'm3', title: 'Clean refrigerator shelves and door seals', category: 'monthly', timeEstimate: 25, completed: false, room: 'Kitchen' },
  { id: 'm4', title: 'Scrub sink and faucet', category: 'monthly', timeEstimate: 8, completed: false, room: 'Kitchen' },
  { id: 'm5', title: 'Clean dishwasher filter', category: 'monthly', timeEstimate: 10, completed: false, room: 'Kitchen' },
  
  // Bathroom
  { id: 'm6', title: 'Scrub and disinfect bathtub, shower, and tiles', category: 'monthly', timeEstimate: 30, completed: false, room: 'Bathroom' },
  { id: 'm7', title: 'Clean toilet thoroughly', category: 'monthly', timeEstimate: 10, completed: false, room: 'Bathroom' },
  { id: 'm8', title: 'Wipe down bathroom counters and sink', category: 'monthly', timeEstimate: 8, completed: false, room: 'Bathroom' },
  { id: 'm9', title: 'Clean mirrors. Wash bathmats', category: 'monthly', timeEstimate: 12, completed: false, room: 'Bathroom' },
  
  // Bedrooms
  { id: 'm10', title: 'Wash bed linens, sheets, pillowcases, and duvet covers', category: 'monthly', timeEstimate: 20, completed: false, room: 'Bedrooms' },
  { id: 'm11', title: 'Dust furniture and wipe surfaces', category: 'monthly', timeEstimate: 15, completed: false, room: 'Bedrooms' },
  { id: 'm12', title: 'Vacuum and/or mop floors', category: 'monthly', timeEstimate: 12, completed: false, room: 'Bedrooms' },
  { id: 'm13', title: 'Rotate mattress, clean windows & mirrors', category: 'monthly', timeEstimate: 25, completed: false, room: 'Bedrooms' },
  
  // Living Area
  { id: 'm14', title: 'Dust all surfaces, including shelves & electronics', category: 'monthly', timeEstimate: 20, completed: false, room: 'Living Area' },
  { id: 'm15', title: 'Vacuum upholstery & under furniture cushions', category: 'monthly', timeEstimate: 18, completed: false, room: 'Living Area' },
  { id: 'm16', title: 'Clean TV and other screens', category: 'monthly', timeEstimate: 8, completed: false, room: 'Living Area' },
  { id: 'm17', title: 'Clean windows and window sills', category: 'monthly', timeEstimate: 15, completed: false, room: 'Living Area' },
  { id: 'm18', title: 'Clean light fixtures and ceiling fans', category: 'monthly', timeEstimate: 20, completed: false, room: 'Living Area' },
];

export const allTasks = [
  ...weeklyTasks,
  ...speedCleaningTasks,
  ...seasonalTasks,
  ...monthlyTasks,
];

export const getQuickWinTasks = () => allTasks.filter(task => task.isQuickWin);
export const getTasksByCategory = (category: string) => allTasks.filter(task => task.category === category);
export const getTasksByRoom = (room: string) => allTasks.filter(task => task.room === room);