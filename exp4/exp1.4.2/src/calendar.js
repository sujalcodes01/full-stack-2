export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const previousTotal = new Date(year, month, 0).getDate();

  return Array.from({ length: 42 }, (_, index) => {
    const day = index - firstDay + 1;
    if (day < 1) return { day: previousTotal + day, currentMonth: false, offset: -1 };
    if (day > totalDays) return { day: day - totalDays, currentMonth: false, offset: 1 };
    return { day, currentMonth: true, offset: 0 };
  });
}

export function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
